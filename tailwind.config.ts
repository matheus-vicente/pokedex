import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        "logo-sm": "160px",
        "logo-md": "200px",
        "logo-lg": "240px",
      },
      margin: {
        "sm-main": "162px",
      },
    },
  },
  plugins: [],
};
export default config;
