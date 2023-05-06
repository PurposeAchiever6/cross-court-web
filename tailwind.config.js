module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      height: {
        124: '31rem',
        164: '44rem',
      },
      padding: {
        160: '40rem',
      },
      width: {
        38: '9.5rem',
      },
      colors: {
        'cc-black': '#1a1a1a',
        'cc-purple': {
          300: '#AAAFF3',
          DEFAULT: '#9999FF',
          500: '#9999FF',
          700: '#7070FF',
          900: '#573AE9',
        },
        'cc-blue': {
          100: '#2E2E4D',
          300: '#262640',
          500: '#1F1F33',
          700: '#171726',
          900: '#0F0F1A',
        },
        'cc-gray': {
          400: '#E6E6E6',
          600: '#B3B3B3',
        },
        cream: '#FBF7F3',
        success: '#A3F5B0',
        warning: '#FFDC99',
        error: {
          400: '#FF8F8F',
          600: '#AE1313',
        },
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        '10xl': ['10rem', { lineHeight: '1' }],
        '11xl': ['12rem', { lineHeight: '1' }],
        '12xl': ['14rem', { lineHeight: '1' }],
        '13xl': ['16rem', { lineHeight: '1' }],
      },
      lineHeight: {
        smaller: '0.75',
      },
      minHeight: {
        60: '15rem',
      },
      minWidth: {
        4: '1rem',
        8: '2rem',
        10: '2.5rem',
      },
      maxWidth: {
        '2xs': '16rem',
      },
      scale: {
        110: '1.1',
      },
      zIndex: {
        '-1': -1,
        1005: 1005,
      },
      borderWidth: {
        3: '3px',
      },
      boxShadow: {
        'header-white': '0px 1px 6px #9999FF',
        'header-dark': '0px -2px 8px #9999FF',
        'all-around-purple': '0px 0px 15px rgba(153, 153, 255, 0.4)',
      },
      animation: {
        fade: 'fade 2500ms linear 800ms 1 backwards',
        'slide-top': 'slide-top 1500ms ease-out 2000ms 1 backwards',
        'spin-slow': 'spin infinite 4s',
        'spin-quick': 'spin 0.6s linear infinite',
        'highlight-purple-twice':
          'highlight-purple 3s cubic-bezier(0.78, 0.05, 0.68, 0.79) 0.5s 2;',
      },
      backgroundImage: {
        'cc-ball-logo': "url('../shared/images/logos/cc-ball-purple.png')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'space-dots-with-radial-gradient':
          "radial-gradient(circle,black 5%,rgba(0,0,0,0.6)),url('../shared/images/backgrounds/space-dots.jpeg')",
      },
      transitionDelay: {
        0: '0ms',
      },
      keyframes: {
        fade: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        'slide-top': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-100%)',
          },
          '100%': {
            opacity: '1',
          },
        },
        'highlight-purple': {
          '60%': {
            backgroundColor: 'rgba(102, 102, 255, 0.80)',
          },
        },
      },
    },
    fontFamily: {
      dharma_gothic_cexbold: ['dharma_gothic_cexbold'],
      dharma_gothic_cheavy_italic: ['dharma_gothic_cheavy_italic'],
      dharma_gothic_cheavy: ['dharma_gothic_cheavy'],
      shapiro45_welter_extd: ['shapiro45_welter_extd'],
      shapiro95_super_wide: ['shapiro95_super_wide'],
      shapiro96_inclined_wide: ['shapiro96_inclined_wide'],
      shapiro97_air_extd: ['shapiro97_air_extd'],
    },
  },
  plugins: [],
};
