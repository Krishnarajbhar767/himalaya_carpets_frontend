// ScrollToTop.js
import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    // useLayoutEffect is often preferred here to ensure the scroll happens
    // before the browser paints the new route, preventing a flash of the old scroll position.
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]); // This effect runs whenever the 'pathname' (route) changes

    return null; // This component doesn't render anything visually
};

export default ScrollToTop;
