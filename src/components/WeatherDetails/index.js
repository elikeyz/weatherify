import './WeatherDetails.css';


/**
 * The Weather Details component
 */
const WeatherDetails = () => {
    return (
        <section class="weather-details">
            <div>
                <h2>Lagos, Nigeria</h2>
                <p class="description">Clear Skies</p>
                <div class="temp-section">
                    <img src="https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0025_light_rain_showers_night.png" alt="clear skies" />
                    <p class="temp">30<sup>o</sup>C</p>
                </div>
            </div>
            <div>
                <p></p>
            </div>
        </section>
    );
};

export default WeatherDetails;