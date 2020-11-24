import { render, waitFor, cleanup } from '@testing-library/react';
import moxios from 'moxios';
import PopularCities from './index';

describe('PopularCities', () => {
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

      afterEach(() => {
        localStorage.removeItem('popular-cities');
      });

      afterEach(cleanup);

      test('renders popular cities', async () => {
        moxios.stubRequest(/https:\/\/api.weatherstack.com\/current.*/, {
            status: 200,
            response: mockDetails
        });

        const { getByText, getAllByText } = render(<PopularCities />);

        await waitFor(() => expect(getByText('Popular')).toBeVisible());
        await waitFor(() => expect(getAllByText('London')).toEqual(15));
      });

      test('renders popular cities from localStorage when API request fails', async () => {
        moxios.stubRequest(/https:\/\/api.weatherstack.com\/current.*/, {
            status: 200,
            response: { success: false, error: {} }
        });

        localStorage.setItem('popular-cities', JSON.stringify([mockDetails]));

        const { getByText, getAllByText } = render(<PopularCities />);

        await waitFor(() => expect(getByText('Popular')).toBeVisible());
        await waitFor(() => expect(getAllByText('London').length).toEqual(1));
      });

      test('renders popular cities from localStorage when offline', async () => {
        moxios.stubRequest(/https:\/\/api.weatherstack.com\/current.*/, {
            status: 404
        });

        localStorage.setItem('popular-cities', JSON.stringify([mockDetails]));

        const { getByText, getAllByText } = render(<PopularCities />);

        await waitFor(() => expect(getByText('Popular')).toBeVisible());
        await waitFor(() => expect(getAllByText('London').length).toEqual(1));
      });
});