import { useEffect, useContext } from 'react';
import PopularCities from '../../components/PopularCities';
import ModeContext from '../../contexts/ModeContext';
import Favorites from '../../components/Favorites';
import './Landing.css';

/**
 * THe Landing page
 */
const Landing = () => {

    const setMode = useContext(ModeContext);

    useEffect(() => {
        // Set background image and style classes based on whether the user's timezone is daytime or night
        const date = new Date();
        if (date.getHours() > 5 && date.getHours() < 19) {
            setMode('day');
        } else {
            setMode('night');
        }
    }, [setMode]);

    return (
        <>
            <Favorites />
            <PopularCities />
        </>
    );
};

export default Landing;