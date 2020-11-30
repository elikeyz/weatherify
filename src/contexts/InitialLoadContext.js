import { createContext } from 'react';

// Context for determining whether the user's location is loaded the first time
const InitialLoadContext = createContext({
  initialLoad: true,
  toggleInitialLoad: () => { }
});

InitialLoadContext.displayName = 'InitialLoadContext';

export default InitialLoadContext;