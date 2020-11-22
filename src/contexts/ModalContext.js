import { createContext } from 'react';

// Context for keeping track of notes modal visibility
const ModalContext = createContext({
    showNotesModal: false,
    toggleNotesModal: () => {}
});

ModalContext.displayName = 'ModalContext';

export default ModalContext;