import { useState } from "react";
import { useTranslation } from "react-i18next";
import SearchIcon from "../assets/icons/search.svg?react";
import CartIcon from "../assets/icons/cart.svg?react";
import CartModal from "./CartModal";
import SearchInput from "./SearchInput";
import { useCart } from "../contexts/CartContext";

export default function HomeHeader() {
    const [showSearchInput, setShowSearchInput] = useState(false);
    const { cartItemCount } = useCart();
    const { t } = useTranslation();

    return (
        <header className="flex z-50 sticky -top-1 w-full bg-white/50 dark:bg-black/50 backdrop-blur-3xl items-center justify-between mb-2 p-4 dark:text-white text-black">
            <div
                className={`header-content flex items-center justify-between ${
                    showSearchInput ? "hidden" : "visible"
                }`}
            >
                <h1>{t('not_store')}</h1>
                <div className="flex items-center gap-2">
                    <SearchIcon
                        className="fill-black dark:fill-white cursor-pointer"
                        onClick={() => setShowSearchInput(true)}
                    />
                    <CartModal>
                        {cartItemCount !== 0 ? (
                            <p className="bg-black min-w-5 min-h-5 dark:bg-white text-white dark:text-black text-lg font-bold rounded-full px-[9px]">
                                {cartItemCount}
                            </p>
                        ) : (
                            <CartIcon className="fill-black dark:fill-white" />
                        )}
                    </CartModal>
                </div>
            </div>
            <div
                className={`search-input-overlay ${
                    showSearchInput ? "visible" : "hidden"
                }`}
            >
                <SearchInput
                    setShowSearch={setShowSearchInput}
                    isVisible={showSearchInput}
                />
            </div>
        </header>
    );
}
