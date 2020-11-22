import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import FavoritesContext from '../../contexts/FavoritesContext';

/**
 * The Favorites Component
 */
const Favorites = () => {

    // Declare history object from useHistory hook
    const history = useHistory();

    // Declare Favorites Context data
    const { favorites, changeFavorites } = useContext(FavoritesContext);

    // Get cached Favorites from localStorage and fetch their current weather details
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites'));

        Promise.all(storedFavorites.map(city => axios.get(`http://api.weatherstack.com/current?access_key=b49788cab88c05f33ce5464abe60ff07&query=${city.location.name},${city.location.country}`)))
            .then((result) => {
                const citiesData = result.map(res => res.data);
                changeFavorites(citiesData);
            });
    }, []);

    // Remove a location from Favorites
    const clearCity = (index) => {
        const updatedFavorites = [...favorites];
        updatedFavorites.splice(index, 1);
        changeFavorites(updatedFavorites);
    };

    // Render Favorites if any has been added
    if (favorites.length > 0) {
        return (
            <section>
                <h2>Favorites</h2>
                <div className="city-grid">
                    {favorites.sort((a, b) => a.location.name.charCodeAt(0) - b.location.name.charCodeAt(0)).map((city, index) => (
                        <div key={index} onClick={(e) => history.push(`/weather?search=${encodeURIComponent(`${city.location.name},${city.location.country}`)}`)}>
                            <div>
                                <button onClick={(e) => { e.stopPropagation(); clearCity(index); }}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
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
                    ))}
                </div>
            </section>
        );
    } else return null;
};

export default Favorites;