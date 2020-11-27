import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NotesModal from './index';

describe('NotesModal', () => {

  afterEach(cleanup);

  afterEach(() => {
    localStorage.removeItem('notes');
  });

  test('renders modal when shown', () => {
    render(<NotesModal show={true} />);

    const modal = screen.getByTestId('notes-modal');
    const noNotesText = screen.getByText(/You have not added any notes yet/i);
    expect(modal).toBeInTheDocument();
    expect(noNotesText).toBeVisible();
  });

  test('hides modal when toggled false', () => {
    render(<NotesModal show={false} />);

    const modal = screen.queryAllByTestId('notes-modal');
    const noNotesText = screen.queryAllByText(/You have not added any notes yet/i);
    expect(modal.length).toEqual(0);
    expect(noNotesText.length).toEqual(0);
  });

  test('should display Add Note form when Add Note button is clicked', () => {
    const { getByText, getByTestId } = render(<NotesModal show={true} />);

    fireEvent.click(getByText('Add Note'));

    expect(getByTestId('new-form')).toBeVisible();
  });

  test('should add a new note successfully', () => {
    const { getByText, getByLabelText, getByTestId } = render(<NotesModal show={true} />);

    fireEvent.click(getByText('Add Note'));

    userEvent.type(getByLabelText('New Note'), 'Hello World');
    fireEvent.submit(getByTestId('new-form'));

    expect(getByText('Hello World')).toBeVisible();
  });

  test('should edit an existing note successfully', () => {
    const { getByText, getByLabelText, getByTestId } = render(<NotesModal show={true} />);

    fireEvent.click(getByText('Add Note'));

    userEvent.type(getByLabelText('New Note'), 'Hello World');
    fireEvent.submit(getByTestId('new-form'));

    fireEvent.click(getByTestId('edit-0-note'));

    const editForm = getByTestId('edit-form');
    expect(editForm).toBeVisible();

    userEvent.type(getByLabelText('Edit Note'), 'Hello Weatherify');
    fireEvent.submit(editForm);

    expect(getByText(/Hello Weatherify/i)).toBeVisible();
  });

  test('should delete an existing note successfully', () => {
    const { getByText, getByLabelText, getByTestId, queryByText } = render(<NotesModal show={true} />);

    fireEvent.click(getByText('Add Note'));

    userEvent.type(getByLabelText('New Note'), 'Hello World');
    fireEvent.submit(getByTestId('new-form'));

    expect(getByText('Hello World')).toBeVisible();

    fireEvent.click(getByTestId('delete-0-note'));

    expect(queryByText('Hello World')).not.toBeInTheDocument();
  });
});
