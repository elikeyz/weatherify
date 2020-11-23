import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Error404 from './index';

describe('Error404', () => {
  test('renders header', () => {
    render(
      <MemoryRouter>
        <Error404 />
      </MemoryRouter>
    );
    const title = screen.getByText(/Oops/i);
    expect(title).toBeInTheDocument();
  });
});
