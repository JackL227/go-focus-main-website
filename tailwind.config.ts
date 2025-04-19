
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
        border: 'rgba(255, 255, 255, 0.1)',
        input: '#cecece',
        ring: '#cecece',
        background: {
          DEFAULT: '#071020', // Dark navy
          foreground: '#cecece'
        },
        foreground: {
          DEFAULT: '#cecece', // Light grey
          secondary: '#000000'
        },
        primary: {
          DEFAULT: '#006eda', // Blue
          foreground: '#cecece'
        },
        secondary: {
          DEFAULT: '#cecece',
          foreground: '#071020'
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
          DEFAULT: '#00E676', // Neon green
          foreground: '#071020'
        },
        popover: {
          DEFAULT: '#071020',
          foreground: '#cecece'
        },
        card: {
          DEFAULT: '#071020',
          foreground: '#cecece'
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
          '50%': { opacity: '1' }
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
        },
        'button-pop': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' }
        },
        'shadow-pulse': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0,110,218,0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(0,110,218,0.8)' }
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
        'ripple': 'ripple 2s ease-out infinite',
        'button-pop': 'button-pop 2s ease-in-out infinite',
        'shadow-pulse': 'shadow-pulse 2s ease-in-out infinite'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
