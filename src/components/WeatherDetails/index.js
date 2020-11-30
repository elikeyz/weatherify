import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faEye } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHollowHeart } from '@fortawesome/free-regular-svg-icons';
import ModalContext from '../../contexts/ModalContext';
import ModeContext from '../../contexts/ModeContext';
import FavoritesContext from '../../contexts/FavoritesContext';
import Error404 from '../../pages/Error404';
import './WeatherDetails.css';

/**
 * The Weather Details component
 * @param {object} props 
 */
const WeatherDetails = ({ details }) => {

    const { success, current, location } = details;

    const { toggleNotesModal } = useContext(ModalContext);
    const setMode = useContext(ModeContext);
    const { favorites, changeFavorites } = useContext(FavoritesContext);

    const [isFavorite, setIsFavorite] = useState(false);

    // Set background and theme based on time of day
    useEffect(() => {
        const date = new Date(location.localtime);
        if (date.getHours() > 5 && date.getHours() < 19) {
            setMode('day');
        } else {
            setMode('night');
        }
    }, [location.localtime, setMode]);

    // Check if this location is in the Favorite Cities list and set the state accordingly
    useEffect(() => {
        const favoritesMatch = favorites.filter(fav => (fav.location.name === location.name) && (fav.location.country === location.country));

        if (favoritesMatch.length > 0) {
            setIsFavorite(true);
        }
    }, [location.country, location.name, favorites]);

    // Add this location to Favorites
    const addToFavorites = () => {
        const updatedFavorites = [...favorites];
        updatedFavorites.push(details);
        changeFavorites(updatedFavorites);
        setIsFavorite(true);
    };

    // Remove this location from Favorites
    const removeFromFavorites = () => {
        const updatedFavorites = [...favorites];
        const index = updatedFavorites.findIndex(fav => (fav.location.name === location.name) && (fav.location.country === location.country));
        updatedFavorites.splice(index, 1);
        changeFavorites(updatedFavorites);
        setIsFavorite(false);
    };

    // Render weather details if gotten successfully, else return 404 page
    if (success !== false) {
        return (
            <section className="weather-details">
                <div>
                    <h2>{location.name}, {location.region}, {location.country}</h2>
                    <p>{new Date(location.localtime).toDateString()}, {new Date(location.localtime).toLocaleTimeString()}</p>
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
                                <p>{current.wind_speed}km/h</p>
                            </div>
                        </div>
                        <div className="weather-details-unit">
                            <div className="weather-details-key">
                                <p>Pressure</p>
                            </div>
                            <div className="weather-details-value">
                                <p>{current.pressure}MB</p>
                            </div>
                        </div>
                        <div className="weather-details-unit">
                            <div className="weather-details-key">
                                <p>Precipitation</p>
                            </div>
                            <div className="weather-details-value">
                                <p>{current.precip}mm</p>
                            </div>
                        </div>
                        <div className="weather-details-unit">
                            <div className="weather-details-key">
                                <p>Humidity</p>
                            </div>
                            <div className="weather-details-value">
                                <p>{current.humidity}g/m<sup>2</sup></p>
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
    } else return <Error404 />
};

export default WeatherDetails;