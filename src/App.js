import Header from './Header';
import './App.css';

const App = () => {

  let backgroundImage;
  let timeClass;

  const date = new Date();
  if (date.getHours() > 5 && date.getHours < 19) {
    backgroundImage = 'url(/day-sky.jpg)';
    timeClass = 'background-image day';
  } else {
    backgroundImage = 'url(/night-sky.jpg)';
    timeClass = 'background-image night';
  }

  return (
    <div style={{ backgroundImage }} className={timeClass}>
      <Header />
    </div>
  );
}

export default App;
