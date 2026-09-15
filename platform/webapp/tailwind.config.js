/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: '#0e1114',
          900: '#161a1f',
          800: '#1e242b',
          700: '#2a323c',
          600: '#3a4450',
          400: '#7a8794',
          200: '#c5cdd5',
        },
        signal: {
          DEFAULT: '#e85d04',
          soft: '#f48c06',
          mute: '#9a3412',
        },
        yard: {
          slip: '#dc2626',
          clear: '#16a34a',
          hold: '#ca8a04',
        },
      },
      fontFamily: {
        display: ['var(--font-ibm-plex-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-ibm-plex-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-ibm-plex-mono)', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
