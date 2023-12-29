import { create } from 'zustand';
import { showToast } from '../utils/toast';

const useCartStore = create((set) => ({
    cart: [],
    addToCart: (product) =>
        set((state) => {
            const existingProductIndex = state.cart.findIndex(
                (item) => item.id === product.id
            );
            if (existingProductIndex !== -1) {
                // Product already exists in cart, update its quantity
                const updatedCart = [...state.cart];
                updatedCart[existingProductIndex].quantity += 1;
                showToast("Increase quantity.");
                return { cart: updatedCart };
            } else {
                // Product doesn't exist in cart, add it
                const newCart = [...state.cart, { ...product, quantity: 1 }];
                showToast("Added to cart.");
                return { cart: newCart };
            }
        }),
    removeFromCart: (id) => set((state) => {
        const existingProductIndex = state.cart.findIndex(
            (item) => item.id === id
        );
        if (existingProductIndex !== -1) {
            return { cart: state.cart };
        } else {
            const updatedCart = state.cart.filter((item) => item.id !== id);
            showToast("Removed.")
            return { cart: updatedCart };
        }
    }),
    increaseQuantity: (id) => set((state) => {
        const product = state.cart.find((item) => item.id === id);
        if (!product) {
            showToast("No product found.");
        };
        product["quantity"] += 1;
        const updatedCart = [...state.cart, product];
        console.log(updatedCart);
        return ({ cart: updatedCart });
    }),
    decreaseQuantity: (id) => set((state) => {
        const product = state.cart.find((item) => item.id === id);
        if (!product) {
            showToast("No product found.");
        };
        if (product["quantity"] === 1) {
            state.removeFromCart(id);
        }
        product["quantity"] -= 1;
        const updatedCart = [...state.cart, product];
        console.log(updatedCart);
        return ({ cart: updatedCart });
    }),
    clearCart: () =>
        set(() => ({
            cart: [],
        })),
}));

export default useCartStore;
