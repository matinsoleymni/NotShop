import { createContext, useContext, useEffect, useState } from 'react';
import { init, swipeBehavior, retrieveLaunchParams, backButton, type LaunchParams } from '@telegram-apps/sdk';
import { useNavigate } from 'react-router';
import type { TMAContextType } from '../types/TMAContextType';

const TMAContext = createContext<TMAContextType | undefined>(undefined);

export const TMAProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [launchParams, setLaunchParams] = useState<LaunchParams | undefined>(undefined);

    const navigate = useNavigate();

    useEffect(() => {
        init();
        if (typeof window !== 'undefined') {
            swipeBehavior.mount();
            swipeBehavior.enableVertical();
            backButton.mount();
            backButton.show();
            backButton.onClick(() => {
                navigate("/");
            })
            const lp = retrieveLaunchParams();
            setLaunchParams(lp);

            if (lp.tgWebAppData?.start_param?.startsWith('product_')) {
                const productId = lp.tgWebAppData?.start_param.split('_')[1];
                console.log(productId)
                navigate(`/product/${productId}`);
            }
        }
    }, []);

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
