import { useEffect, useRef } from 'react';
import { useTMA } from "~/contexts/TMAContext";
import type { Route } from "./+types/home";
import { useHistoryStore } from '../stores/history';
import { useProductStore } from '../stores/products';
import { formatPrice } from '../utils/formatPrice';
import BottomNavigation from '~/components/BottomNavigation';
import { NavLink } from 'react-router';
import NotLogo from "../assets/icons/logo.svg?react";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: `Profile` },
        { name: "description", content: "User profile page" },
    ];
}

export default function Home() {
    const { user } = useTMA();
    const { history, displayedHistory, loading, fetchHistory, loadMoreHistory } = useHistoryStore();
    const { products, fetchProducts } = useProductStore();

    useEffect(() => {
        fetchHistory();
        fetchProducts();
    }, [fetchHistory, fetchProducts]);

    useEffect(() => {
        const handleScroll = () => {
            const container = historyListRef.current;
            if (container) {
                const { bottom } = container.getBoundingClientRect();
                if (bottom <= window.innerHeight + 100 &&
                    displayedHistory.length < history.length &&
                    !loading
                ) {
                    loadMoreHistory();
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [displayedHistory.length, history.length, loading, loadMoreHistory]);

    const historyListRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <div className="flex flex-col pt-10 px-4">
                <div className="text-center space-y-2">
                    {user?.photo_url ? (
                        <img src={user?.photo_url} className="w-30 h-30 rounded-full object-top mx-auto" />
                    ) : (
                        <span className="w-30 h-30 text-3xl rounded-full object-top mx-auto bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                            {user?.first_name?.[0]}{user?.last_name?.[0]}
                        </span>
                    )}
                    <h1>{user?.first_name} {user?.last_name}</h1>
                </div>
                <div className="mt-8 pb-24">
                    <h3>History</h3>
                    <div className="space-y-3 mt-4" ref={historyListRef}>
                        {loading && displayedHistory.length === 0 ? (
                            Array.from({ length: 5 }).map((_, index) => (
                                <div key={index} className="flex items-center justify-between rounded-lg animate-pulse">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-[60px] h-[60px] rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                                        <div className="space-y-1">
                                            <div className="h-3 w-24 rounded bg-gray-300 dark:bg-gray-700"></div>
                                            <div className="h-4 w-32 rounded bg-gray-300 dark:bg-gray-700"></div>
                                        </div>
                                    </div>
                                    <div className="text-right space-y-1">
                                        <div className="h-3 w-16 rounded bg-gray-300 dark:bg-gray-700"></div>
                                        <div className="h-4 w-20 rounded bg-gray-300 dark:bg-gray-700"></div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            displayedHistory.map(historyItem => {
                                const product = products.find(p => p.id === historyItem.id);
                                const date = new Date(historyItem.timestamp * 1000);
                                const formattedDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: '2-digit' });

                                return (
                                    <div key={historyItem.id} className="flex items-center justify-between rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            {product?.images?.[0] && (
                                                <img src={product.images[product.id - 1]} alt={product.name} className="w-[60px] h-[60px] rounded-lg object-cover" />
                                            )}
                                            <div>
                                                <p className="text-black/50 text-[12px] dark:text-white/50">{product?.category}</p>
                                                <h4>{product?.name}</h4>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-black/50 text-[12px] dark:text-white/50">{formattedDate}</p>
                                            <h4>{formatPrice(historyItem.total, historyItem.currency)}</h4>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                        {loading && displayedHistory.length > 0 && (
                            <p className="text-center">Loading more history...</p>
                        )}
                    </div>
                </div>
            </div>
            <BottomNavigation>
                <>
                    <NavLink to="/" className={({ isActive }) =>
                        isActive
                            ? "flex flex-col items-center"
                            : "flex flex-col items-center opacity-50"}>
                        <NotLogo className="w-6 h-6 mx-auto dark:invert-100" />
                        <p className="mt-1 text-[10px] font-medium">Store</p>
                    </NavLink>
                    <NavLink to="/profile" className={({ isActive }) =>
                        isActive
                            ? "flex flex-col items-center"
                            : "flex flex-col items-center opacity-50"}>
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
            </BottomNavigation>
        </>
    );
}
