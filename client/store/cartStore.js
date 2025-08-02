import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addToCart: (product) => {
        const { items } = get();
        const existingItem = items.find(
          (item) => item.id === product.id && item.selectedSize === product.selectedSize
        );

        if (existingItem) {
          set((state) => ({
            items: state.items.map((item) =>
              item.id === product.id && item.selectedSize === product.selectedSize
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }));
        } else {
          set((state) => ({
            items: [...state.items, { ...product, quantity: 1 }],
          }));
        }

        // Recalculate totals
        get().calculateTotals();
      },

      removeFromCart: (productId, selectedSize) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.id === productId && item.selectedSize === selectedSize)
          ),
        }));
        get().calculateTotals();
      },

      updateQuantity: (productId, selectedSize, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, selectedSize);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId && item.selectedSize === selectedSize
              ? { ...item, quantity }
              : item
          ),
        }));
        get().calculateTotals();
      },

      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 });
      },

      calculateTotals: () => {
        const { items } = get();
        const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        set({ totalItems, totalPrice });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

export default useCartStore; 