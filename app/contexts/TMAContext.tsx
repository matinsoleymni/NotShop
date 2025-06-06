import React, { createContext, useContext, useEffect, useState } from 'react';
import { swipeBehavior, retrieveLaunchParams, backButton, type LaunchParams } from '@telegram-apps/sdk';
import type { User } from '@telegram-apps/sdk';
import { redirect } from 'react-router';

interface TMAContextType {
    launchParams: LaunchParams | undefined;
    user: User | undefined;
}

const TMAContext = createContext<TMAContextType | undefined>(undefined);

export const TMAProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [launchParams, setLaunchParams] = useState<LaunchParams | undefined>(undefined);

    useEffect(() => {
        swipeBehavior.mount();
        swipeBehavior.enableVertical();
        backButton.mount();
        backButton.show();
        const lp = retrieveLaunchParams();
        setLaunchParams(lp);

        if (lp.tgWebAppData?.start_param?.startsWith('product_')) {
            const productId = lp.tgWebAppData?.start_param.split('_')[1];
            redirect(`/product/${productId}`);
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
