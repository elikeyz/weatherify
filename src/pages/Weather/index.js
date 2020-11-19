import { useEffect, useState } from 'react';
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