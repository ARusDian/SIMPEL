const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './vendor/laravel/jetstream/**/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    daisyui: {
        themes: [
            {
                mytheme: {
                    "primary": "#1d70d6",
                    "secondary": "#9469ea",
                    "accent": "#c8c4fc",
                    "neutral": "#93c5fd",
                    "base-100": "#F7F7F8",
                    "info": "#629BE4",
                    "success": "#169C50",
                    "warning": "#F2B53A",
                    "error": "#DE402B",
                },
            },
        ],
    },

    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'), require("daisyui")],
};
