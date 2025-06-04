import Modal from './ui/Modal';
import CartIcon from '../assets/icons/cart.svg?react';
import { useState } from 'react';

export default function CartModal() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <>
            <button onClick={handleOpen} className="p-2 cursor-pointer">
                <CartIcon className="fill-black dark:fill-white" />
            </button>
            <Modal isOpen={isOpen} onClose={handleClose}>
            <div className="relative p-4 flex flex-col items-center justify-center h-full text-white rounded-t-lg">
                <button onClick={handleClose} className="absolute cursor-pointer top-4 right-4 text-gray-400 hover:text-gray-200 text-2xl">
                    <svg className='fill-black dark:fill-white' width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="28" height="28" rx="14" fill="white" fill-opacity="0.08"/>
                        <path opacity="0.2" d="M17.6416 9.15672C17.9736 8.82481 18.5109 8.82478 18.8428 9.15672C19.1747 9.48865 19.1747 10.026 18.8428 10.3579L15.2012 13.9995L18.8438 17.6421L18.9024 17.7065C19.1745 18.0404 19.1549 18.5321 18.8438 18.8432C18.5326 19.1544 18.04 19.1741 17.7061 18.9018L17.6426 18.8432L14 15.2007L10.3575 18.8432C10.0255 19.1751 9.48823 19.1751 9.15629 18.8432C8.82436 18.5113 8.82438 17.974 9.15629 17.6421L12.7989 13.9995L9.15727 10.3579C8.82532 10.0259 8.82532 9.48866 9.15727 9.15672C9.48922 8.82481 10.0265 8.82478 10.3584 9.15672L14 12.7983L17.6416 9.15672Z"/>
                    </svg>
                </button>

                <div className="flex flex-col items-center">
                    <h1 className="text-2xl text-black dark:text-white font-bold mb-2 pt-[85px]">Cart's cold</h1>
                    <p className="text-gray-400 text-[17px] pb-[77px]">No items yet</p>
                </div>

                <button onClick={handleClose} className="w-full cursor-pointer bg-black py-3 text-white dark:bg-white dark:text-black rounded-lg font-semibold text-lg hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors duration-200">
                    OK
                </button>
            </div>
        </Modal>
        </>
    );
}
