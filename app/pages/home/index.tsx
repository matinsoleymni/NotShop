import Header from "~/components/HomeHeader";
import ShopCart from "~/components/ShopCart";
import AppBottomNavigation from "~/components/AppBottomNavigation";
import { useProductStore } from "~/stores/products";
import { useEffect } from "react";
import { HomeProductsPlaceholder } from "./placeholder";
import { useCart } from "../../contexts/CartContext";
import CartModal from "~/components/CartModal";
import Button from "~/components/ui/Button";
import { formatPrice } from "~/utils/formatPrice";


export default function HomePage() {
    const { products, loading, fetchProducts, getFilteredProducts } = useProductStore();
    const filteredProducts = getFilteredProducts();
    const { cartItems } = useCart();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <>
            <Header />
            <div className="p-4 h-full relative">
                {loading && products.length === 0 && <HomeProductsPlaceholder />}
                {!loading &&
                    products.length > 0 &&
                    filteredProducts.length === 0 && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bottom-[env(keyboard-inset-bottom)] flex items-center flex-col">
                            <img width={80} height={80} src="/images/HatchingChick.webp" alt="Not found" />
                            <p className="h1">Not Found</p>
                            <p className="text-[17px] text-black/50 dark:text-white/50">This style doesn’t exist</p>
                        </div>
                )}
                {filteredProducts.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-7 pb-24">
                        {filteredProducts.map((product) => (
                            <ShopCart
                                key={`product_` + product.id}
                                id={product.id}
                                name={product.name}
                                images={product.images}
                                price={product.price}
                                currency={product.currency}
                                isInCart={cartItems.find(item => item.id === product.id) ? true : false}
                            />
                        ))}
                    </div>
                )}
            </div>
            <AppBottomNavigation
                cartContent={
                    cartItems.length ? (
                        <CartModal className="col-span-full">
                            <Button className="w-full" variant="primary" size="big">Boy for {formatPrice(totalPrice, cartItems.length > 0 ? cartItems[0].currency : 'USD')}</Button>
                        </CartModal>
                    ) : undefined
                }
            />
        </>
    );
}
