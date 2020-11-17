import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './PopularCities.css';

const defaultCities = [
    'Tokyo',
    'Delhi',
    'Shanghai',
    'Sao Paulo',
    'Mexico City',
    'Dhaka',
    'Cairo',
    'Beijing',
    'Mumbai',
    'Osaka',
    'Karachi',
    'Chongqing',
    'Istanbul',
    'Buenos Aires',
    'Kolkata'
];

const PopularCities = () => {

    const [cities, setCities] = useState(defaultCities);

    const history = useHistory();

    useEffect(() => {
        if (!!localStorage.getItem('popular-cities')) {
            const storedCities = JSON.parse(localStorage.getItem('popular-cities'));
            setCities(storedCities);
        } else {
            localStorage.setItem('popular-cities', JSON.stringify(defaultCities));
        }
    }, []);

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
                {cities.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).map((city, index) => (
                    <button key={index} onClick={(e) => history.push('/weather')}>
                        <div>
                            <button onClick={(e) => {e.stopPropagation(); clearCity(index);}}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                            <p>{city}</p>
                            <div className="city-card-data">
                                <p>30<sup>o</sup>C</p>
                                <img src="https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0009_light_rain_showers.png" alt="clear skies" />
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default PopularCities;