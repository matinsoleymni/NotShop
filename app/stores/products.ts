import { create } from 'zustand';
import { getAllProducts } from '../services/product';

export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    currency: string;
    description: string;
    left: number;
    tags: { [key: string]: any };
    images: string[];
}

interface ProductStore {
    products: Product[];
    loading: boolean;
    error: string | null;
    searchTerm: string;
    fetchProducts: () => Promise<void>;
    setSearchTerm: (term: string) => void;
    getFilteredProducts: () => Product[];
    getProductById: (id: number) => Product | null;
}

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
