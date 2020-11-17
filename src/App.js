import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Landing from './pages/Landing';
import SearchForm from './components/SearchForm';
import Weather from './pages/Weather';
import './App.css';

/**
 * The App component
 */
const App = () => {

  // Declare the background image and time of day style class states
  const [backgroundImage, setBackground] = useState('/day-sky.jpg');
  const [timeClass, setTimeClass] = useState('/night-sky.jpg');

  useEffect(() => {
    // Set background image and style classes based on whether the user's timezone is daytime or night
    const date = new Date();
    if (date.getHours() > 5 && date.getHours() < 19) {
      setBackground('/day-sky.jpg');
      setTimeClass('background-image day');
    } else {
      setBackground('/night-sky.jpg');
      setTimeClass('background-image night');
    }
  }, []);

  return (
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
        </Router>
      </div>
    </div>
  );
}

export default App;
