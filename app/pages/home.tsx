import Header from "~/components/HomeHeader";
import type { Route } from "./+types/home";
import ShopCart from "~/components/ShopCart";
import BottomNavigation from "~/components/BottomNavigation";
import { useProductStore } from "~/stores/products";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Not Store" },
    { name: "description", content: "The Not Contest store" },
  ];
}

export default function Home() {
  const { products, loading, error, fetchProducts, getFilteredProducts } = useProductStore();
  const filteredProducts = getFilteredProducts();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <Header />
      <div className="p-4 h-full">
        {loading && products.length === 0 && (
          <div className="grid grid-cols-2 gap-x-3 gap-y-7">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={`placholder-container`+index} className="space-y-2">
                <div key={`placholder-image`+index} className="bg-gray-200 dark:bg-gray-800 h-40 animate-pulse rounded-md"></div>
                <div key={`placholder-title`+index} className="bg-gray-200 dark:bg-gray-800 h-5 animate-pulse rounded-full"></div>
                <div key={`placholder-price`+index} className="bg-gray-200 dark:bg-gray-800 h-3 animate-pulse rounded-full"></div>
              </div>
            ))}
          </div>
        )}
        {!loading && products.length > 0 && filteredProducts.length === 0 && (
          <div className="!h-full grid items-center place-content-center">No products found.</div>
        )}
        {filteredProducts.length > 0 && (
          <div className="grid grid-cols-2 gap-x-3 gap-y-7">
            {filteredProducts.map((product) => (
              <ShopCart
                key={product.id}
                id={product.id}
                name={product.name}
                images={product.images}
                price={product.price}
                currency={product.currency}
              />
            ))}
          </div>
        )}
      </div>
      <BottomNavigation />
    </>
  );
}
