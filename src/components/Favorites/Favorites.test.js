import { render, waitFor } from '@testing-library/react';
import moxios from 'moxios';
import FavoritesContext from '../../contexts/FavoritesContext';
import Favorites from './index';

describe('Favorites', () => {
  const mockChangeFavorites = jest.fn();
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

  test('renders Favorites when present', async () => {
    moxios.stubRequest(/https:\/\/api.weatherstack.com\/current.*/, {
      status: 200,
      response: mockDetails
    });

    const { getByText } = render(
      <FavoritesContext.Provider value={{ favorites: [mockDetails], changeFavorites: mockChangeFavorites }}>
        <Favorites />
      </FavoritesContext.Provider>
    );

    await waitFor(() => expect(mockChangeFavorites).toHaveBeenCalled());
    await waitFor(() => expect(getByText('Favorites')).toBeVisible());
    await waitFor(() => expect(getByText('London')).toBeVisible());
  });

  test('renders Favorites from local storage when request fails', async () => {
    moxios.stubRequest(/https:\/\/api.weatherstack.com\/current.*/, {
      status: 200,
      response: { status: false, error: {} }
    });

    const { getByText } = render(
      <FavoritesContext.Provider value={{ favorites: [mockDetails], changeFavorites: mockChangeFavorites }}>
        <Favorites />
      </FavoritesContext.Provider>
    );

    await waitFor(() => expect(getByText('Favorites')).toBeVisible());
  });

  test('renders Favorites from local storage when offline', async () => {
    moxios.stubRequest(/https:\/\/api.weatherstack.com\/current.*/, {
      status: 404
    });

    const { getByText } = render(
      <FavoritesContext.Provider value={{ favorites: [mockDetails], changeFavorites: mockChangeFavorites }}>
        <Favorites />
      </FavoritesContext.Provider>
    );

    await waitFor(() => expect(getByText('Favorites')).toBeVisible());
    await waitFor(() => expect(getByText('London')).toBeVisible());
  });

  test('hides Favorites if none have been added', async () => {
    moxios.stubRequest(/https:\/\/api.weatherstack.com\/current.*/, {
      status: 200,
      response: mockDetails
    });

    localStorage.removeItem('favorites');

    const { queryAllByText } = render(
      <FavoritesContext.Provider value={{ favorites: [], changeFavorites: mockChangeFavorites }}>
        <Favorites />
      </FavoritesContext.Provider>
    );

    await waitFor(() => expect(mockChangeFavorites).not.toHaveBeenCalled());
    await waitFor(() => expect(queryAllByText('Favorites').length).toEqual(0));
    await waitFor(() => expect(queryAllByText('London').length).toEqual(0));
  });
});
