import React, { useState } from "react";
import Heading from "./Heading";
import SubHeading from "./SubHeading";
import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion for animations
import Banner1 from "../../../../assets/images/Home/HomeOnlyTwoSlideGrid/HC_640x640_1.jpg";
import Banner2 from "../../../../assets/images/Home/HomeOnlyTwoSlideGrid/HC_640x640_2.jpg";

function HomeOnlyTwoSlideGrid() {
    const [slideIndex, setSlideIndex] = useState(0);

    const slideData = [
        {
            heading: "Heritage Weaves",
            subHeading:
                "Step into a world of tradition with our handcrafted carpets. Woven by skilled artisans, each design reflects timeless patterns, rich textures, and the soul of heritage craftsmanship — perfect for classic, warm interiors.",
            discoverLink: "href",
            image: Banner1,
        },
        {
            heading: "Modern Elegance",
            subHeading:
                "Discover sleek, contemporary carpet styles crafted for the modern home. Clean lines, minimalist tones, and refined details — where comfort meets cutting-edge design.",
            discoverLink: "href2",
            image: Banner2,
        },
    ];

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
    };

    return (
        <div className="grid md:grid-cols-2 gap-4 boxedContainer py-4">
            {/* Image First on Mobile */}
            <AnimatePresence mode="wait">
                <motion.img
                    key={slideData[slideIndex].image}
                    src={slideData[slideIndex].image}
                    className="h-[300px] lg:h-[600px] w-full object-cover object-top order-1 md:order-2"
                    alt="hero section banarasi saree"
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                />
            </AnimatePresence>

            {/* Text Content Below Image on Mobile */}
            <div className="w-full text-center my-auto order-2 md:order-1">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={slideIndex}
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div>
                            <Heading text={slideData[slideIndex].heading} />
                        </div>
                        <div className="mt-2">
                            <SubHeading
                                text={slideData[slideIndex].subHeading}
                            />
                        </div>
                        <h3 className="text-2xl font-normal mt-6 underline">
                            <a href={slideData[slideIndex].discoverLink}>
                                Discover
                            </a>
                        </h3>
                    </motion.div>
                </AnimatePresence>

                <div className="flex gap-2 w-full items-center justify-center py-4">
                    {[0, 1].map((i) => (
                        <div
                            key={i}
                            onClick={() => setSlideIndex(i)}
                            className={`h-4 w-4 rounded-full border border-white cursor-pointer transition-all duration-300 hover:bg-gray-600 ${
                                slideIndex === i ? "bg-gray-800" : "bg-gray-400"
                            }`}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomeOnlyTwoSlideGrid;
