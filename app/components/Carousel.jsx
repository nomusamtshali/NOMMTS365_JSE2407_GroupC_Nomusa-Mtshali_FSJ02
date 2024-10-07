import { useState} from "react";
import Image from "next/image";

/**
 * Carousel Component that takes a list of images and allows switching between them.
 * Uses Next.js Image for image optimization.
 */
const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative">
      <Image
        src={images[currentIndex]} // Optimized image source
        alt={`Image ${currentIndex + 1}`}
        width={400}
        height={400}
        className="rounded-lg object-contain h-48 w-full"
      />
      {/* Previous and Next buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded"
          >
            ‹
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}

export default Carousel