import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PopularCities from '../../components/PopularCities';
import ModeContext from '../../contexts/ModeContext';
import Favorites from '../../components/Favorites';
import './Landing.css';

/**
 * THe Landing page
 */
const Landing = () => {

    const setMode = useContext(ModeContext);

    const history = useHistory();

    useEffect(() => {
        // Set background image and style classes based on whether the user's timezone is daytime or night
        const date = new Date();
        if (date.getHours() > 5 && date.getHours() < 19) {
            setMode('day');
        } else {
            setMode('night');
        }
    }, [setMode]);

    // Request permission to get user's location
    // If granted, navigate to the Weather Details Page and display the weather for the user's location
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((location) => {
            if (location) {
                history.push(`/weather?search=${encodeURIComponent(`${location.coords.latitude},${location.coords.longitude}`)}`);
            }
        });
    });

    // Render Favorites and Popular Cities
    return (
        <>
            <Favorites />
            <PopularCities />
        </>
    );
};

export default Landing;