import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import WeatherDetails from './index';
import ModeContext from '../../contexts/ModeContext';
import FavoritesContext from '../../contexts/FavoritesContext';
import ModalContext from '../../contexts/ModalContext';

describe('WeatherDetails', () => {

    const mockChangeFavorites = jest.fn();
    const mockSetMode = jest.fn();
    const mockToggleNotesModal = jest.fn();
    const mockSetLocation = jest.fn();

    const mockDetails = {
        "request": {
            "type": "City",
            "query": "London, United Kingdom",
            "language": "en",
            "unit": "m"
        },
        "location": {
            "name": "London",
            "country": "United Kingdom",
            "region": "City of London, Greater London",
            "lat": "51.517",
            "lon": "-0.106",
            "timezone_id": "Europe/London",
            "localtime": "2020-11-22 20:46",
            "localtime_epoch": 1606077960,
            "utc_offset": "0.0"
        },
        "current": {
            "observation_time": "08:46 PM",
            "temperature": 9,
            "weather_code": 296,
            "weather_icons": [
                "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0033_cloudy_with_light_rain_night.png"
            ],
            "weather_descriptions": [
                "Light Rain"
            ],
            "wind_speed": 7,
            "wind_degree": 290,
            "wind_dir": "WNW",
            "pressure": 1027,
            "precip": 0,
            "humidity": 71,
            "cloudcover": 0,
            "feelslike": 8,
            "uv_index": 1,
            "visibility": 10,
            "is_day": "no"
        }
    };

    afterEach(cleanup);

    test('renders WeatherDetails', () => {
        const { getByAltText } = render(
            <FavoritesContext.Provider value={{ favorites: [], changeFavorites: mockChangeFavorites}}>
                <ModeContext.Provider value={mockSetMode}>
                    <ModalContext.Provider value={{ showNotesModal: false, toggleNotesModal: mockToggleNotesModal, setLocation: mockSetLocation }}>
                        <WeatherDetails details={mockDetails} />
                    </ModalContext.Provider>
                </ModeContext.Provider>
            </FavoritesContext.Provider>
        );

        const title = screen.getByText('London, City of London, Greater London, United Kingdom');
        expect(title).toBeInTheDocument();
        expect(getByAltText('Light Rain')).toBeVisible();
    });

    test('should show notes modal when View Notes button is clicked', () => {
        const { getByText } = render(
            <FavoritesContext.Provider value={{ favorites: [], changeFavorites: mockChangeFavorites}}>
                <ModeContext.Provider value={mockSetMode}>
                    <ModalContext.Provider value={{ showNotesModal: false, toggleNotesModal: mockToggleNotesModal, setLocation: mockSetLocation }}>
                        <WeatherDetails details={mockDetails} />
                    </ModalContext.Provider>
                </ModeContext.Provider>
            </FavoritesContext.Provider>
        );

        fireEvent.click(getByText('View Notes'));

        expect(mockToggleNotesModal).toHaveBeenCalledWith(true);
    });

    test('should add and remove city from favorites successfully', () => {
        const { getByText } = render(
            <FavoritesContext.Provider value={{ favorites: [], changeFavorites: mockChangeFavorites}}>
                <ModeContext.Provider value={mockSetMode}>
                    <ModalContext.Provider value={{ showNotesModal: false, toggleNotesModal: mockToggleNotesModal, setLocation: mockSetLocation }}>
                        <WeatherDetails details={mockDetails} />
                    </ModalContext.Provider>
                </ModeContext.Provider>
            </FavoritesContext.Provider>
        );

        fireEvent.click(getByText(/Add To Favorites/i));

        expect(mockChangeFavorites).toHaveBeenCalled();
    });
});