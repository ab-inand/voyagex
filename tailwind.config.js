/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'border-glow': 'border-glow 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
        'border-glow': {
          '0%, 100%': {
            'border-color': 'rgba(59, 130, 246, 0.5)',
          },
          '50%': {
            'border-color': 'rgba(168, 85, 247, 0.5)',
          },
        },
        'shimmer': {
          '0%': {
            'transform': 'translateX(-100%)',
          },
          '100%': {
            'transform': 'translateX(100%)',
          },
        },
      },
      colors: {
        'holographic-blue': 'rgba(59, 130, 246, 0.2)',
        'holographic-purple': 'rgba(168, 85, 247, 0.2)',
      },
    },
  },
  plugins: [],
}; 