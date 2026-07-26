import localFont from 'next/font/local';

/**
 * Bundled woff2 rather than next/font/google: no third-party request at
 * runtime, and the build does not depend on Google being reachable.
 */

export const display = localFont({
  src: '../public/fonts/bricolage-grotesque-latin-wght-normal.woff2',
  weight: '200 800',
  display: 'swap',
  variable: '--font-display',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
});

export const body = localFont({
  src: '../public/fonts/inter-latin-wght-normal.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-body',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
});

export const mono = localFont({
  src: '../public/fonts/jetbrains-mono-latin-wght-normal.woff2',
  weight: '100 800',
  display: 'swap',
  variable: '--font-mono',
  fallback: ['ui-monospace', 'SFMono-Regular', 'monospace'],
});
