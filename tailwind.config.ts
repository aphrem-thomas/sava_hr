import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primaryfont: "var(--primaryfont)",
        darkthemefont: "var(--darkthemefont)",
        theme:"var(--theme)",
      },
      clipPath: {
        'curve': 'ellipse(72% 51% at 50% 38%)'
      },
    },
  },
  plugins: [],
};
export default config;
