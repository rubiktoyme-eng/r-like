import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // R-LIKEブランドカラー（前回のモックで採用したパキッと配色）
        "brand-pink": "#b8456a",
        "brand-pink-light": "#fde0e4",
        "brand-pink-pale": "#fef0f2",
        "brand-teal": "#2bb3a7",
        "brand-teal-dark": "#1d8b80",
        "brand-teal-light": "#d6f0ec",
        "brand-yellow": "#ffd166",
        "brand-yellow-light": "#fff5d6",
        "brand-orange": "#e8593c",
        "brand-text": "#2c2c2a",
        "brand-text-sub": "#5f5e5a",
        "brand-bg": "#faf7f2"
      }
    }
  },
  plugins: []
};
export default config;
