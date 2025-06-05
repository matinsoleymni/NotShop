"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { swipeBehavior, requestFullscreen, retrieveLaunchParams, backButton, type LaunchParams } from '@telegram-apps/sdk';
import type { User } from '@telegram-apps/sdk';

interface TMAContextType {
    launchParams: LaunchParams | undefined;
    user: User | undefined;
}

const TMAContext = createContext<TMAContextType | undefined>(undefined);

export const TMAProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [launchParams, setLaunchParams] = useState<LaunchParams | undefined>(undefined);

    useEffect(() => {
        const lp = retrieveLaunchParams();
        // swipeBehavior.mount();
        // swipeBehavior.enableVertical();
        // backButton.mount();
        // backButton.show();
        setLaunchParams(lp);
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
