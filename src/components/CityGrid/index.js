import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

const CityGrid = ({ cities, clearCity }) => {

    const history = useHistory();

    return (
        <div data-testid="city-grid" className="city-grid">
            {/* Sort the cities in alphabetical order before rendering them */}
            {cities.sort((a, b) => a.location.name.charCodeAt(0) - b.location.name.charCodeAt(0)).map((city, index) => {
                // Render city if data was loaded successfully
                if (city.location) return (
                    <div key={index} onClick={(e) => history.push(`/weather?search=${encodeURIComponent(`${city.location.name},${city.location.country}`)}`)}>
                        <div>
                            {/* Clear button */}
                            <button onClick={(e) => { e.stopPropagation(); clearCity(index); }}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
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