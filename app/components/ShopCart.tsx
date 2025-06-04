import { useState, useRef, type TouchEvent } from "react";
import { NavLink } from "react-router";

interface ShopCartProps {
    id: number;
    images: string[];
    name: string;
    price: number;
    currency: string;
}

export default function ShopCart({
    id,
    images,
    name,
    price,
    currency = "NOT",
}: ShopCartProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(id-1);
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
                    {/* <div
                    className="w-5 bottom-2 -translate-x-1/2 left-1/2 bg-white rounded-full h-1 absolute"
                ></div> */}
                    <img
                        draggable={false}
                        className="rounded-2xl aspect-square object-cover"
                        src={images[currentImageIndex]}
                        alt={name}
                    />
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center">
                        {images.map((_, index) => (
                            <div
                                key={index}
                                className={`
                                ${
                                    index === currentImageIndex
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
                    <h4>{name}</h4>
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
