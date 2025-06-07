import Modal from "./ui/Modal";
import { useState, type PropsWithChildren } from "react";
import Button from "./ui/Button";
import { formatPrice } from "~/utils/formatPrice";
import { useCart } from "~/contexts/CartContext";
import { useTonConnectUI } from "@tonconnect/ui-react";
import type { CartModalProps } from "../types/CartModalProps";
import type { Product } from "../types/Product";

export default function CartModal({ children, className }: CartModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { cartItems, cartItemCount, removeFromCart, updateQuantity } = useCart();
    const [tonConnectUI] = useTonConnectUI();

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    const handelPayment = ()=> {
        tonConnectUI.openModal();
    }

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <>
            <button onClick={handleOpen} className={`cursor-pointer ${className}`}>
                {children}
            </button>
            <Modal isOpen={isOpen} onClose={handleClose}>
                <div className="relative p-4 flex flex-col h-full text-white rounded-t-lg">
                    <button
                        onClick={handleClose}
                        className="absolute cursor-pointer top-4 right-4 text-gray-400 hover:text-gray-200 text-2xl"
                    >
                        <svg
                            className="fill-black dark:fill-white"
                            width="28"
                            height="28"
                            viewBox="0 0 28 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                width="28"
                                height="28"
                                rx="14"
                                fill="white"
                                fill-opacity="0.08"
                            />
                            <path
                                opacity="0.2"
                                d="M17.6416 9.15672C17.9736 8.82481 18.5109 8.82478 18.8428 9.15672C19.1747 9.48865 19.1747 10.026 18.8428 10.3579L15.2012 13.9995L18.8438 17.6421L18.9024 17.7065C19.1745 18.0404 19.1549 18.5321 18.8438 18.8432C18.5326 19.1544 18.04 19.1741 17.7061 18.9018L17.6426 18.8432L14 15.2007L10.3575 18.8432C10.0255 19.1751 9.48823 19.1751 9.15629 18.8432C8.82436 18.5113 8.82438 17.974 9.15629 17.6421L12.7989 13.9995L9.15727 10.3579C8.82532 10.0259 8.82532 9.48866 9.15727 9.15672C9.48922 8.82481 10.0265 8.82478 10.3584 9.15672L14 12.7983L17.6416 9.15672Z"
                            />
                        </svg>
                    </button>

                    {cartItemCount === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full">
                            <h1 className="text-2xl text-black dark:text-white font-bold mb-2 pt-[85px]">
                                Cart's cold
                            </h1>
                            <p className="text-gray-400 text-[17px] pb-[77px]">
                                No items yet
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-start w-full">
                            <h1 className="text-2xl w-full text-center text-black dark:text-white font-bold mb-4">
                                Cart
                            </h1>
                            <ul className="w-full pb-4">
                                {cartItems.map((item) => (
                                    <li
                                        key={item.id}
                                        className="flex justify-between items-center py-2"
                                    >
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={item.images[item.id-1]}
                                                alt={item.name}
                                                className="w-[60px] h-[60px] object-cover rounded-lg"
                                            />
                                            <div className="flex flex-col text-black dark:text-white">
                                                <span className="text-black/50 text-[12px] dark:text-white/50">
                                                    {item.category}
                                                </span>
                                                <h4>{item.name}</h4>
                                                <span>x {item.quantity}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-black dark:text-white text-[17px]">
                                                {item.price} {item.currency}
                                            </span>
                                            <button className="cursor-pointer" onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeFromCart(item.id)}>
                                                <svg className="fill-black dark:fill-white" width="28" height="29" viewBox="0 0 28 29" xmlns="http://www.w3.org/2000/svg">
                                                    <rect y="0.894531" width="28" height="28" rx="8" fill-opacity="0.08"/>
                                                    <path className="fill-black dark:fill-white" opacity="0.2" d="M20 14.1445C20.4142 14.1445 20.75 14.4803 20.75 14.8945C20.75 15.3087 20.4142 15.6445 20 15.6445H8C7.58579 15.6445 7.25 15.3087 7.25 14.8945C7.25 14.4803 7.58579 14.1445 8 14.1445H20Z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {cartItemCount === 0 ? (
                        <Button
                            variant="primary"
                            size="big"
                            onClick={handleClose}
                        >
                            OK
                        </Button>
                    ) : (
                        <Button
                            variant="primary"
                            size="big"
                            onClick={handelPayment}
                        >
                            Buy for {formatPrice(totalPrice, cartItems.length > 0 ? cartItems[0].currency : 'USD')}
                        </Button>
                    )}
                </div>
            </Modal>
        </>
    );
}
