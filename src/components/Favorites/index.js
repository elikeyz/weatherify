import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import FavoritesContext from '../../contexts/FavoritesContext';
import CityGrid from '../CityGrid';

/**
 * The Favorites Component
 */
const Favorites = () => {

    // Declare Favorites Context data
    const { favorites, changeFavorites } = useContext(FavoritesContext);
    const [myFavorites, setMyFavorites] = useState([]);

    // Get cached Favorites from localStorage and fetch their current weather details
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites'));

        const cancelTokenSource = axios.CancelToken.source();
        if (storedFavorites && storedFavorites.length > 0) {
            setMyFavorites(storedFavorites);

            Promise.all(storedFavorites.map(city => axios.get(`https://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${city.location.name},${city.location.country}`, {
                cancelToken: cancelTokenSource.token
            })))
                .then((result) => {
                    const citiesData = result.filter(res => res.status === 200 && res.data.success !== false).map(res => res.data);
                    if (citiesData.length > 0) {
                        setMyFavorites(citiesData);
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }

        // Cancel HTTP request if user leaves the page prematurely to avoid memory leaks
        return () => {
            cancelTokenSource.cancel();
        };
    }, []);

    // Remove a location from Favorites
    const clearCity = (index) => {
        const updatedFavorites = [...favorites];
        updatedFavorites.splice(index, 1);
        setMyFavorites(updatedFavorites);
        changeFavorites(updatedFavorites);
    };

    // Render Favorites if any has been added
    if (favorites.length > 0) {
        return (
            <section>
                <h2>Favorites</h2>
                <CityGrid type="favorites" cities={myFavorites} clearCity={clearCity} />
            </section>
        );
    } else return null;
};

export default Favorites;