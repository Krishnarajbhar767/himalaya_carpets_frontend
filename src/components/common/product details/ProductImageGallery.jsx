import { useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

/**
 * ProductImageGallery Component
 * Displays product images with thumbnails on the left side and main image on the right
 * Features: thumbnail navigation, zoom functionality, arrow navigation
 */
function ProductImageGallery({ images = [], productName = "", onZoom }) {
    const [selectedImage, setSelectedImage] = useState(
        images[0] || "/placeholder.svg"
    );

    // Navigate to next image
    const nextImage = () => {
        if (images.length > 1) {
            const currentIndex = images.indexOf(selectedImage);
            const nextIndex = (currentIndex + 1) % images.length;
            setSelectedImage(images[nextIndex]);
        }
    };

    // Navigate to previous image
    const prevImage = () => {
        if (images.length > 1) {
            const currentIndex = images.indexOf(selectedImage);
            const prevIndex =
                (currentIndex - 1 + images.length) % images.length;
            setSelectedImage(images[prevIndex]);
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-4">
            {/* Thumbnails - Vertical scrolling on left */}
            {images.length > 1 && (
                <div className="order-2 md:order-1 flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:overflow-x-hidden   md:h-[500px] md:w-30 md:flex-shrink-0 pb-2 md:pb-0 md:pr-2">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(image)}
                            className={`flex-shrink-0 w-26 md:w-full  h-26 md:h-46   overflow-hidden border-2 transition-all duration-200 ${
                                selectedImage === image
                                    ? "border-foreground shadow-md"
                                    : "border-gray-200 hover:border-foreground/50"
                            }`}
                        >
                            <img
                                src={image || "/product_placeholder.webp"}
                                alt={`${productName} thumbnail ${index + 1}`}
                                className="w-full h-full object-cover object-top"
                                // onError={(e) =>
                                //     (e.target.src =
                                //         "/placeholder.svg?height=80&width=80")
                                // }
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Main Image - Right of thumbnails */}
            <div className="order-1 md:order-2 flex-1 relative group">
                <div className="h-[700px] overflow-hidden  bg-gray-50 ">
                    <img
                        src={selectedImage || "/product_placeholder.webp"}
                        alt={productName}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 object-top"
                        // onError={(e) =>
                        //     (e.target.src =
                        //         "/placeholder.svg?height=600&width=600")
                        // }
                    />

                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </>
                    )}

                    {/* Zoom Button */}
                    <button
                        onClick={() => onZoom(selectedImage)}
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <ZoomIn className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductImageGallery;
