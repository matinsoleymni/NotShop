import { useState, useRef, useEffect } from 'react';

interface ShopCartProps {
    img: string;
    name: string;
    price: number;
    currency: string;
}

export default function ShopCart({ img, name, price, currency="NOT" }: ShopCartProps) {
    const [isPulledUp, setIsPulledUp] = useState(false);
    const [startY, setStartY] = useState<number | null>(null);
    const [pullDeltaY, setPullDeltaY] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const pullElementRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
        if (pullElementRef.current && e.target === pullElementRef.current) {
            setStartY('clientY' in e ? e.clientY : e.touches[0].clientY);
            setPullDeltaY(0); 
            e.preventDefault();
        }
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
        if (startY !== null) {
            const currentY = 'clientY' in e ? e.clientY : e.touches[0].clientY;
            const deltaY = currentY - startY;
            setPullDeltaY(deltaY);

            e.preventDefault();
        }
    };

    const handleMouseUp = (e: MouseEvent | TouchEvent) => {
        const dragThreshold = 10;
        if (pullDeltaY < -dragThreshold) {
            setIsPulledUp(true);
        } else {
            setIsPulledUp(false);
        }
        if (startY !== null) {
            setStartY(null);
            setPullDeltaY(0);
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            // Use non-passive event listeners to ensure preventDefault works
            container.addEventListener('mousedown', handleMouseDown as EventListener, { passive: false });
            container.addEventListener('touchstart', handleMouseDown as EventListener, { passive: false });
            window.addEventListener('mousemove', handleMouseMove as EventListener, { passive: false });
            window.addEventListener('touchmove', handleMouseMove as EventListener, { passive: false });
            window.addEventListener('mouseup', handleMouseUp as EventListener, { passive: false });
            window.addEventListener('touchend', handleMouseUp as EventListener, { passive: false });

            return () => {
                // Clean up event listeners on component unmount
                container.removeEventListener('mousedown', handleMouseDown as EventListener);
                container.removeEventListener('touchstart', handleMouseDown as EventListener);
                window.removeEventListener('mousemove', handleMouseMove as EventListener);
                window.removeEventListener('touchmove', handleMouseMove as EventListener);
                window.removeEventListener('mouseup', handleMouseUp as EventListener);
                window.removeEventListener('touchend', handleMouseUp as EventListener);
            };
        }
    }, [startY, pullDeltaY]);

    return (
        <div
            className="dark:text-white text-black"
            ref={containerRef}
            style={{ overscrollBehaviorY: 'contain' }}
        >
            <div className="relative">
                <div
                    className="w-5 bottom-2 -translate-x-1/2 left-1/2 bg-white rounded-full h-1 absolute"
                    ref={pullElementRef}
                    style={{
                        bottom: isPulledUp ? '97%' : '8px',
                        width: isPulledUp ? '60px' : '20px',
                        transition: startY !== null ? 'none' : 'bottom 0.3s ease-out, width 0.3s ease-out', // Disable transition during drag
                        transform: startY !== null && pullDeltaY < 0 ? `translateY(${pullDeltaY}px)` : 'translateY(0)', // Apply transform during drag only when pulling up
                    }}
                ></div>
                <img className="rounded-2xl aspect-square object-cover" src={img} alt={name} />
                {isPulledUp && (
                    <div className="absolute inset-0 grid grid-cols-2 gap-2 p-2">
                        <img src="https://not-contest-cdn.openbuilders.xyz/items/8.jpg" alt="Product 1" className="rounded-md aspect-square object-cover" />
                        <img src="https://not-contest-cdn.openbuilders.xyz/items/8.jpg" alt="Product 2" className="rounded-md aspect-square object-object-cover" />
                        <img src="https://not-contest-cdn.openbuilders.xyz/items/8.jpg" alt="Product 3" className="rounded-md aspect-square object-cover" />
                        <img src="https://not-contest-cdn.openbuilders.xyz/items/8.jpg" alt="Product 4" className="rounded-md aspect-square object-cover" />
                    </div>
                )}
            </div>
            <div className="px-2 pt-2">
                <h4>{name}</h4>
                <div className="flex gap-1">
                    <p className="caption text-black dark:text-white">{price}</p>
                    <p className="text-black/50 dark:text-white/50 caption">{currency.toUpperCase()}</p>
                </div>
            </div>
        </div>
    );
}
