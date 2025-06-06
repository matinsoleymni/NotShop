import { useState, useRef, useEffect } from 'react';

interface ZoomableImageModalContentProps {
  imageUrl: string;
  onClose: () => void;
}

const ZoomableImageModalContent: React.FC<ZoomableImageModalContentProps> = ({ imageUrl, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPanPosition, setStartPanPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset zoom and position when image changes
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  }, [imageUrl]);


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

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (zoomLevel > 1 && event.touches.length === 1) {
      setIsPanning(true);
      setStartPanPosition({ x: event.touches[0].clientX, y: event.touches[0].clientY });
    }
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (isPanning && event.touches.length === 1) {
      const deltaX = event.touches[0].clientX - startPanPosition.x;
      const deltaY = event.touches[0].clientY - startPanPosition.y;

      setPosition(prevPosition => ({
        x: prevPosition.x + deltaX,
        y: prevPosition.y + deltaY,
      }));

      setStartPanPosition({ x: event.touches[0].clientX, y: event.touches[0].clientY });
    }
  };

  const handleTouchEnd = () => {
    setIsPanning(false);
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
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
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
