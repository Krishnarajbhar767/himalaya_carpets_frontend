import React from "react";
import Image from "../../../../assets/images/Home/HomeOneImageOnly/HC_1920x800.jpg";
function HomeOneImageOnly() {
    return (
        <div className="h-[50vh] sm:h-[550px] w-full boxedContainer py-4 sm:px-8 overflow-hidden">
            <img
                src={Image}
                className="object-cover h-full w-full cursor-pointer sm:px-8"
                alt="background"
            />
        </div>
    );
}

export default HomeOneImageOnly;
