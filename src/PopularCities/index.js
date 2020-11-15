import { useState } from 'react';
import './PopularCities.css';

const PopularCities = () => {

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

    const [cities] = useState(defaultCities);

    return (
        <section>
            <h2>Popular</h2>
            <div className="city-grid">
                {cities.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).map((city, index) => (
                    <a key={index} href="#">
                        <div>
                            <p>{city}</p>
                            <div className="city-card-data">
                                <p>30<sup>o</sup>C</p>
                                <img src="https://openweathermap.org/img/wn/01n@2x.png" alt="clear skies" />
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default PopularCities;