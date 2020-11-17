import './WeatherDetails.css';

const WeatherDetails = () => {
    return (
        <section class="weather-details">
            <h2>Lagos, Nigeria</h2>
            <p class="description">Clear Skies</p>
            <p class="temp">30<sup>o</sup>C</p>
            <img src="https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0025_light_rain_showers_night.png" alt="clear skies" />
        </section>
    );
};

export default WeatherDetails;