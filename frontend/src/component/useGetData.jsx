import { create } from 'zustand';

export const useGetData = create((set) => ({
  categories: [],
  products: [],
  selectedCategory: '',
  selectedProduct: null, // Store a single product object

 
  // Fetch all categories
  fetchCategories: async () => {
    try {
      const res = await fetch('https://dummyjson.com/products/categories');
      const data = await res.json();
      set({ categories: data });
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  },

  // Fetch products by category
  fetchProductsByCategory: async (categoryName) => {
    try {
      const res = await fetch(`https://dummyjson.com/products/category/${categoryName}`);
      const data = await res.json();
      set({ products: data.products });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },

  // Set selected category
  setSelectedCategory: (categoryName) => {
    set({ selectedCategory: categoryName });
  },

  // Set selected product
  setSelectedProduct: (product) => {
    set({ selectedProduct: product });
  },
}));


