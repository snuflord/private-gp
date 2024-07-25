'use client'

import { useEffect, useState } from "react";
import { MdOutlineWbSunny } from "react-icons/md";
import { BsFillMoonStarsFill } from "react-icons/bs";


export default function ThemeToggle() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        // Function to apply the theme
        const applyTheme = (newTheme: string) => {
            if (newTheme === 'dark') {
                document.documentElement.classList.add('dark');
                setTheme('dark');
            } else {
                document.documentElement.classList.remove('dark');
                setTheme('light');
            }
        };

        // Check localStorage for theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            applyTheme(savedTheme);
        } else {
            // If no preference is stored, use system preference
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            applyTheme(mediaQuery.matches ? 'dark' : 'light');

            // Listen for changes to the system preference
            const handleChange = (event: MediaQueryListEvent) => {
                applyTheme(event.matches ? 'dark' : 'light');
            };

            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, []);

    const toggleTheme = (e: { preventDefault: () => void; }) => {
      e.preventDefault();

        const newTheme = theme === 'light' ? 'dark' : 'light';
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <button onClick={toggleTheme}>
          {theme && theme == 'light' ? <BsFillMoonStarsFill /> : <MdOutlineWbSunny />}
        </button>
    );
}
