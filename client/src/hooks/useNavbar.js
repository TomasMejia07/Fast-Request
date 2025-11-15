import React, { useRef, useEffect, useState } from 'react'

export const useNavbar = () => {

    const [scrollActive, setScrollActive] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 50) { 
                setScrollActive(true);
            } else {
                setScrollActive(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return {
        scrollActive
    }
}


