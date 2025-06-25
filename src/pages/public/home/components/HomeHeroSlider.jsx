import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Animation variants for text (improved with better responsiveness)
const textVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for smoother animation
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        scale: 0.95,
        transition: { duration: 0.3, ease: "easeIn" },
    },
};

// Animation variants for the text container (stagger children)
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
};

// Improved image animation variants with loading states
const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: { duration: 0.4, ease: "easeIn" },
    },
};

// Fixed button variants to prevent juttering
const buttonVariants = {
    rest: { scale: 1, x: 0 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
};

// Background gradient for loading state
const backgroundGradients = [
    "bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800",
    "bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700",
    "bg-gradient-to-br from-orange-500 via-red-500 to-pink-600",
    "bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700",
    "bg-gradient-to-br from-amber-500 via-orange-500 to-red-500",
];

function HomeHeroSlider({ textPosition = false, sliderData = [] }) {
    const [activeSlide, setActiveSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState({});
    const [isAnimating, setIsAnimating] = useState(false);
    const sliderLength = sliderData.length - 1;

    // Prevent rapid slide changes
    const nextHandler = () => {
        if (isAnimating) return;
        setIsAnimating(true);

        if (activeSlide === sliderLength) {
            setActiveSlide(0);
        } else {
            setActiveSlide((prev) => prev + 1);
        }

        // Reset animation lock after animation completes
        setTimeout(() => setIsAnimating(false), 600);
    };

    const prevHandler = () => {
        if (isAnimating) return;
        setIsAnimating(true);

        if (activeSlide > 0) {
            setActiveSlide((prev) => prev - 1);
        } else {
            setActiveSlide(sliderLength);
        }

        // Reset animation lock after animation completes
        setTimeout(() => setIsAnimating(false), 600);
    };

    const goToSlide = (index) => {
        if (isAnimating || index === activeSlide) return;
        setIsAnimating(true);
        setActiveSlide(index);
        setTimeout(() => setIsAnimating(false), 600);
    };

    // Handle image load states
    const handleImageLoad = (index) => {
        setImageLoaded((prev) => ({ ...prev, [index]: true }));
    };

    const handleImageError = (index) => {
        setImageLoaded((prev) => ({ ...prev, [index]: false }));
    };

    // Preload images and set initial loaded state
    useEffect(() => {
        sliderData.forEach((slide, index) => {
            if (slide.image) {
                const img = new Image();
                img.onload = () => handleImageLoad(index);
                img.onerror = () => handleImageError(index);
                img.src = slide.image;
            }
        });
    }, [sliderData]);

    // Get current background gradient
    const currentGradient =
        backgroundGradients[activeSlide % backgroundGradients.length];

    return (
        <div
            className="relative overflow-hidden h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] xl:h-screen"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            role="region"
            aria-label="Hero slider"
        >
            {/* Background Image Container with Loading State */}
            <div className="absolute inset-0 w-full h-full">
                {/* Image with Animation */}
                <AnimatePresence mode="wait">
                    {sliderData[activeSlide] && (
                        <motion.div
                            key={`image-${activeSlide}`}
                            className="absolute inset-0 w-full h-full"
                            variants={imageVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <img
                                src={sliderData[activeSlide].image}
                                className="w-full h-full object-cover object-center"
                                alt={
                                    sliderData[activeSlide].heading ||
                                    `Slide ${activeSlide + 1}`
                                }
                                onLoad={() => handleImageLoad(activeSlide)}
                                onError={() => handleImageError(activeSlide)}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Gradient Background (only show when image is not loaded or failed) */}
                {(!imageLoaded[activeSlide] ||
                    imageLoaded[activeSlide] === false) && (
                    <div
                        className={`absolute inset-0 ${currentGradient} z-10`}
                    />
                )}

                {/* Overlay for better text readability - only when image is loaded */}
                {imageLoaded[activeSlide] && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 z-10" />
                )}
            </div>

            {/* Navigation Buttons - Positioned outside content area */}
            <div className="absolute inset-y-0 left-0 right-0 pointer-events-none z-30">
                {/* Left Button */}
                <motion.button
                    onClick={prevHandler}
                    disabled={isAnimating}
                    className="group absolute p-2 sm:p-3 md:p-4 border-2 border-white/80 rounded-full top-1/2 -translate-y-1/2 left-2 sm:left-3 md:left-4 lg:left-6 cursor-pointer pointer-events-auto backdrop-blur-md bg-black/20 hover:bg-black/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    variants={buttonVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    aria-label="Previous slide"
                >
                    <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white transition-transform duration-300 group-hover:-translate-x-0.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M5 12h14M5 12l4-4m-4 4 4 4"
                        />
                    </svg>
                </motion.button>

                {/* Right Button */}
                <motion.button
                    onClick={nextHandler}
                    disabled={isAnimating}
                    className="group absolute p-2 sm:p-3 md:p-4 border-2 border-white/80 rounded-full top-1/2 -translate-y-1/2 right-2 sm:right-3 md:right-4 lg:right-6 cursor-pointer pointer-events-auto backdrop-blur-md bg-black/20 hover:bg-black/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    variants={buttonVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    aria-label="Next slide"
                >
                    <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white transition-transform duration-300 group-hover:translate-x-0.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M19 12H5m14 0-4 4m4-4-4-4"
                        />
                    </svg>
                </motion.button>
            </div>

            {/* Content Container - Responsive with proper spacing from buttons */}
            <div className="absolute inset-0 flex items-center justify-center px-16 sm:px-20 md:px-24 lg:px-32 xl:px-40 py-8">
                <AnimatePresence mode="wait">
                    {sliderData[activeSlide] && (
                        <motion.div
                            key={`content-${activeSlide}`}
                            className={`w-full max-w-5xl mx-auto text-white z-10 ${
                                textPosition
                                    ? "text-center lg:text-right lg:ml-auto lg:mr-0"
                                    : "text-center lg:text-left lg:mr-auto lg:ml-0"
                            }`}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <motion.h1
                                variants={textVariants}
                                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight drop-shadow-lg"
                            >
                                {sliderData[activeSlide].heading}
                            </motion.h1>

                            <motion.p
                                variants={textVariants}
                                className={`text-sm  sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 md:mb-8 leading-relaxed text-white/95 drop-shadow-md ${
                                    textPosition
                                        ? "max-w-xl mx-auto lg:mx-0 lg:ml-auto "
                                        : "max-w-xl mx-auto lg:mx-0 lg:mr-auto "
                                }`}
                            >
                                {sliderData[activeSlide].paragraph}
                            </motion.p>

                            <motion.div
                                variants={textVariants}
                                className={`${
                                    textPosition
                                        ? "flex justify-center lg:justify-end "
                                        : "flex justify-center lg:justify-start"
                                }`}
                            >
                                <button className="inline-block px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-white text-gray-800 font-semibold text-sm sm:text-base md:text-lg border-2 border-transparent hover:bg-transparent hover:text-white hover:border-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg">
                                    Discover More
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Dot Indicators */}
            <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
                {sliderData.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        disabled={isAnimating}
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full border border-white/50 cursor-pointer transition-all duration-300 hover:scale-110 disabled:cursor-not-allowed ${
                            activeSlide === index
                                ? "bg-white scale-110"
                                : "bg-white/30 hover:bg-white/50"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Loading indicator for current slide */}
            {!imageLoaded[activeSlide] && (
                <div className="absolute inset-0 flex items-center justify-center z-30">
                    <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-white"></div>
                </div>
            )}
        </div>
    );
}

export default HomeHeroSlider;
