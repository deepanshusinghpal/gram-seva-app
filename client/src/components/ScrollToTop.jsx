// client/src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    // Get the current page's pathname
    const { pathname } = useLocation();

    // Run this effect whenever the pathname changes
    useEffect(() => {
        // Scroll the window to the top left corner
        window.scrollTo(0, 0);
    }, [pathname]); // The effect depends on the pathname

    // This component renders nothing, it just handles a side effect
    return null;
};

export default ScrollToTop;