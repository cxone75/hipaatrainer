import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af',
        secondary: '#3b82f6',
        success: '#10b981',
        warning: '#f59e0b',
        alert: '#ef4444',
        'light-blue': '#dbeafe',
        background: '#f0f9ff',
        'dark-text': '#1e293b',
        'muted-text': '#64748b',
        border: '#e2e8f0',
        compliant: '#10b981',
        critical: '#ef4444',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;