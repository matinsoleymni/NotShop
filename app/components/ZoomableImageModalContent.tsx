import { useState, useRef } from 'react';

interface ZoomableImageModalContentProps {
  imageUrl: string;
  onClose: () => void;
}

const ZoomableImageModalContent: React.FC<ZoomableImageModalContentProps> = ({ imageUrl, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (zoomLevel > 1 && imageRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const imageRect = imageRef.current.getBoundingClientRect();

      const mouseX = event.clientX - containerRect.left;
      const mouseY = event.clientY - containerRect.top;

      const imgX = (mouseX / containerRect.width) * imageRect.width;
      const imgY = (mouseY / containerRect.height) * imageRect.height;

      const newX = (imgX - mouseX) * (zoomLevel - 1);
      const newY = (imgY - mouseY) * (zoomLevel - 1);

      setPosition({ x: -newX, y: -newY });
    }
  };

  const handleClick = () => {
    setZoomLevel(prevZoom => (prevZoom === 1 ? 2 : 1));
    setPosition({ x: 0, y: 0 }); // Reset position on zoom change
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onClick={(event) => {
        if (imageRef.current && !imageRef.current.contains(event.target as Node)) {
          onClose();
        }
      }}
    >
      <img
        ref={imageRef}
        onClick={handleClick}
        src={imageUrl}
        alt="Zoomable Product"
        className="max-w-full max-h-full object-contain"
        style={{
          transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
          transformOrigin: '0 0',
          cursor: zoomLevel > 1 ? 'grab' : 'zoom-in',
        }}
      />
    </div>
  );
};

export default ZoomableImageModalContent;
