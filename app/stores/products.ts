import { create } from 'zustand';
import { getAllProducts } from '../services/product';

interface Product {
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
}

export const useProductStore = create<ProductStore>((set, get) => ({
    products: [],
    loading: false,
    error: null,
    searchTerm: '',

    fetchProducts: async () => {
        const { products, loading } = get();
        if (products.length > 0 || loading) {
            // Products already fetched or currently loading, do nothing
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
}));
