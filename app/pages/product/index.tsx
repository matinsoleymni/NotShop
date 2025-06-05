import GeneralHeader from "~/components/GeneralHeader";
import Shear from "../../assets/icons/share.svg?react";
import type { Route } from "./+types";
import { useProductStore, type Product } from "~/stores/products";
import { useEffect, useState } from "react";
import BottomNavigation from "~/components/BottomNavigation";
import { useTonConnectUI } from "@tonconnect/ui-react";
import Button from "~/components/ui/Button";
import { useCart, type Product as CartProduct } from "~/contexts/CartContext";

export default function Product({ params }: Route.LoaderArgs) {
    const id = params.product;
    const { getProductById, products } = useProductStore();
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [tonConnectUI] = useTonConnectUI();
    const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();

    const cartItem = cartItems.find(item => item.id === Number(id));
    const isInCart = !!cartItem;
    const quantity = cartItem ? cartItem.quantity : 0;

    useEffect(()=> {
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
            const productToAdd: CartProduct = { ...product, quantity: 1 };
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
        return <div>Loading...</div>;
    }

    return (
        <>
            <GeneralHeader title={product.name} icons={[Shear]} />
            <div className="flex flex-col px-4 pb-24">
                <p className="text-[17px]">
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
                <div>
                    <img
                        className="rounded-[20px] w-full h-92 object-cover object-center"
                        src={product.images[selectedImageIndex]}
                        alt={product.name}
                    />
                </div>
                <div className="flex w-full gap-2 pt-4 overflow-x-auto">
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
                {isInCart ? (
                    <div className="flex items-center justify-center gap-2">
                        <Button className="h4" onClick={handleDecrementQuantity} size="big" variant="ghost">-</Button>
                        <p className="h3">{quantity}</p>
                        <Button className="h4" onClick={handleIncrementQuantity} size="big" variant="ghost">+</Button>
                    </div>
                ) : (
                    <Button onClick={handleAddToCart} size="big" variant="ghost">Add to Cart</Button>
                )}
                <Button onClick={() => tonConnectUI.openModal()} size="big" variant="primary">Buy Now</Button>
            </BottomNavigation>
        </>
    );
}
