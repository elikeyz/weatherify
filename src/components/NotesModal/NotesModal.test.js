import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ModalContext from '../../contexts/ModalContext';
import NotesModal from './index';

describe('NotesModal', () => {

  afterEach(cleanup);

  afterEach(() => {
    localStorage.removeItem('notes');
  });

  test('renders modal when shown', () => {
    render(
      <ModalContext.Provider value={{ location: 'Lagos__Nigeria' }}>
        <NotesModal show={true} />
      </ModalContext.Provider>
    );

    const modal = screen.getByTestId('notes-modal');
    const noNotesText = screen.getByText(/You have not added any notes yet/i);
    expect(modal).toBeInTheDocument();
    expect(noNotesText).toBeVisible();
  });

  test('hides modal when toggled false', () => {
    render(
      <ModalContext.Provider value={{ location: 'Lagos__Nigeria' }}>
        <NotesModal show={false} />
      </ModalContext.Provider>
    );

    const modal = screen.queryAllByTestId('notes-modal');
    const noNotesText = screen.queryAllByText(/You have not added any notes yet/i);
    expect(modal.length).toEqual(0);
    expect(noNotesText.length).toEqual(0);
  });

  test('should display Add Note form when Add Note button is clicked', () => {
    const { getByText, getByTestId } = render(
      <ModalContext.Provider value={{ location: 'Lagos__Nigeria' }}>
        <NotesModal show={true} />
      </ModalContext.Provider>
    );

    fireEvent.click(getByText('Add Note'));

    expect(getByTestId('new-form')).toBeVisible();
  });

  test('should add a new note successfully', () => {
    const { getByText, getByLabelText, getByTestId } = render(
      <ModalContext.Provider value={{ location: 'Lagos__Nigeria' }}>
        <NotesModal show={true} />
      </ModalContext.Provider>
    );

    fireEvent.click(getByText('Add Note'));

    userEvent.type(getByLabelText('New Note'), 'Hello World');
    fireEvent.submit(getByTestId('new-form'));

    expect(getByText('Hello World')).toBeVisible();
  });

  test('should edit an existing note successfully', () => {
    const { getByText, getByLabelText, getByTestId } = render(
      <ModalContext.Provider value={{ location: 'Lagos__Nigeria' }}>
        <NotesModal show={true} />
      </ModalContext.Provider>
    );

    fireEvent.click(getByText('Add Note'));

    userEvent.type(getByLabelText('New Note'), 'Hello World');
    fireEvent.click(getByText('Submit'));

    fireEvent.click(getByTestId('edit-Lagos__Nigeria-0-note'));

    const editForm = getByTestId('edit-form');
    expect(editForm).toBeVisible();

    userEvent.type(getByLabelText('Edit Note'), 'Hello Weatherify');
    fireEvent.submit(editForm);

    expect(getByText(/Hello Weatherify/i)).toBeVisible();
  });

  test('should delete an existing note successfully', () => {
    const { getByText, getByLabelText, getByTestId, queryByText } = render(
      <ModalContext.Provider value={{ location: 'Lagos__Nigeria' }}>
        <NotesModal show={true} />
      </ModalContext.Provider>
    );

    fireEvent.click(getByText('Add Note'));

    userEvent.type(getByLabelText('New Note'), 'Hello World');
    fireEvent.click(getByText('Submit'));

    expect(getByText('Hello World')).toBeVisible();

    fireEvent.click(getByTestId('delete-Lagos__Nigeria-0-note'));

    expect(queryByText('Hello World')).not.toBeInTheDocument();
  });
});
