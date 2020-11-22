import { createContext } from 'react';

// Context for keeping track of Favorite Cities
const FavoritesContext = createContext({
    favorites: [],
    changeFavorites: () => {}
});

export default FavoritesContext;