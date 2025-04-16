
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        border: '#cecece',
        input: '#cecece',
        ring: '#cecece',
        background: {
          DEFAULT: '#000000',
          foreground: '#cecece'
        },
        foreground: {
          DEFAULT: '#cecece',
          secondary: '#000000'
        },
        primary: {
          DEFAULT: '#006eda',
          foreground: '#cecece'
        },
        secondary: {
          DEFAULT: '#cecece',
          foreground: '#000000'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: '#444444',
          foreground: '#cecece'
        },
        accent: {
          DEFAULT: '#000000',
          foreground: '#cecece'
        },
        popover: {
          DEFAULT: '#000000',
          foreground: '#cecece'
        },
        card: {
          DEFAULT: '#000000',
          foreground: '#cecece'
        },
        trader: {
          blue: '#006eda',
          'blue-light': '#006eda',
          green: '#006eda',
          'green-light': '#006eda',
          accent: '#006eda',
          gray: '#cecece',
          'gray-light': '#cecece',
          'gray-dark': '#cecece'
        },
        dark: {
          background: '#000000',
          text: '#cecece',
          muted: '#444444'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'flow-line': {
          '0%': {
            transform: 'translateX(-5%)'
          },
          '100%': {
            transform: 'translateX(105%)'
          }
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '0.9' }
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        'slide-in-bottom': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'glow': {
          '0%, 100%': { filter: 'brightness(1) blur(8px)' },
          '50%': { filter: 'brightness(1.2) blur(12px)' }
        },
        'ripple': {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(1.5)', opacity: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'flow-line': 'flow-line 15s linear infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'slide-in-right': 'slide-in-right 0.6s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.6s ease-out forwards',
        'slide-in-bottom': 'slide-in-bottom 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 4s ease-in-out infinite',
        'ripple': 'ripple 2s ease-out infinite'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
