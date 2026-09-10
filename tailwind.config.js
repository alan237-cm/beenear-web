import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                'bee-yellow': '#F5BE1E', 
                'bee-dark': '#231F20',   
                'bee-light': '#F6E9AC',  
                'corp-light': '#F8FAFC' 
            },
            fontFamily: {
                sans: ['"Montserrat"', ...defaultTheme.fontFamily.sans],
                heading: ['"Poppins"', ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                }
            },
            animation: {
                marquee: 'marquee 25s linear infinite',
            }
        },
    },

    plugins: [forms],
};
