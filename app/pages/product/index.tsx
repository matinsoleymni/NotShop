import GeneralHeader from "~/components/GeneralHeader";
import { useProductStore } from "~/stores/products";
import type { Product } from "~/types/Product";
import { useEffect, useState } from "react";
import BottomNavigation from "~/components/BottomNavigation";
import { useTonConnectUI } from "@tonconnect/ui-react";
import Button from "~/components/ui/Button";
import Modal from "~/components/ui/Modal";
import ZoomableImageModalContent from "~/components/ZoomableImageModalContent";
import { useCart } from "~/contexts/CartContext";
import Share from "~/components/Share";
import PaymentSuccess from "~/components/PaymentSuccess";
import type { Route } from "../../+types/root";
import { useNavigate } from "react-router";
import { ProductPlaceholder } from "./placeholders";


export default function ProductPage({ params }: Route.LoaderArgs) {
    const id = params.product;
    const { getProductById, products, setSearchTerm } = useProductStore();
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [tonConnectUI] = useTonConnectUI();
    const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();
    const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImageUrl, setModalImageUrl] = useState('');

    const cartItem = cartItems.find(item => item.id === Number(id));
    const isInCart = !!cartItem;
    const quantity = cartItem ? cartItem.quantity : 0;
    const navigate = useNavigate();

    useEffect(()=> {
        setSearchTerm("");
        const fetchedProduct = getProductById(Number(id));
        setProduct(fetchedProduct);
    }, [id, getProductById, products]);

    useEffect(() => {
        if (product && product.images.length > 0) {
            setSelectedImageIndex(0);
        }
    }, [product]);

    const handleAddToCart = () => {
        if (product) {
            const productToAdd: Product = { ...product, quantity: 1 };
            addToCart(productToAdd);
        }
    };

    const handleIncrementQuantity = () => {
        if (product && quantity < product.left) {
            updateQuantity(product.id, quantity + 1);
        }
    };

    const handleDecrementQuantity = () => {
        if (product) {
            if (quantity > 1) {
                updateQuantity(product.id, quantity - 1);
            } else {
                removeFromCart(product.id);
            }
        }
    };

    if (!product) {
        return <ProductPlaceholder />;
    }

    return (
        <div className="flex flex-col h-screen">

            {showPaymentSuccess && <PaymentSuccess onClose={()=> {setShowPaymentSuccess(false)}} />}
            <GeneralHeader title={product.name} icons={[<Share id={id as string} title={product.name} />]} />
            <div className="flex pb-24 flex-col px-4 min-h-0 flex-grow">
                <p className="text-[17px] flex-shrink-0">
                    {product.description}
                </p>
                <div className="flex flex-wrap pt-4 pb-5 gap-2">
                    <div className="flex text-[12px] bg-black/8 dark:bg-white/8 rounded-full px-2 py-[2px] gap-[2px]">
                        <p className="text-black dark:text-white">{product.price}</p>
                        <p className="text-black/50 dark:text-white/50">${product.currency}</p>
                    </div>
                     <div className="flex text-[12px] bg-black/8 dark:bg-white/8 rounded-full px-2 py-[2px] gap-[2px]">
                        <p className="text-black dark:text-white">{product.left}</p>
                        <p className="text-black/50 dark:text-white/50">Left</p>
                    </div>
                    { product.tags && Object.entries(product.tags).map(([key, value]) => (
                        <div key={key} className="flex text-[12px] bg-black/8 dark:bg-white/8 rounded-full px-2 py-[2px] gap-[2px]">
                            <p className="text-black dark:text-white">{key}:</p>
                            <p className="text-black/50 dark:text-white/50">{value}</p>
                        </div>
                    ))}

                </div>
                <div className="flex-grow overflow-hidden cursor-pointer" onClick={() => {
                    setModalImageUrl(product.images[selectedImageIndex]);
                    setIsModalOpen(true);
                }}>
                    <img
                        className="rounded-[20px] w-full h-full object-cover object-center"
                        src={product.images[selectedImageIndex]}
                        alt={product.name}
                    />
                </div>
                <div className="flex w-full gap-2 pt-4 overflow-x-auto flex-shrink-0">
                    {product.images.map((image: string, index: number) => (
                        <div
                            key={index}
                            className={`rounded-xl border cursor-pointer ${index === selectedImageIndex ? 'border-white' : 'border-transparent'}`}
                            onClick={() => setSelectedImageIndex(index)}
                        >
                            <img
                                className="min-w-[100px] min-h-[100px] aspect-square object-cover rounded-xl"
                                src={image}
                                alt={`${product.name} image ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <BottomNavigation className="gap-3">
                {product.left === 0 ? (
                    <Button className="col-span-2" size="big" variant="primary" disabled onClick={() => navigate('/')}>
                        Out of Stock
                    </Button>
                ) : (
                    <>
                        {isInCart ? (
                            <div className="flex items-center justify-center gap-2">
                                <Button className="h4 cursor-pointer" onClick={handleDecrementQuantity} size="big" variant="ghost">-</Button>
                                <p className="h3">{quantity}</p>
                                <Button className="h4 cursor-pointer" onClick={handleIncrementQuantity} size="big" variant="ghost" disabled={quantity >= product.left}>+</Button>
                            </div>
                        ) : (
                            <Button onClick={handleAddToCart} size="big" variant="ghost">Add to Cart</Button>
                        )}
                        <Button onClick={() => {
                            tonConnectUI.openModal();
                            setTimeout(()=> {
                                tonConnectUI.closeModal();
                                setShowPaymentSuccess(true);
                            }, 2000)
                        }} size="big" variant="primary">Buy Now</Button>
                    </>
                )}
            </BottomNavigation>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="!rounded-t-none !p-0 !bg-transparent !shadow-none !w-screen !h-screen !items-center !justify-center">
                <ZoomableImageModalContent imageUrl={modalImageUrl} onClose={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
}
