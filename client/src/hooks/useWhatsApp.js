
import React, { useCallback } from 'react'

export const useWhatsApp = () => {

    const contactWhatsApp = useCallback(() => {
        const telefono = "573234447475";
        const mensaje = `Hola, estoy interesado en los servicios que ofrecen.
        Me gustaría recibir más información y conocer mas servicios y funcionalidades de la plataforma.\r Muchas gracias.`;

        const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, "_blank");
    }, [])

    return {
        contactWhatsApp
    }
}

