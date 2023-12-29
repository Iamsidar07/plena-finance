import { create } from "zustand";
import { showToast } from "../utils/toast";

const useCartStore = create((set) => ({
  cart: [],
  addToCart: (product) =>
    set((state) => {
      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === product.id,
      );
      if (existingProductIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingProductIndex].quantity += 1;
        showToast("Increase quantity.");
        return { cart: updatedCart };
      } else {
        const newCart = [...state.cart, { ...product, quantity: 1 }];
        showToast("Added to cart.");
        return { cart: newCart };
      }
    }),
  removeFromCart: (id) =>
    set((state) => {
      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === id,
      );
      if (existingProductIndex !== -1) {
        return { cart: state.cart };
      } else {
        const updatedCart = state.cart.filter((item) => item.id !== id);
        showToast("Removed.");
        return { cart: updatedCart };
      }
    }),
  increaseQuantity: (id) =>
    set((state) => {
      const productIndex = state.cart.findIndex((item) => item.id === id);

      if (productIndex === -1) {
        showToast("No product found.");
        return state;
      }

      const updatedCart = state.cart.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      showToast("Increase quantity.");

      return { ...state, cart: updatedCart };
    }),
  decreaseQuantity: (id) =>
    set((state) => {
      const productIndex = state.cart.findIndex((item) => item.id === id);

      if (productIndex === -1) {
        showToast("No product found.");
        return state;
      }

      if (state.cart[productIndex].quantity === 1) {
        const updatedCart = state.cart.filter((item) => item.id !== id);
        showToast("Removed.");
        return { cart: updatedCart };
      }

      const updatedCart = state.cart.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      showToast("Decrease quantity.");

      return { ...state, cart: updatedCart };
    }),
  clearCart: () =>
    set(() => ({
      cart: [],
    })),
}));

export default useCartStore;
