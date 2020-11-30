import { createContext } from 'react';

// Context for keeping track of notes modal visibility
const ModalContext = createContext({
    showNotesModal: false,
    toggleNotesModal: () => { },
    location: '',
    setLocation: () => { }
});

ModalContext.displayName = 'ModalContext';

export default ModalContext;