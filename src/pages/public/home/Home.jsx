import React, { useMemo } from "react";
import HomeHeroSlider from "./components/HomeHeroSlider";

import HomeSection4 from "./components/HomeOnlyTwoSlideGrid";

import WhyChooseUs from "./components/WhyChooseUs";
import Home3Grid from "./components/Home3Grid";
import HomeVideo from "./components/HomeVideo";
import Home2BigGrid from "./components/Home2BigGrid";
import HomeOnlyTwoSlideGrid from "./components/HomeOnlyTwoSlideGrid";
import HomeOneImageOnly from "./components/HomeOneImageOnly";
import HomeLetsExplore from "./components/HomeLetsExplore";
import Banner1 from "../../../assets/images/slider/HC_1920X1080.jpg_1.jpg";
import Banner2 from "../../../assets/images/slider/HC_1920X1080.jpg_2.jpg";
import Banner3 from "../../../assets/images/slider/HC_1920X1080.jpg_3.jpg";

import Slide2Banner1 from "../../../assets/images/slider2/HC_1920X1080_2_a.jpg";
import Slide2Banner2 from "../../../assets/images/slider2/HC_1920X1080_2_b.jpg";
function Home() {
    const sliderData1 = useMemo(
        () => [
            {
                image: Banner1,
                heading: "Elegance Beneath Your Feet",
                subheading: "Handwoven Luxury Carpets",
                paragraph:
                    "Transform your home with artisanal carpets that blend tradition with timeless design. Every weave tells a story of heritage.",
            },
            {
                image: Banner2,
                heading: "Crafted for Comfort",
                subheading: "Designs that Define Spaces",
                paragraph:
                    "From minimalist to majestic, our carpets are made to elevate your interiors — comfort and style woven together.",
            },
            {
                image: Banner3,
                heading: "Art You Can Walk On",
                subheading: "Where Tradition Meets Innovation",
                paragraph:
                    "Our carpets are more than décor, they’re masterpieces made by skilled hands, tailored to the modern lifestyle.",
            },
        ],
        []
    );

    const sliderData2 = useMemo(
        () => [
            {
                image: Slide2Banner1,
                heading: "Elegance Beneath Your Feet",
                subheading: "Handwoven Luxury Carpets",
                paragraph:
                    "Transform your home with artisanal carpets that blend tradition with timeless design. Every weave tells a story of heritage.",
            },
            {
                image: Slide2Banner2,
                heading: "Crafted for Comfort",
                subheading: "Designs that Define Spaces",
                paragraph:
                    "From minimalist to majestic, our carpets are made to elevate your interiors — comfort and style woven together.",
            },
        ],
        []
    );

    return (
        <div className="w-full h-full">
            <div>
                <HomeHeroSlider sliderData={sliderData1} />
            </div>

            {/* Section Starts */}
            {/* Section1 */}
            <div>
                <Home3Grid />
            </div>
            {/* Section 2 */}
            <div>
                <HomeVideo />
            </div>
            {/* Section 3 */}
            <div>
                <Home2BigGrid />
            </div>
            <div className="boxedContainer py-4">
                <HomeHeroSlider textPosition={true} sliderData={sliderData2} />
            </div>

            <div>
                <HomeOneImageOnly />
            </div>
            <div>
                <HomeOnlyTwoSlideGrid />
            </div>
            <div>
                <HomeLetsExplore />
            </div>
            <div>
                <WhyChooseUs />
            </div>
        </div>
        // Moving Text
    );
}

export default Home;
