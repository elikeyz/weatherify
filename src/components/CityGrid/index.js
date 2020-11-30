import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHollowHeart } from '@fortawesome/free-regular-svg-icons';
import { useHistory } from 'react-router-dom';
import FavoritesContext from '../../contexts/FavoritesContext';

const CityGrid = ({ cities, clearCity, type }) => {

    const history = useHistory();

    const { favorites, changeFavorites } = useContext(FavoritesContext);

    // Add this location to Favorites
    const addToFavorites = (index) => {
        const updatedFavorites = [...favorites];
        updatedFavorites.push(cities[index]);
        changeFavorites(updatedFavorites);
    };

    // Remove this location from Favorites
    const removeFromFavorites = (index) => {
        const updatedFavorites = [...favorites];
        const indexToRemove = updatedFavorites.findIndex(fav => (fav.location.name === cities[index].location.name) && (fav.location.country === cities[index].location.country));
        updatedFavorites.splice(indexToRemove, 1);
        changeFavorites(updatedFavorites);
    };

    return (
        <div data-testid="city-grid" className="city-grid">
            {/* Sort the cities in alphabetical order before rendering them */}
            {cities.sort((a, b) => a.location.name.charCodeAt(0) - b.location.name.charCodeAt(0)).map((city, index) => {
                const isFavorite = favorites.findIndex(fav => (fav.location.name === cities[index].location.name) && (fav.location.country === cities[index].location.country)) === -1 ? false : true;
                // Render city if data was loaded successfully
                if (city.location) return (
                    <div key={index} onClick={() => history.push(`/weather?search=${encodeURIComponent(`${city.location.name},${city.location.country}`)}`)}>
                        <div>
                            <div className="btns">
                                {/* Add To Favorites */}
                                {type === 'popular' && isFavorite && (
                                    <button onClick={(e) => { e.stopPropagation(); removeFromFavorites(index); }}>
                                        <FontAwesomeIcon icon={faHeart} />
                                    </button>
                                )}
                                {type === 'popular' && !isFavorite && (
                                    <button onClick={(e) => { e.stopPropagation(); addToFavorites(index); }}>
                                        <FontAwesomeIcon icon={faHollowHeart} />
                                    </button>
                                )}
                                {/* Clear button */}
                                <button onClick={(e) => { e.stopPropagation(); clearCity(index); }}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </div>

                            {/* City name, temperature and weather icon */}
                            <p>{city.location.name}</p>
                            <div className="city-card-data">
                                <p>{city.current.temperature}<sup>o</sup>C</p>
                                {city.current.weather_icons.map((iconUrl, index) => (
                                    <img
                                        key={index}
                                        src={iconUrl}
                                        alt={city.current.weather_descriptions[index]} />))}
                            </div>
                        </div>
                    </div>
                ); else return null;
            })}
        </div>
    );
};

export default CityGrid;