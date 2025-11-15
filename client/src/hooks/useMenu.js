import React, { useState, useEffect } from 'react'


export const useMenu = (minWidth) => {

    const [isMobileMin, setIsMobileMin] = useState(window.innerWidth <= minWidth);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
        

        const toggleMenu = () => {
            setIsMenuOpen(!isMenuOpen);
        };



    useEffect(() => {

        const handleResize = () => {
            setIsMobileMin(window.innerWidth <= minWidth)
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);

    }, [minWidth])

    return {
        isMobileMin,
        toggleMenu,
        isMenuOpen
    }
}


