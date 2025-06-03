import SearchIcon from '../assets/icons/search.svg?react';
import CartModal from './CartModal';

export default function Header() {
  return (
    <header className="flex z-50 sticky top-0 w-full bg-white/50 dark:bg-black/50 backdrop-blur-3xl items-center justify-between mb-2 p-4 dark:text-white text-black">
        <h1>Not Store</h1>
        <div className='flex items-center gap-2'>
            <SearchIcon className="fill-black dark:fill-white" />
            <CartModal />
        </div>
    </header>
  );
}
