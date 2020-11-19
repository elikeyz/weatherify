import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Landing from './pages/Landing';
import SearchForm from './components/SearchForm';
import Weather from './pages/Weather';
import NotesModal from './components/NotesModal';
import ModalContext from './ModalContext';
import ModeContext from './ModeContext';
import './App.css';

/**
 * The App component
 */
const App = () => {

  // Declare the background image and time of day style class states
  const [backgroundImage, setBackground] = useState('/day-sky.jpg');
  const [timeClass, setTimeClass] = useState('background-image day');
  const [showNotesModal, toggleNotesModal] = useState(false);

  // Set background image and style classes based on input time of day
  const setMode = (timeOfDay) => {
    if (timeOfDay === 'day') {
      setBackground('/day-sky.jpg');
      setTimeClass('background-image day');
    } else if (timeOfDay === 'night') {
      setBackground('/night-sky.jpg');
      setTimeClass('background-image night');
    }
  };

  useEffect(() => {
    // Set background image and style classes based on whether the user's timezone is daytime or night
    const date = new Date();
    if (date.getHours() > 5 && date.getHours() < 19) {
      setMode('day');
    } else {
      setMode('night');
    }
  }, []);

  return (
    <ModeContext.Provider value={setMode}>
      <ModalContext.Provider value={{ showNotesModal, toggleNotesModal }}>
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

                <Route path="/">
                  <Landing />
                </Route>
              </Switch>
              <NotesModal show={showNotesModal} toggle={toggleNotesModal} />
            </Router>
          </div>
        </div>
      </ModalContext.Provider>
    </ModeContext.Provider>
  );
}

export default App;
