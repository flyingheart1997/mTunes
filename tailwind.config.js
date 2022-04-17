module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '300px',
      'ms': '500px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    extend: {
      keyframes: {
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-12%)',
          },
          "50%": {
            transform: 'translateY(10%)',
          }
        }
      },
      animation: { bounce: '2s infinite bounce' },
    },
    
    fontFamily: {
      body: ["Andada Pro", "serif"],
      sans: ["ui-sans-serif", "system-ui"],
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
