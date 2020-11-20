import { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherDetails from '../../components/WeatherDetails';

/**
 * The Weather page
 */
const Weather = () => {

    const [details, setDetails] = useState({});

    useEffect(() => {
        if (window.location.search) {
            const urlParams = new URLSearchParams(window.location.search);

            const searchTerm = urlParams.get('search');
            const [city, country] = searchTerm.split(',');
            const storedCities = JSON.parse(localStorage.getItem('popular-cities'));

            const storedCity = storedCities.find(cityData => cityData.location.name === city && cityData.location.country === country);

            if (storedCity) setDetails(storedCity);

            axios.get(`http://api.weatherstack.com/current?access_key=b49788cab88c05f33ce5464abe60ff07&query=${searchTerm}`).then(result => {
                setDetails(result.data);
            });
        }
    }, []);

    if (Object.keys(details).length > 0) {
        return (
            <WeatherDetails details={details} />
        );
    } else {
        return null;
    }
};

export default Weather;