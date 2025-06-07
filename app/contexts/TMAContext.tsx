import { createContext, useContext, useEffect, useState } from 'react';
import { init, swipeBehavior, retrieveLaunchParams, backButton, type LaunchParams } from '@telegram-apps/sdk';
import { useNavigate, useLocation } from 'react-router';
import type { TMAContextType } from '../types/TMAContextType';

const TMAContext = createContext<TMAContextType | undefined>(undefined);

export const TMAProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [launchParams, setLaunchParams] = useState<LaunchParams | undefined>(undefined);
    const [isTMA, setIsTMA] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        init();
        if (typeof window !== 'undefined') {
            setIsTMA(true);
            swipeBehavior.mount();
            swipeBehavior.enableVertical();
            backButton.mount();

            if (location.pathname === '/') {
                backButton.hide();
            } else {
                backButton.show();
                backButton.onClick(() => {
                    navigate('/');
                });
            }

            const lp = retrieveLaunchParams();
            setLaunchParams(lp);

            if (lp.tgWebAppData?.start_param?.startsWith('product_')) {
                const productId = lp.tgWebAppData?.start_param.split('_')[1];
                console.log(productId)
                navigate(`/product/${productId}`);
            }
        }
    }, [location.pathname, navigate]);

    return (
        <TMAContext.Provider value={{ launchParams, user: launchParams?.tgWebAppData?.user }}>
            {children}
        </TMAContext.Provider>
    );
};

export const useTMA = () => {
    const context = useContext(TMAContext);
    if (context === undefined) {
        throw new Error('useTMA must be used within a TMAProvider');
    }
    return context;
};
