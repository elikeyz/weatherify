import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header', () => {
  render(<App />);
  const headerBadge = screen.getByText(/Weatherify/i);
  expect(headerBadge).toBeInTheDocument();
});
