// client/src/components/ScrollToAnchor.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToAnchor = () => {
    // Get the current location object, which includes the hash (#)
    const location = useLocation();

    // Run this effect whenever the location changes
    useEffect(() => {
        // Check if there is a hash in the URL
        if (location.hash) {
            // Find the element on the page that matches the hash
            // We remove the '#' from the start of the hash string
            const element = document.getElementById(location.hash.substring(1));

            // If the element is found, scroll to it smoothly
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]); // The effect depends on the location object

    // This component doesn't render anything, it just handles logic
    return null;
};

export default ScrollToAnchor;
