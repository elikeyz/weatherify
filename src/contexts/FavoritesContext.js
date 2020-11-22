import { createContext } from 'react';

// Context for keeping track of Favorite Cities
const FavoritesContext = createContext({
    favorites: [],
    changeFavorites: () => {}
});

FavoritesContext.displayName = 'FavoritesContext';

export default FavoritesContext;