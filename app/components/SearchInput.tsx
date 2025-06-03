import { useState } from 'react';
import SearchIcon from '../assets/icons/search.svg?react';
import type { Dispatch, SetStateAction } from 'react';

interface SearchInputProps {
  setShowSearch: Dispatch<SetStateAction<boolean>>;
  isVisible: boolean;
}

export default function SearchInput({ setShowSearch, isVisible }: SearchInputProps) {
  const [search, setSearch] = useState('');

  return (
    <div className={`flex items-center justify-center gap-3 px-4 w-full ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="flex items-center gap-2 p-2 bg-black/5 dark:bg-white/5 rounded-[10px]">
        <SearchIcon className="fill-black dark:fill-white" />
        <div className="relative">
            <input
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                type="text"
                name="search"
                autoFocus={true}
                placeholder="Search..."
                className="pr-[20px] outline-none focus:outline-none"
            />
            {search && (
                <svg onClick={()=> setSearch("")} className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 fill-black dark:fill-white" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 16C6.90719 16 5.87712 15.7908 4.9098 15.3725C3.94771 14.9542 3.09804 14.3765 2.36078 13.6392C1.62353 12.902 1.04575 12.0523 0.627451 11.0902C0.20915 10.1229 0 9.09281 0 8C0 6.90719 0.20915 5.87974 0.627451 4.91765C1.04575 3.95033 1.62092 3.09804 2.35294 2.36078C3.0902 1.62353 3.93987 1.04575 4.90196 0.627451C5.86928 0.20915 6.89935 0 7.99216 0C9.08497 0 10.115 0.20915 11.0824 0.627451C12.0497 1.04575 12.902 1.62353 13.6392 2.36078C14.3765 3.09804 14.9542 3.95033 15.3725 4.91765C15.7908 5.87974 16 6.90719 16 8C16 9.09281 15.7908 10.1229 15.3725 11.0902C14.9542 12.0523 14.3765 12.902 13.6392 13.6392C12.902 14.3765 12.0497 14.9542 11.0824 15.3725C10.1203 15.7908 9.09281 16 8 16ZM5.36471 11.2941C5.55294 11.2941 5.71242 11.2314 5.84314 11.1059L8.00784 8.92549L10.1804 11.1059C10.3007 11.2314 10.4549 11.2941 10.6431 11.2941C10.8261 11.2941 10.9804 11.2314 11.1059 11.1059C11.2314 10.9752 11.2941 10.8209 11.2941 10.6431C11.2941 10.4497 11.2314 10.2954 11.1059 10.1804L8.92549 8.00784L11.1137 5.82745C11.2392 5.69673 11.302 5.54248 11.302 5.36471C11.302 5.18693 11.2392 5.03529 11.1137 4.9098C10.9882 4.78431 10.8366 4.72157 10.6588 4.72157C10.4863 4.72157 10.3373 4.78431 10.2118 4.9098L8.00784 7.09804L5.81961 4.91765C5.68889 4.79739 5.53725 4.73725 5.36471 4.73725C5.18693 4.73725 5.03529 4.8 4.9098 4.92549C4.78431 5.04575 4.72157 5.19739 4.72157 5.38039C4.72157 5.55294 4.78431 5.70458 4.9098 5.83529L7.0902 8.00784L4.9098 10.1882C4.78431 10.3137 4.72157 10.4654 4.72157 10.6431C4.72157 10.8209 4.78431 10.9752 4.9098 11.1059C5.03529 11.2314 5.18693 11.2941 5.36471 11.2941Z" />
                </svg>
            )}
        </div>
        <button className="ghost-button" onClick={() => {
            setShowSearch(false);
            setSearch('');
        }}>
          Cancel
        </button>
      </div>
    </div>
  );
}
