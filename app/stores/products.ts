import { create } from 'zustand';
import { getAllProducts } from '../services/api/product';
import type { ProductStore } from '../types/ProductStore';

export const useProductStore = create<ProductStore>((set, get) => ({
    products: [],
    loading: false,
    error: null,
    searchTerm: '',

    fetchProducts: async () => {
        const { products, loading } = get();
        if (products.length > 0 || loading) {
            return;
        }

        set({ loading: true });
        try {
            const data = await getAllProducts();
            set({ products: data, loading: false, error: null });
        } catch (error) {
            console.error('Error fetching products:', error);
            set({ error: 'Failed to fetch products', loading: false });
        }
    },
    setSearchTerm: (term: string) => set({ searchTerm: term }),
    getFilteredProducts: () => {
        const { products, searchTerm } = get();
        if (!searchTerm) {
            return products;
        }
        return products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    },
    getProductById:(id: number) => {
        const { products, fetchProducts } = get();
        if (products.length === 0) {
            fetchProducts();
        }
        const updatedProducts = get().products;
        return updatedProducts.find(product => product.id === id) || null;
    }
}));
