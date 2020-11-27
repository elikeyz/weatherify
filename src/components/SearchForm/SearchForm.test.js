import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchForm from './index';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('SearchForm', () => {

  afterEach(cleanup);

  test('renders SearchForm', () => {

    render(<SearchForm />);
    const label = screen.getByText(/Search Locations/i);
    expect(label).toBeInTheDocument();
  });

  test('changes value in the search field when data is entered', () => {

    const { getByPlaceholderText } = render(<SearchForm />);

    const textField = getByPlaceholderText('New York, USA');
    userEvent.type(textField, 'Lagos, Nigeria');

    expect(textField.value).toBe('Lagos, Nigeria');
  });

  test('navigates to weather details page when search data is submitted', () => {

    const { location } = window;
    delete window.location;
    window.location = { reload: jest.fn() };

    const { getByPlaceholderText, getByTestId } = render(<SearchForm />);

    const textField = getByPlaceholderText('New York, USA');
    userEvent.type(textField, 'Lagos, Nigeria');
    fireEvent.submit(getByTestId('search-form'));

    expect(mockHistoryPush).toHaveBeenCalledWith(`/weather?search=${encodeURIComponent('Lagos,Nigeria')}`);
    expect(window.location.reload).toHaveBeenCalled();
    window.location = location;
  });
});
