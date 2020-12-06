import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Landing from './pages/Landing';
import SearchForm from './components/SearchForm';
import Weather from './pages/Weather';
import NotesModal from './components/NotesModal';
import ModalContext from './contexts/ModalContext';
import ModeContext from './contexts/ModeContext';
import FavoritesContext from './contexts/FavoritesContext';
import Error404 from './pages/Error404';
import './App.css';

/**
 * The App component
 */
const App = () => {

  // Declare the states
  const [backgroundImage, setBackground] = useState('/day-sky1.gif');
  const [timeClass, setTimeClass] = useState('background-image day');
  const [showNotesModal, toggleNotesModal] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [location, setLocation] = useState('global');

  // Set background image and style classes based on input time of day
  const setMode = (timeOfDay) => {
    if (timeOfDay === 'day') {
      setBackground('/day-sky1.gif');
      setTimeClass('background-image day');
    } else if (timeOfDay === 'night') {
      setBackground('/night-sky1.gif');
      setTimeClass('background-image night');
    }
  };

  // Declare function for updating Favorite Cities in state and localStorage
  const changeFavorites = (updatedFavorites) => {
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  }

  // Get Favorite Cities from localStorage and use it to update the state
  useEffect(() => {
    if (localStorage.getItem('favorites')) {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
      setFavorites(storedFavorites);
    }
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, changeFavorites }}>
        <ModeContext.Provider value={setMode}>
          <ModalContext.Provider value={{ showNotesModal, toggleNotesModal, location, setLocation }}>
            <div className={timeClass}>
              <img src={backgroundImage} alt="Background" />
              <div className="overlay">
                <Router>
                  <Header />
                  <SearchForm />
                  <Switch>
                    <Route path="/weather">
                      <Weather />
                    </Route>

                    <Route exact path="/">
                      <Landing />
                    </Route>

                    <Route path="*">
                      <Error404 />
                    </Route>
                  </Switch>
                  <NotesModal show={showNotesModal} toggle={toggleNotesModal} />
                </Router>
              </div>
            </div>
          </ModalContext.Provider>
        </ModeContext.Provider>
      </FavoritesContext.Provider>
  );
}

export default App;
