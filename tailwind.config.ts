import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        gray900: '#120D09',
        gray800: '#181410',
        gray700: '#221E1B',
        gray600: '#3C3632',
        gray500: '#524D48',
        gray400: '#817973',
        gray300: '#BAB2AA',
        gray200: '#E2E2E2',

        yellow700: '#D64016',
        yellow600: '#ED7A14',
        yellow500: '#F6C21D',
        yellow400: '#F5DD4B',
        yellow300: '#F4E170',
        yellow200: '#ECEEB8',

        green200: '#47FFBB',

        blue500: '#6A8D95',
        safari500: '#9A9B72',

        black: '#15110E',

        warning800: '#431407',
        warning500: '#B45309',

        danger500: '#FF3232',
        danger600: '#CA1717',
        danger700: '#780101',
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
        enter: {
          from: {
            opacity: '0',
            transform: 'translateY(-20px) scaleX(0.5)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0) scaleX(1)',
          },
        },
        leave: {
          from: { opacity: '1', transform: 'translateY(0)' },
          to: { opacity: '0', transform: 'translateY(-20px) scaleX(0)' },
        },

        modalEnter: {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
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
        enter: 'enter 400ms',
        leave: 'leave 400ms',
        modalEnter: 'modalEnter 300ms',
      },
    },
  },
  plugins: [],
}
export default config
