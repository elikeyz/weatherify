import { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherDetails from '../../components/WeatherDetails';
import LoadingIndicator from '../../components/LoadingIndicator';

/**
 * The Weather page
 */
const Weather = () => {

    const [details, setDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (window.location.search) {
            setIsLoading(true);
            const urlParams = new URLSearchParams(window.location.search);

            const searchTerm = urlParams.get('search');
            const [city, country] = searchTerm.split(',');
            const storedCities = JSON.parse(localStorage.getItem('popular-cities'));

            const storedCity = storedCities.find(cityData => cityData.location.name === city && cityData.location.country === country);

            if (storedCity) {
                setIsLoading(false);
                setDetails(storedCity);
            }

            axios.get(`http://api.weatherstack.com/current?access_key=b49788cab88c05f33ce5464abe60ff07&query=${searchTerm}`).then(result => {
                setIsLoading(false);
                setDetails(result.data);
            });
        }
    }, []);

    if (isLoading) {
        return (
            <LoadingIndicator />
        );
    } else if (Object.keys(details).length > 0) {
        return (
            <WeatherDetails details={details} />
        );
    } else {
        return null;
    }
};

export default Weather;