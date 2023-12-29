import { create } from 'zustand';
import { showToast } from '../utils/toast';

const useFavoriteStore = create((set) => ({
    favorites: [],
    addToFavorites: (product) =>
        set((state) => {
            const exists = state.favorites.some((item) => item.id === product.id);
            if (!exists) {
                showToast("Added to favorite.");
                return { favorites: [...state.favorites, product] };
            }
            return state;
        }),
    removeFromFavorites: (productId) =>
        set((state) => {
            showToast("Removed from favorite.")
            return ({
                favorites: state.favorites.filter((item) => item.id !== productId),
            })
        }),
    clearFavorites: () =>
        set(() => ({
            favorites: [],
        })),
}));

export default useFavoriteStore;
