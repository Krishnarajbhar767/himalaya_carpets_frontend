import React from "react";
import { motion } from "motion/react";
import Heading from "./Heading";
import SubHeading from "./SubHeading";
import Video from "../../../../assets/carpet_video.mp4";
function HomeVideo() {
    return (
        <div className="boxedContainer w-full py-4  h-auto  overflow-x-hidden ">
            <div className="md:mb-14 mb-10 mt-4">
                <div>
                    <Heading text={"Timeless Designs, Unmatched Craft"} />
                </div>
                <div className="mt-2">
                    <SubHeading
                        text={"Explore Our Top Picks Woven to Perfection"}
                    />
                </div>
            </div>
            <div className=" ">
                <video
                    playsInline
                    loop
                    className="h-[50vh] sm:h-[80vh] object-cover w-full"
                    muted
                    controls
                    autoPlay
                    src={Video}
                ></video>
            </div>
        </div>
    );
}

export default HomeVideo;
