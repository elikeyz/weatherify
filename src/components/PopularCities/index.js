import { useState, useEffect } from 'react';
import LoadingIndicator from '../LoadingIndicator';
import CityGrid from '../CityGrid';
import axios from 'axios';

// An array containing the 15 most populated cities in the world
// Source: https://worldpopulationreview.com/world-cities
const defaultCities = [
    'Tokyo,Japan',
    'Delhi,India',
    'Shanghai,China',
    'Sao Paulo,Brazil',
    'Mexico City,Mexico',
    'Dhaka,Bangladesh',
    'Cairo,Egypt',
    'Beijing,China',
    'Mumbai,India',
    'Osaka,Japan',
    'Karachi,Pakistan',
    'Chongqing,China',
    'Istanbul,Turkey',
    'Buenos Aires,Argentina',
    'Kolkata,India'
];

/**
 * The PopularCities component
 */
const PopularCities = () => {

    // Declare the cities state
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    //Get stored cities from local storage if available, otherwise, store the default 15 cities.
    useEffect(() => {

        // Get cached Popular Cities from localStorage, if found display them and remove the loading indicator
        if (!!localStorage.getItem('popular-cities')) {
            const storedCities = JSON.parse(localStorage.getItem('popular-cities'));
            setIsLoading(false);
            setCities(storedCities);
        } else {
            localStorage.setItem('popular-cities', JSON.stringify([]));
        }

        // Get the weather details of the 15 popular cities and store their results in the state and localStorage, then remove the loading indicator if it is still showing.
        const cancelTokenSource = axios.CancelToken.source();
        Promise.all(defaultCities.map(city => axios.get(`https://api.weatherstack.com/current?access_key=b49788cab88c05f33ce5464abe60ff07&query=${city}`, { 
            cancelToken: cancelTokenSource.token
        })))
            .then((result) => {
                const citiesData = result.filter(res => res.data.success !== false).map(res => res.data);
                localStorage.setItem('popular-cities', JSON.stringify(citiesData));
                setIsLoading(false);
                setCities(citiesData);
            })
            .catch((err) => {
                setIsLoading(false);
                console.error(err);
            });

        // Cancel HTTP request if user leaves the page prematurely to avoid memory leaks
        return () => {
            cancelTokenSource.cancel();
        }
    }, []);

    // Remove a city from the list
    const clearCity = (index) => {
        const remainingCities = [...cities];
        remainingCities.splice(index, 1);
        localStorage.setItem('popular-cities', JSON.stringify(remainingCities));
        setCities(remainingCities);
    }

    // Render Loading Indicator if content is still loading, otherwise render the popular cities
    if (isLoading) {
        return <LoadingIndicator />
    } else {
        return (
            <section>
                <h2>Popular</h2>
                <CityGrid cities={cities} clearCity={clearCity} />
            </section>
        );
    }
};

export default PopularCities;