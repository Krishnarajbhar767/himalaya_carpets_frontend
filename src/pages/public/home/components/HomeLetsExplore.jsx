import React from "react";
import Heading from "./Heading";
import SubHeading from "./SubHeading";

function HomeLetsExplore() {
    return (
        <div className="boxedContainer py-4 ">
            <div className="md:mb-14 mb-10 mt-4">
                <div>
                    <Heading text={"Elevate Every Step"} />
                </div>
                <div className="mt-2">
                    <SubHeading
                        text={
                            "Discover handcrafted carpets that blend comfort, culture, and contemporary style — made to transform your space."
                        }
                    />
                </div>
            </div>
            <div className="h-[400px] md:h-[600px] py-4 bg-[url('./assets/images/Home/HomeLetsExplore/HC_1920x1080.jpg')] bg-center bg-cover bg-no-repeat text-white relative">
                <div className="flex items-center justify-center flex-col h-full text-center ">
                    <div className="max-w-[90%] sm:max-w-1/2 space-y-4">
                        <h1 className="text-center font-medium text-2xl leading-none md:text-3xl capitalize">
                            Explore Our Premium Carpet Collection
                        </h1>
                        <h2 className="text-center tracking-tight text-sm font-medium md:text-lg capitalize leading-snug">
                            Timeless weaves, luxurious textures, and artistry
                            underfoot — made for every home.
                        </h2>
                        <button className="mx-auto text-xl bg-white text-gray-800 inline-block w-52 px-4 py-2 border border-transparent hover:border hover:border-white hover:bg-transparent hover:text-white transition-all duration-200">
                            Explore
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeLetsExplore;
