import { render, screen } from '@testing-library/react';
import CityGrid from './index';

describe('CityGrid', () => {

  jest.mock('react-router-dom', () => ({
    useHistory: () => ({
      push: jest.fn(),
    }),
  }));

  test('renders CityGrid', () => {
    render(<CityGrid cities={[]} clearCity={jest.fn()} />);
    const grid = screen.getByTestId('city-grid');
    expect(grid).toBeInTheDocument();
  });
});
