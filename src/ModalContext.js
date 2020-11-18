import { createContext } from 'react';

const ModalContext = createContext({
    showNotesModal: false,
    toggleNotesModal: () => {}
});

export default ModalContext;