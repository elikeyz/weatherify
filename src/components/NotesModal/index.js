import React, { useState, useEffect, createRef, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import ModalContext from '../../contexts/ModalContext';
import './NotesModal.css';

/**
 * The Notes Modal component
 * @param {object} props 
 */
const NotesModal = (props) => {

    const { toggle, show } = props;
    const modal = createRef();
    const textInput = createRef();

    const [notes, setNotes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newNote, setNewNote] = useState('');
    const [showEditForm, setShowEditForm] = useState(false);
    const [existingNote, setExistingNote] = useState('');
    const [editId, setEditId] = useState(-1);
    const [editLocation, setEditLocation] = useState('global');

    const { location } = useContext(ModalContext);

    useEffect(() => {
        // Set modal to disappear if user clicks outside the modal content
        window.addEventListener('click', (e) => {
            if (e.target === modal.current) {
                toggle(false);
            }
        });
    }, [modal, toggle]);

    useEffect(() => {
        // Get existing notes from local storage
        if (localStorage.getItem('notes')) {
            const storedNotes = JSON.parse(localStorage.getItem('notes'));
            setNotes(storedNotes);
        }
    }, []);

    // Add a new note the notes state and local storage
    const addNewNote = (location = 'global') => {
        const updatedNotes = { ...notes };
        if (updatedNotes[location]) {
            updatedNotes[location].push(newNote);
        } else {
            updatedNotes[location] = [newNote];
        }

        localStorage.setItem('notes', JSON.stringify(updatedNotes));
        setNotes(updatedNotes);
        setNewNote('');
        setShowForm(false);
    }

    // Set up the form to edit an existing note
    const handleEditNote = (index, location = 'global') => {
        setShowEditForm(true);
        setExistingNote(notes[location][index]);
        setEditId(index);
        setEditLocation(location);
    };

    // Edit an existing note in the state and localstorage
    const editNote = () => {
        const updatedNotes = { ...notes };
        updatedNotes[editLocation].splice(editId, 1, existingNote);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
        setNotes(updatedNotes);
        setExistingNote('');
        setShowEditForm(false);
    };

    // Delete an existing note in the state and localStorage
    const deleteNote = (index, location = 'global') => {
        const updatedNotes = { ...notes };
        updatedNotes[location].splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
        setNotes(updatedNotes);
    };

    // Render modal only if it has been toggled
    if (show) {
        return (
            <div data-testid="notes-modal" ref={modal} className="modal">
                <div className="modal-content">
                    <button className="modal-close" onClick={() => toggle(false)}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <h2>Notes</h2>
                    {/* Show Add Note button if none of the forms are visible */}
                    {!showForm && !showEditForm && <button onClick={() => setShowForm(true)}><FontAwesomeIcon icon={faPlus} />&nbsp;Add Note</button>}
                    {/* Show Add Note form if it is toggled */}
                    {showForm && (
                        <form data-testid="new-form" onReset={() => setShowForm(false)}>
                            <textarea 
                                ref={textInput} 
                                aria-label="New Note" 
                                value={newNote} 
                                onChange={e => {e.preventDefault(); setNewNote(e.target.value)}} 
                                />
                            <div>
                                <button onClick={() => addNewNote('global')}>Add For All Locations</button>
                                <button onClick={() => addNewNote(location)}>Add For This Location</button>
                                <button className="cancel-btn" type="reset">Cancel</button>
                            </div>
                        </form>
                    )}
                    {/* Show Edit Note form if it is toggled */}
                    {showEditForm && (
                        <form data-testid="edit-form" onSubmit={() => editNote()} onReset={() => setShowEditForm(false)}>
                            <textarea  
                                aria-label="Edit Note" 
                                value={existingNote} 
                                onChange={e => {e.preventDefault(); setExistingNote(e.target.value)}} 
                                />
                            <div>
                                <button type="submit">Edit Note</button>
                                <button className="cancel-btn" type="reset">Cancel</button>
                            </div>
                        </form>
                    )}
                    <section>
                        {/* Show this if no notes have been added */}
                    {
                        (notes.length < 1) && <p>You have not added any notes yet</p>
                    }
                    {/* Render all the existing notes here */}
                        {notes['global'] && notes['global'].length > 0 && (<h3>For All Locations</h3>)}
                        <div>
                            {
                                notes['global'] && notes['global'].map((note, noteIndex) => {
                                    const editTestId = `edit-global-${noteIndex}-note`;
                                    const deleteTestId = `delete-global-${noteIndex}-note`;
                                    return (
                                        <article key={noteIndex}>
                                            <div className="ctrl-btns">
                                                <button data-testid={editTestId} aria-label="Edit Button" onClick={() => handleEditNote(noteIndex, 'global')}><FontAwesomeIcon icon={faPen} /></button>
                                                <button data-testid={deleteTestId} aria-label="Delete Button" onClick={() => deleteNote(noteIndex, 'global')}><FontAwesomeIcon icon={faTrash} /></button>
                                            </div>
                                            <p>{note}</p>
                                        </article>
                                    );
                                })
                            }
                        </div>

                        {notes[location] && notes[location].length > 0 && (<h3>For {location.split('__').join(', ')}</h3>)}
                        <div>
                        {
                                notes[location] && notes[location].map((note, noteIndex) => {
                                    const editTestId = `edit-${location}-${noteIndex}-note`;
                                    const deleteTestId = `delete-${location}-${noteIndex}-note`;
                                return (
                                <article key={noteIndex}>
                                    <div className="ctrl-btns">
                                            <button data-testid={editTestId} aria-label="Edit Button" onClick={() => handleEditNote(noteIndex, location)}><FontAwesomeIcon icon={faPen} /></button>
                                            <button data-testid={deleteTestId} aria-label="Delete Button" onClick={() => deleteNote(noteIndex, location)}><FontAwesomeIcon icon={faTrash} /></button>
                                    </div>
                                    <p>{note}</p>
                                </article>
                                );
                            })
                        }
                        </div>
                    </section>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default NotesModal;