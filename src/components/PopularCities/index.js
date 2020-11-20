import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
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

    //Declare the useHistory hook from react router
    const history = useHistory();

    //Get stored cities from local storage if available, otherwise, store the default 15 cities.
    useEffect(() => {
        if (!!localStorage.getItem('popular-cities')) {
            const storedCities = JSON.parse(localStorage.getItem('popular-cities'));
            setCities(storedCities);
        } else {
            localStorage.setItem('popular-cities', JSON.stringify([]));
        }

        Promise.all(defaultCities.map(city => axios.get(`http://api.weatherstack.com/current?access_key=b49788cab88c05f33ce5464abe60ff07&query=${city}`)))
            .then((result) => {
                const citiesData = result.map(res => res.data);
                localStorage.setItem('popular-cities', JSON.stringify(citiesData));
                setCities(citiesData);
            });
    }, []);

    // Remove a city from the list
    const clearCity = (index) => {
        const remainingCities = [...cities];
        remainingCities.splice(index, 1);
        localStorage.setItem('popular-cities', JSON.stringify(remainingCities));
        setCities(remainingCities);
    }

    return (
        <section>
            <h2>Popular</h2>
            <div className="city-grid">
                {cities.sort((a, b) => a.location.name.charCodeAt(0) - b.location.name.charCodeAt(0)).map((city, index) => (
                    <div key={index} onClick={(e) => history.push(`/weather?search=${encodeURIComponent(`${city.location.name},${city.location.country}`)}`)}>
                        <div>
                            <button onClick={(e) => {e.stopPropagation(); clearCity(index);}}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                            <p>{city.location.name}</p>
                            <div className="city-card-data">
                                <p>{city.current.temperature}<sup>o</sup>C</p>
                                {city.current.weather_icons.map((iconUrl, index) => (
                                    <img 
                                        key={index} 
                                        src={iconUrl} 
                                        alt={city.current.weather_descriptions[index]} />))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PopularCities;