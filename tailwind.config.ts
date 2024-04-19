import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "app-primary": "#00704a",
        "app-secondary": "#f5f5f5",
        "app-accent": "#15803d",
        "app-gray": "#d9d9d9",
        "app-white": "#f5f5f5",
        "app-black": "#000000",
      }
    },
  },
  plugins: [require("daisyui")],
}
export default config
