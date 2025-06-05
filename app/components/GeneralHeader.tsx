import { type ReactNode } from 'react';

interface HeaderProps {
    title: string;
    icons: ReactNode[]; // or JSX.Element[] can also work
}

export default function GeneralHeader({ title, icons }: HeaderProps) {
    return (
        <header className="flex z-50 p-4 sticky top-0 w-full bg-white/50 dark:bg-black/50 backdrop-blur-3xl items-center justify-between mb-2 dark:text-white text-black">
                <h1>{title}</h1>
                <div className='flex items-center gap-2'>
                        {icons.map((Icon, index) => (
                                <div key={index}>
                                        {Icon}
                                </div>
                        ))}
                </div>
        </header>
    );
}
