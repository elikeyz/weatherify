import React from 'react';
import { render, screen } from '@testing-library/react';
import CityGrid from './index';

const mockCities = [
  {
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
  }
];

describe('CityGrid', () => {

  jest.mock('react-router-dom', () => ({
    useHistory: () => ({
      push: jest.fn(),
    }),
  }));

  test('renders CityGrid', () => {
    const { getByText } = render(<CityGrid cities={mockCities} clearCity={jest.fn()} />);
    const grid = screen.getByTestId('city-grid');
    expect(grid).toBeInTheDocument();
    expect(getByText('London')).toBeVisible();
    expect(getByText(/9/i)).toBeVisible();
  });
});
