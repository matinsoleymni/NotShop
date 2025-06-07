import { type ReactNode } from 'react';

export interface HeaderProps {
    title: string;
    icons: ReactNode[]; // or JSX.Element[] can also work
}
