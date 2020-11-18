import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faEye } from '@fortawesome/free-solid-svg-icons';
import ModalContext from '../../ModalContext';
import './WeatherDetails.css';

/**
 * The Weather Details component
 */
const WeatherDetails = () => {

    const { toggleNotesModal } = useContext(ModalContext);

    return (
        <section className="weather-details">
            <div>
                <h2>Lagos, Nigeria</h2>
                <p className="description">Clear Skies</p>
                <div className="temp-section">
                    <img src="https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0025_light_rain_showers_night.png" alt="clear skies" />
                    <p className="temp">30<sup>o</sup>C</p>
                </div>
                <div className="weather-details-grid">
                    <div className="weather-details-unit">
                        <div className="weather-details-key">
                            <p>Wind Speed</p>
                        </div>
                        <div className="weather-details-value">
                            <p>14</p>
                        </div>
                    </div>
                    <div className="weather-details-unit">
                        <div className="weather-details-key">
                            <p>Pressure</p>
                        </div>
                        <div className="weather-details-value">
                            <p>1009</p>
                        </div>
                    </div>
                    <div className="weather-details-unit">
                        <div className="weather-details-key">
                            <p>Precipitation</p>
                        </div>
                        <div className="weather-details-value">
                            <p>0.1</p>
                        </div>
                    </div>
                    <div className="weather-details-unit">
                        <div className="weather-details-key">
                            <p>Humidity</p>
                        </div>
                        <div className="weather-details-value">
                            <p>67</p>
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