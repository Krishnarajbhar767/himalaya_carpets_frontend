import React from "react";
import { motion } from "motion/react";
import Heading from "./Heading";
import SubHeading from "./SubHeading";
import Banner1 from "../../../../assets/images/Home/Home3Grid/HC_1080x1350_1.jpg";
import Banner2 from "../../../../assets/images/Home/Home3Grid/HC_1080x1350_2.jpg";
import Banner3 from "../../../../assets/images/Home/Home3Grid/HC_1080x1350_3.jpg";
function Home3Grid() {
    const data = [
        { image: Banner1, link: "#", title: "Hand knotted" },
        { image: Banner2, link: "#", title: "Hand woven rugs " },
        { image: Banner3, link: "#", title: "Hand tufted rugs" },
        { image: Banner1, link: "#", title: " Handloom rugs " },
        { image: Banner2, link: "#", title: "Flatweaves " },
        { image: Banner3, link: "#", title: "Dhurries " },
    ];

    //     • Hand knotted - 3/20 quality to 10/50 quality
    // • Hand woven rugs
    // • Hand tufted rugs
    // • Handloom rugs
    // •
    // •
    // •

    return (
        <div className="boxedContainer w-full py-4  h-auto  overflow-x-hidden  ">
            <div className="md:mb-14 mb-10 mt-4">
                <div>
                    <Heading text={"Discover Signature Styles"} />
                </div>
                <div className="mt-2">
                    <SubHeading
                        text={
                            "Handpicked Carpets That Define Elegance, Comfort, and Craftsmanship"
                        }
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((item, index) => (
                    <div className="relative">
                        <motion.img
                            whileTap={{ scale: 0.8 }}
                            key={index}
                            src={item.image}
                            alt="Sarees"
                            className="w-full h-[400px] sm:h-[500px] object-cover object-top md:object-center  hover:scale-[101%] transition-all ease-linear duration-200 shadow-sm  border border-gray-200 "
                        />
                        <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-8">
                            <p class="text-white text-2xl font-medium">
                                {item.title}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home3Grid;
