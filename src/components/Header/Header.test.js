import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './index';

describe('Header', () => {
  test('renders header', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const headerBadge = screen.getByText(/Weatherify/i);
    expect(headerBadge).toBeInTheDocument();
  });
});