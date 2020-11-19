import { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faEye } from '@fortawesome/free-solid-svg-icons';
import ModalContext from '../../ModalContext';
import ModeContext from '../../ModeContext';
import './WeatherDetails.css';

/**
 * The Weather Details component
 */
const WeatherDetails = ({ details: { current, location } }) => {

    const { toggleNotesModal } = useContext(ModalContext);
    const setMode = useContext(ModeContext);

    useEffect(() => {
        if (current.is_day === 'yes') {
            setMode('day');
        } else if (current.is_day === 'no') {
            setMode('night');
        }
    }, [current.is_day, setMode]);

    return (
        <section className="weather-details">
            <div>
                <h2>{location.name}, {location.country}</h2>
                {current.weather_descriptions.map(desc => <p className="description">{desc}</p>)}
                <div className="temp-section">
                    {current.weather_icons.map((icon, index) => (
                        <img 
                            src={icon} 
                            alt={current.weather_descriptions[index]} 
                            />
                    ))}
                    <p className="temp">{current.temperature}<sup>o</sup>C</p>
                </div>
                <div className="weather-details-grid">
                    <div className="weather-details-unit">
                        <div className="weather-details-key">
                            <p>Wind Speed</p>
                        </div>
                        <div className="weather-details-value">
                            <p>{current.wind_speed}</p>
                        </div>
                    </div>
                    <div className="weather-details-unit">
                        <div className="weather-details-key">
                            <p>Pressure</p>
                        </div>
                        <div className="weather-details-value">
                            <p>{current.pressure}</p>
                        </div>
                    </div>
                    <div className="weather-details-unit">
                        <div className="weather-details-key">
                            <p>Precipitation</p>
                        </div>
                        <div className="weather-details-value">
                            <p>{current.precip}</p>
                        </div>
                    </div>
                    <div className="weather-details-unit">
                        <div className="weather-details-key">
                            <p>Humidity</p>
                        </div>
                        <div className="weather-details-value">
                            <p>{current.humidity}</p>
                        </div>
                    </div>
                </div>
                <div className="weather-btns">
                    <button><FontAwesomeIcon icon={faHeart} />&nbsp;Add To Favorites</button>
                    <button onClick={() => toggleNotesModal(true)}><FontAwesomeIcon icon={faEye} />&nbsp;View Notes</button>
                </div>
            </div>
        </section>
    );
};

export default WeatherDetails;