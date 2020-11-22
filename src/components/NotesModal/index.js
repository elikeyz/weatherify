import { useState, useEffect, createRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
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
    const addNewNote = () => {
        const updatedNotes = [...notes];
        updatedNotes.push(newNote);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
        setNotes(updatedNotes);
        setNewNote('');
        setShowForm(false);
    }

    // Set up the form to edit an existing note
    const handleEditNote = (index) => {
        setShowEditForm(true);
        setExistingNote(notes[index]);
        setEditId(index);
    };

    // Edit an existing note in the state and localstorage
    const editNote = () => {
        const updatedNotes = [...notes];
        updatedNotes.splice(editId, 1, existingNote);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
        setNotes(updatedNotes);
        setExistingNote('');
        setShowEditForm(false);
    };

    // Delete an existing note in the state and localStorage
    const deleteNote = (index) => {
        const updatedNotes = [...notes];
        updatedNotes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
        setNotes(updatedNotes);
    };

    // Render modal only if it has been toggled
    if (show) {
        return (
            <div ref={modal} className="modal">
                <div className="modal-content">
                    <button className="modal-close" onClick={() => toggle(false)}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <h2>Notes</h2>
                    {/* Show Add Note button if none of the forms are visible */}
                    {!showForm && !showEditForm && <button onClick={() => setShowForm(true)}><FontAwesomeIcon icon={faPlus} />&nbsp;Add Note</button>}
                    {/* Show Add Note form if it is toggled */}
                    {showForm && (
                        <form onSubmit={() => addNewNote()} onReset={() => setShowForm(false)}>
                            <textarea 
                                ref={textInput} 
                                aria-label="New Note" 
                                value={newNote} 
                                onChange={e => {e.preventDefault(); setNewNote(e.target.value)}} 
                                />
                            <div>
                                <button type="submit">Add Note</button>
                                <button className="cancel-btn" type="reset">Cancel</button>
                            </div>
                        </form>
                    )}
                    {/* Show Edit Note form if it is toggled */}
                    {showEditForm && (
                        <form onSubmit={() => editNote()} onReset={() => setShowEditForm(false)}>
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
                    {
                        (notes.length < 1) && <p>You have not added any notes yet</p>
                    }
                    {/* Render all the existing notes here */}
                    {
                        notes.map((note, noteIndex) => (
                            <article key={noteIndex}>
                                <div className="ctrl-btns">
                                    <button onClick={() => handleEditNote(noteIndex)}><FontAwesomeIcon icon={faPen} /></button>
                                    <button onClick={() => deleteNote(noteIndex)}><FontAwesomeIcon icon={faTrash} /></button>
                                </div>
                                <p>{note}</p>
                            </article>
                        ))
                    }
                    </section>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default NotesModal;