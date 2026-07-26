import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ground: 'var(--ground)',
        paper: 'var(--paper)',
        rule: 'var(--rule)',
        ink: 'var(--ink)',
        body: 'var(--body)',
        muted: 'var(--muted)',
        blue: 'var(--blue)',
        'blue-text': 'var(--blue-text)',
        'blue-on-dark': 'var(--blue-on-dark)',
        dark: 'var(--dark)',
        'dark-body': 'var(--dark-body)',
        'dark-muted': 'var(--dark-muted)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        sans: 'var(--font-body)',
        mono: 'var(--font-mono)',
      },
      maxWidth: {
        shell: '76rem',
        prose: '44rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
