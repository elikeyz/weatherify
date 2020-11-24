import { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherDetails from '../../components/WeatherDetails';
import LoadingIndicator from '../../components/LoadingIndicator';
import Error404 from '../../pages/Error404';

/**
 * The Weather page
 */
const Weather = () => {

    const [details, setDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const cancelTokenSource = axios.CancelToken.source();
        if (window.location.search) {

            // Get search params from URL
            const urlParams = new URLSearchParams(window.location.search);

            // Use search parameter to check among stored popular cities in localStorage
            const searchTerm = urlParams.get('search');
            const [city, country] = searchTerm.split(',');
            const storedCities = JSON.parse(localStorage.getItem('popular-cities'));

            const storedCity = storedCities.find(cityData => cityData.location.name === city && cityData.location.country === country);

            // If found, remove loading indicator and display cached content first
            if (storedCity) {
                setIsLoading(false);
                setDetails(storedCity);
            }

            // Request for current data and display if found, also remove loading indicator if it is still visible
            
            axios.get(`https://api.weatherstack.com/current?access_key=b49788cab88c05f33ce5464abe60ff07&query=${searchTerm}`, {
                cancelToken: cancelTokenSource.token
            }).then(result => {
                if (result.status === 200) {
                    setIsLoading(false);
                    setDetails(result.data);
                }
            }).catch((err) => {
                setIsLoading(false);
                console.error(err);
            });
        }

        // Cancel HTTP request if user leaves the page prematurely to avoid memory leaks
        return () => {
            cancelTokenSource.cancel();
        }
    }, []);

    // If content is still loading, show Loading Indicator
    // If content is fully loaded successfully, render the weather details
    // Otherwise render 404 Page
    if (isLoading) {
        return <LoadingIndicator />;
    } else if (Object.keys(details).length > 0 && details.success !== false) {
        return <WeatherDetails details={details} />;
    } else {
        return <Error404 />;
    }
};

export default Weather;