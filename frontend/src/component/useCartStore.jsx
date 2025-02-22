import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [], 
  addToCart: async (product) => {
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            title: product.title,
            price: product.price,
            img:product.thumbnail,
            amount: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }

      const data = await response.json();
      set((state) => ({
        cart: [...state.cart, data], 
      }));

      console.log("Product added to cart:", data);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  },
}));
