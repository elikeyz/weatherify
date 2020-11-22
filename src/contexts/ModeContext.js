import { createContext } from 'react';

// Context for keeping track of day mode or night mode
const ModeContext = createContext({
    setMode: () => {}
});

ModeContext.displayName = 'ModeContext';

export default ModeContext;