/** @type {import('tailwindcss').Config} */
module.exports = {
    // "media" = follow system; "class" = manual toggle.
    // We'll use "class" so you can *also* toggle, but still default to system via CSS vars below.
    darkMode: "class",
    content: ["./src/**/*.{ts,tsx,js,jsx,mdx,html}", "./app/**/*.{ts,tsx,js,jsx,mdx,html}"],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            fontFamily: {
                sans: ["ui-sans-serif", "system-ui", "Helvetica", "Arial", "sans-serif"],
            },
        },
    },
    plugins: [],
};
