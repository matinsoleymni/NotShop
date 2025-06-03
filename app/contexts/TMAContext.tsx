import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import { WebApp } from '@twa-dev/types';

declare global {
    interface Window {
        Telegram: {
            WebApp: WebApp;
        };
    }
}

interface TMAContextType {
    webApp: WebApp | null;
    isLoaded: boolean;
    user: WebApp['initDataUnsafe']['user'] | null;
}

const TMAContext = createContext<TMAContextType>({
    webApp: null,
    isLoaded: false,
    user: null,
});

export const TMAProvider = ({ children }: { children: ReactNode }) => {
    const [webApp, setWebApp] = useState<WebApp | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            setWebApp(tg);
            tg.ready();
            setIsLoaded(true);
        }
    }, []);

    const value = {
        webApp,
        isLoaded,
        user: webApp?.initDataUnsafe?.user ?? null,
    };

    return <TMAContext.Provider value={value}>{children}</TMAContext.Provider>;
};

export const useTMA = () => {
    const context = useContext(TMAContext);
    if (context === undefined) {
        throw new Error('useTMA must be used within a TMAProvider');
    }
    return context;
};

export default TMAContext;