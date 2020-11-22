import { render, screen } from '@testing-library/react';
import Header from './index';

describe('Header', () => {
  test('renders header', () => {
    render(<Header />);
    const headerBadge = screen.getByText(/Weatherify/i);
    expect(headerBadge).toBeInTheDocument();
  });
});