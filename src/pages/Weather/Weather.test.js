import React from 'react';
import { render, waitFor, cleanup } from '@testing-library/react';
import moxios from 'moxios';
import { MemoryRouter } from 'react-router-dom';
import Weather from './index';
import ModeContext from '../../contexts/ModeContext';
import FavoritesContext from '../../contexts/FavoritesContext';
import ModalContext from '../../contexts/ModalContext';

describe('Weather', () => {

    const mockChangeFavorites = jest.fn();
    const mockSetMode = jest.fn();
    const mockToggleNotesModal = jest.fn();

  const originalWindow = global.window;

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

      beforeEach(() => {
        moxios.install();
      });
    
      afterEach(() => {
        moxios.uninstall();
      });

      beforeEach(() => {

        global.window = Object.create(window);
        const search = "?search=London,UK";
        Object.defineProperty(window, 'location', {
          value: {
            search
          }
        });

        Object.defineProperty(window, 'localStorage', {
          value: {
            getItem: () => JSON.stringify([mockDetails])
          }
        });
      });

  afterEach(() => {
    global.window = originalWindow;
      });

      afterEach(cleanup);

      test('renders weather details after loading data from server', async () => {
        moxios.stubRequest(/https:\/\/api.weatherstack.com\/current.*/, {
            status: 200,
            response: mockDetails
        });

        const { getByText, getByAltText } = render(
            <MemoryRouter>
                <FavoritesContext.Provider value={{ favorites: [], changeFavorites: mockChangeFavorites}}>
                    <ModeContext.Provider value={mockSetMode}>
                        <ModalContext.Provider value={{ showNotesModal: false, toggleNotesModal: mockToggleNotesModal}}>
                            <Weather />
                        </ModalContext.Provider>
                    </ModeContext.Provider>
                </FavoritesContext.Provider>
            </MemoryRouter>
        );

        await waitFor(() => expect(getByText('London, City of London, Greater London, United Kingdom')).toBeVisible());
        await waitFor(() => expect(getByAltText('Light Rain')).toBeVisible());
      });

      test('renders 404 page if it fails to get weather data', async () => {
        moxios.stubRequest(/https:\/\/api.weatherstack.com\/current.*/, {
            status: 200,
            response: {}
        });

        const { queryByText, queryByAltText, getByText } = render(
            <MemoryRouter>
                <FavoritesContext.Provider value={{ favorites: [], changeFavorites: mockChangeFavorites}}>
                    <ModeContext.Provider value={mockSetMode}>
                        <ModalContext.Provider value={{ showNotesModal: false, toggleNotesModal: mockToggleNotesModal}}>
                            <Weather />
                        </ModalContext.Provider>
                    </ModeContext.Provider>
                </FavoritesContext.Provider>
            </MemoryRouter>
        );

        await waitFor(() => expect(getByText(/Oops/i)).toBeVisible());
      });
});