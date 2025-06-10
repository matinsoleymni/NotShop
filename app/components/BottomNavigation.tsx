import type { BottomNavigationProps } from '../types/BottomNavigationProps';

export default function BottomNavigation({ children, className }: BottomNavigationProps) {
    return (
        <nav className={`px-5 py-4 fixed w-full bottom-0 grid grid-cols-2 bg-white dark:bg-black dark:text-white text-black ${className}`}>
            {children}
        </nav>
    );
}
