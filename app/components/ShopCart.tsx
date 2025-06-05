import { useState, useRef, type TouchEvent } from "react";
import { NavLink } from "react-router";

interface ShopCartProps {
    id: number;
    images: string[];
    name: string;
    price: number;
    currency: string;
    isInCart: boolean;
}

export default function ShopCart({
    id,
    images,
    name,
    price,
    isInCart = false,
    currency = "NOT",
}: ShopCartProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(id - 1);
    const [startX, setStartX] = useState<number | null>(null);
    const [deltaX, setDeltaX] = useState(0);
    const imageContainerRef = useRef<HTMLDivElement>(null);

    const handleTouchStart = (e: TouchEvent) => {
        setStartX(e.touches[0].clientX);
        setDeltaX(0);
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (startX === null) return;
        const currentX = e.touches[0].clientX;
        setDeltaX(currentX - startX);
    };

    const handleTouchEnd = () => {
        const swipeThreshold = 50;
        if (deltaX > swipeThreshold) {
            // Swipe right
            setCurrentImageIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : images.length - 1
            );
        } else if (deltaX < -swipeThreshold) {
            // Swipe left
            setCurrentImageIndex((prevIndex) =>
                prevIndex < images.length - 1 ? prevIndex + 1 : 0
            );
        }
        setStartX(null);
        setDeltaX(0);
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setStartX(e.clientX);
        setDeltaX(0);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (startX === null) return;
        const currentX = e.clientX;
        setDeltaX(currentX - startX);
    };

    const handleMouseUp = () => {
        const swipeThreshold = 20;
        if (deltaX > swipeThreshold) {
            // Swipe right
            setCurrentImageIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : images.length - 1
            );
        } else if (deltaX < -swipeThreshold) {
            // Swipe left
            setCurrentImageIndex((prevIndex) =>
                prevIndex < images.length - 1 ? prevIndex + 1 : 0
            );
        }
        setStartX(null);
        setDeltaX(0);
    };

    return (
        <NavLink to={`/product/${id}`}>
            <div className="dark:text-white text-black">
                <div
                    className="relative"
                    ref={imageContainerRef}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                >
                    <img
                        draggable={false}
                        className="rounded-2xl aspect-square object-cover"
                        src={images[currentImageIndex]}
                        alt={name}
                    />
                    <div className="absolute top-2 right-2 dark:invert-100 rounded-full">
                        {isInCart && <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="22" height="22" rx="11" fill="black"/>
                                <path d="M9.56641 16.0371C9.25391 16.0371 8.98828 15.9023 8.76953 15.6328L5.73438 11.8945C5.64844 11.793 5.58594 11.6934 5.54688 11.5957C5.51172 11.498 5.49414 11.3965 5.49414 11.291C5.49414 11.0566 5.57227 10.8633 5.72852 10.7109C5.88477 10.5586 6.08203 10.4824 6.32031 10.4824C6.58984 10.4824 6.81641 10.5977 7 10.8281L9.54297 14.0508L14.5059 6.1875C14.6074 6.03125 14.7129 5.92188 14.8223 5.85938C14.9316 5.79297 15.0684 5.75977 15.2324 5.75977C15.4707 5.75977 15.666 5.83398 15.8184 5.98242C15.9707 6.13086 16.0469 6.32031 16.0469 6.55078C16.0469 6.64453 16.0312 6.73828 16 6.83203C15.9688 6.92578 15.9199 7.02344 15.8535 7.125L10.3691 15.6094C10.1816 15.8945 9.91406 16.0371 9.56641 16.0371Z" fill="white"/>
                            </svg>
                        }
                    </div>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center">
                        {images.map((_, index) => (
                            <div
                                key={index}
                                className={`
                                ${index === currentImageIndex
                                        ? "bg-white mx-1 rounded-full !w-5 !h-1 transition-all"
                                        : "transition-all bg-white/5 rounded-full"
                                    }
                                mx-0.5
                            `}
                                style={{
                                    width:
                                        index === currentImageIndex
                                            ? "4px"
                                            : `${Math.max(
                                                2,
                                                5 -
                                                Math.abs(
                                                    index -
                                                    currentImageIndex
                                                )
                                            )}px`,
                                    height:
                                        index === currentImageIndex
                                            ? "1px"
                                            : `${Math.max(
                                                2,
                                                5 -
                                                Math.abs(
                                                    index -
                                                    currentImageIndex
                                                )
                                            )}px`,
                                }}
                            ></div>
                        ))}
                    </div>
                </div>
                <div className="px-2 pt-2">
                    <h4 className="flex items-center">{name}</h4>
                    <div className="flex gap-1">
                        <p className="caption text-black dark:text-white">
                            {price}
                        </p>
                        <p className="text-black/50 dark:text-white/50 caption">
                            {currency.toUpperCase()}
                        </p>
                    </div>
                </div>
            </div>
        </NavLink>
    );
}
