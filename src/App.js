import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Landing from './pages/Landing';
import SearchForm from './components/SearchForm';
import './App.css';

const App = () => {

  let backgroundImage;
  let timeClass;

  // Set background image based on whether the user's timezone is daytime or night
  const date = new Date();
  if (date.getHours() > 5 && date.getHours() < 19) {
    backgroundImage = 'url(/day-sky.jpg)';
    timeClass = 'background-image day';
  } else {
    backgroundImage = 'url(/night-sky.jpg)';
    timeClass = 'background-image night';
  }

  return (
    <div style={{ backgroundImage }} className={timeClass}>
      <div className="overlay">
        <Router>
          <Header />
          <SearchForm />
          <Switch>
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
