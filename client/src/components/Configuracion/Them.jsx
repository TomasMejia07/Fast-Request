import React, { useState, useEffect, createContext, useContext } from "react";
import { useConfiguracion } from "../../hooks/useConfiguracion";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    const { showStatus } = useConfiguracion();

    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "system");

    useEffect(() => {
        const root = document.documentElement;
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const applyTheme = () => {
            root.classList.remove("light");

            if (theme === "system") {
                if (!mediaQuery.matches) {
                    root.classList.add("light");
                }
            } else if (theme === "light") {
                root.classList.add("light");
            }

            localStorage.setItem("theme", theme);
        };

        applyTheme();

        if (theme === "system") {
            mediaQuery.addEventListener("change", applyTheme);
            return () => mediaQuery.removeEventListener("change", applyTheme);
        }

        showStatus(
            `Tema cambiado a ${theme === "light"
                ? "claro"
                : theme === "dark"
                    ? "oscuro"
                    : "automático"
            }`
        );
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};


export const useTheme = () => useContext(ThemeContext);
