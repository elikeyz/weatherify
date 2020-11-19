import { createContext } from 'react';

const FavoritesContext = createContext({
    favorites: [],
    changeFavorites: () => {}
});

export default FavoritesContext;