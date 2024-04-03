import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        gray900: '#0D0612',
        gray800: '#120B18',
        gray700: '#1E1A22',
        gray600: '#37323C',
        gray500: '#4D4852',
        gray400: '#7A7381',
        gray300: '#B2AABA',
        gray200: '#E2E2E2',

        green200: '#47FFBB',

        danger500: '#FF3232',
        danger600: '#CA1717',
        danger700: '#780101',

        purple50: '#FAF5FF',
        purple200: '#E9D5FF',
        purple400: '#C084FC',
        purple500: '#A855F7',
        purple600: '#9333EA',
        purple700: '#7E22CE',
        purple800: '#6B21A8',
        purple900: '#581C87',
      },
      fontFamily: {
        montserrat: 'var(--montserrat)',
      },
      keyframes: {
        slideDownAndFade: {
          from: { opacity: '0', transform: 'translateY(-2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: '0', transform: 'translateX(2px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          from: { opacity: '0', transform: 'translateY(2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: '0', transform: 'translateX(-2px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        slideDownAndFade:
          'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade:
          'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade:
          'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
export default config
