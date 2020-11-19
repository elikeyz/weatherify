import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faEye } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHollowHeart } from '@fortawesome/free-regular-svg-icons';
import ModalContext from '../../contexts/ModalContext';
import ModeContext from '../../contexts/ModeContext';
import FavoritesContext from '../../contexts/FavoritesContext';
import './WeatherDetails.css';

/**
 * The Weather Details component
 */
const WeatherDetails = ({ details }) => {

    const { current, location } = details;

    const { toggleNotesModal } = useContext(ModalContext);
    const setMode = useContext(ModeContext);
    const { favorites, changeFavorites } = useContext(FavoritesContext);

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (current.is_day === 'yes') {
            setMode('day');
        } else if (current.is_day === 'no') {
            setMode('night');
        }
    }, [current.is_day, setMode]);

    useEffect(() => {
        const favoritesMatch = favorites.filter(fav => (fav.name === location.name) && (fav.country === location.country));

        if (favoritesMatch.length < 0) {
            setIsFavorite(true);
        } else {
            setIsFavorite(false);
        }
    }, [location.country, location.name]);

    const addToFavorites = () => {
        const updatedFavorites = [...favorites];
        updatedFavorites.push(details);
        changeFavorites(updatedFavorites);
        setIsFavorite(true);
    };

    const removeFromFavorites = () => {
        const updatedFavorites = [...favorites];
        const index = updatedFavorites.findIndex(fav => (fav.name === location.name) && (fav.country === location.country));
        updatedFavorites.splice(index, 1);
        changeFavorites(updatedFavorites);
        setIsFavorite(false);
    };

    return (
        <section className="weather-details">
            <div>
                <h2>{location.name}, {location.country}</h2>
                {current.weather_descriptions.map((desc, index) => (
                    <p key={index} className="description">{desc}</p>
                    ))}
                <div className="temp-section">
                    {current.weather_icons.map((icon, index) => (
                        <img 
                            key={index}
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
                    {isFavorite ? (
                        <button onClick={() => removeFromFavorites()}><FontAwesomeIcon icon={faHeart} />&nbsp;Remove From Favorites</button>
                    ) : (
                        <button onClick={() => addToFavorites()}><FontAwesomeIcon icon={faHollowHeart} />&nbsp;Add To Favorites</button>
                    )}
                    <button onClick={() => toggleNotesModal(true)}><FontAwesomeIcon icon={faEye} />&nbsp;View Notes</button>
                </div>
            </div>
        </section>
    );
};

export default WeatherDetails;