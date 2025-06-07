import type { Product } from "./Product";

export interface ProductStore {
    products: Product[];
    loading: boolean;
    error: string | null;
    searchTerm: string;
    fetchProducts: () => Promise<void>;
    setSearchTerm: (term: string) => void;
    getFilteredProducts: () => Product[];
    getProductById: (id: number) => Product | null;
}
