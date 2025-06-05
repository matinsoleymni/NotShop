import Header from "~/components/HomeHeader";
import type { Route } from "./+types/home";
import ShopCart from "~/components/ShopCart";
import BottomNavigation from "~/components/BottomNavigation";
import { useProductStore } from "~/stores/products";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import NotLogo from "../assets/icons/logo.svg?react";
import { useCart } from "../contexts/CartContext";
import CartModal from "~/components/CartModal";
import Button from "~/components/ui/Button";
import { formatPrice } from "~/utils/formatPrice";
import { useTMA } from "~/contexts/TMAContext";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Not Store" },
        { name: "description", content: "The Not Contest store" },
    ];
}

export default function Home() {
    const { products, loading, error, fetchProducts, getFilteredProducts } = useProductStore();
    const filteredProducts = getFilteredProducts();
    const { cartItems } = useCart();
    const { user } = useTMA();


    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);


    return (
        <>
            <Header />
            <div className="p-4 h-full relative">
                {loading && products.length === 0 && (
                    <div className="grid grid-cols-2 gap-x-3 gap-y-7 !pb-24 ">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={`placholder-container` + index}
                                className="space-y-2"
                            >
                                <div
                                    key={`placholder-image` + index}
                                    className="bg-gray-200 dark:bg-gray-800 h-40 animate-pulse rounded-md"
                                ></div>
                                <div
                                    key={`placholder-title` + index}
                                    className="bg-gray-200 dark:bg-gray-800 h-5 animate-pulse rounded-full"
                                ></div>
                                <div
                                    key={`placholder-price` + index}
                                    className="bg-gray-200 dark:bg-gray-800 h-3 animate-pulse rounded-full"
                                ></div>
                            </div>
                        ))}
                    </div>
                )}
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
            <BottomNavigation>
                {cartItems.length ? (
                    <CartModal className="col-span-full">
                        <Button className="w-full" variant="primary" size="big">Boy for {formatPrice(totalPrice, cartItems.length > 0 ? cartItems[0].currency : 'USD')}</Button>
                    </CartModal>
                ) : (
                    <>
                        <NavLink to="/" className={"flex flex-col items-center"}>
                            <NotLogo className="w-6 h-6 mx-auto dark:invert-100" />
                            <p className="mt-1 text-[10px] font-medium">Store</p>
                        </NavLink>
                        <NavLink to="/profile" className={"flex flex-col items-center"}>
                            {user?.photo_url ? (
                                <img src={user?.photo_url} className="w-6 h-6 rounded-full object-top mx-auto" />
                            ) : (
                                <span className="w-6 h-6 rounded-full object-top mx-auto bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                                    {user?.first_name?.[0]}{user?.last_name?.[0]}
                                </span>
                            )}

                            <p className="mt-1 text-[10px] font-medium">{user?.first_name}</p>
                        </NavLink>
                    </>
                )}
            </BottomNavigation>
        </>
    );
}
