import { create } from "zustand";
import { showToast } from "../utils/toast";

const useFavouriteStore = create((set) => ({
  favourites: [],
  addToFavourites: (product) =>
    set((state) => {
      const exists = state.favourites.some((item) => item.id === product.id);
      if (!exists) {
        showToast("Added to favourite.");
        return { favourites: [...state.favourites, product] };
      }
      return state;
    }),
  removeFromFavourites: (productId) =>
    set((state) => {
      showToast("Removed from favourite.");
      return {
        favourites: state.favourites.filter((item) => item.id !== productId),
      };
    }),
  clearFavourites: () =>
    set(() => ({
      favourites: [],
    })),
}));

export default useFavouriteStore;
