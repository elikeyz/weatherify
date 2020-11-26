import { render, waitFor } from '@testing-library/react';
import moxios from 'moxios';
import { MemoryRouter } from 'react-router-dom';
import FavoritesContext from '../../contexts/FavoritesContext';
import ModeContext from '../../contexts/ModeContext';
import Landing from './index';

describe('Landing', () => {
  const mockChangeFavorites = jest.fn();
  const mockSetMode = jest.fn();
  const mockHistoryPush = jest.fn();

  jest.mock('react-router-dom', () => ({
    useHistory: () => ({
      push: mockHistoryPush,
    }),
  }));

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
    localStorage.setItem('favorites', JSON.stringify([mockDetails]));
  });

  afterEach(() => {
    localStorage.removeItem('favorites');
  });

  beforeEach(() => {
    const mockGeolocation = {
      getCurrentPosition: jest.fn()
        .mockImplementationOnce((success) => Promise.resolve(success({
          coords: {
            latitude: 51.1,
            longitude: 45.3
          }
        })))
    };
    global.navigator.geolocation = mockGeolocation;
  });

  test('renders the landing page successfully', async () => {
    moxios.stubRequest(/https:\/\/api.weatherstack.com\/current.*/, {
      status: 200,
      response: mockDetails
    });

    const { getByText } = render(
      <MemoryRouter>
        <FavoritesContext.Provider value={{ favorites: [mockDetails], changeFavorites: mockChangeFavorites }}>
          <ModeContext.Provider value={mockSetMode}>
            <Landing />
          </ModeContext.Provider>
        </FavoritesContext.Provider>
      </MemoryRouter>
    );

    expect(mockSetMode).toHaveBeenCalled();
    await waitFor(() => expect(getByText('Favorites')).toBeVisible());
    await waitFor(() => expect(getByText('Popular')).toBeVisible());
  });
});