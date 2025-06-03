import { useState } from 'react';
import SearchIcon from '../assets/icons/search.svg?react';
import CartModal from './CartModal';
import SearchInput from './SearchInput';

export default function HomeHeader() {
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <header className="flex z-50 sticky top-0 w-full bg-white/50 dark:bg-black/50 backdrop-blur-3xl items-center justify-between mb-2 p-4 dark:text-white text-black">
      <div className={`header-content flex items-center justify-between ${showSearchInput ? 'hidden' : 'visible'}`}>
        <h1>Not Store</h1>
        <div className='flex items-center gap-2'>
            <SearchIcon className="fill-black dark:fill-white cursor-pointer" onClick={() => setShowSearchInput(true)} />
            <CartModal />
        </div>
      </div>
      <div className={`search-input-overlay ${showSearchInput ? 'visible' : 'hidden'}`}>
        <SearchInput setShowSearch={setShowSearchInput} isVisible={showSearchInput} />
      </div>
    </header>
  );
}
