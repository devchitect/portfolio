import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',

  ],
  theme: {
    screens: {
      //min-width
      sm: '280px',
      md: '640px',
      lg: '1000px',
      xl: '1380px',
      none: '0px'
    },  
    extend: {
      keyframes: {
        'spin-opacity': {
          '0%' : { transform: 'rotate(0deg)', opacity: '0' },
          '50%' : { opacity: '1'},
          '100%': { transform: 'rotate(360deg)', opacity: '0' },
        },
        'text-loop': {
          '0%' : {transform:'translateX(-100%)'},
          '100%' : {transform: 'translateX(var(0))'}
        },
        'text-loop-reverse': {
          '0%' : {transform:'translateX(0)'},
          '100%' : {transform: 'translateX(-100%)'}
        },

      },
      fontSize: {
        '7.5xl': '5.35rem',
        '10xl': '9rem'
      },
      animation: {
        'bounce-slow': 'bounce 5s ease-out infinite',
        'spin-slow': 'spin 3s ease-in-out infinite',
        'spin-opacity': 'spin-opacity 5s ease-in-out infinite',
        'text-loop':'text-loop 50s linear infinite',
        'text-loop-reverse':'text-loop-reverse 50s linear infinite',
      },
      spacing: {
        per0 : '0px',
        per5: '5%',
        per10 : '10%',
        per15 : '15%',
        per20 : '20%',
        per25 : '25%',
        per30 : '30%',
        per35 : '35%',
        per40 : '40%',
        per45 : '45%',
        per50: '50%',
        per55: '55%',
        per60 : '60%',
        per70 : '70%',
        per80 : '80%',
        per90 : '90%',
        per100: '100%',
        per150: '150%'
      },
      colors: {
        themeColor: 'var(--theme-color)',
        bgColor: 'var(--bg-color)',
        white: '#FFFFFF',
        black: '#111111',
        grey: '#9ca3af'
      },
      backgroundImage : {
        'colorful': "var(--gradient-colorful)",
      },
      zIndex: {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}
export default config
