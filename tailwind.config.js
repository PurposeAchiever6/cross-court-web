module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        124: '31rem',
        164: '44rem',
      },
      padding: {
        160: '40rem',
      },
      colors: {
        'cc-black': '#1a1a1a',
        'cc-purple': '#9999FF',
        cream: '#fbf7f3',
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
      boxShadow: {
        'header-white': '0px 1px 6px #9999FF',
        'header-dark': '0px -2px 7px #9999FF',
        'all-around-purple': '0px 0px 15px rgba(153, 153, 255, 0.4)',
      },
      animation: {
        fade: 'fade 2500ms linear 800ms 1 backwards',
        'slide-top': 'slide-top 1500ms ease-out 2000ms 1 backwards',
        'spin-slow': 'spin infinite 4s',
      },
      backgroundImage: {
        'cc-ball-logo': "url('../shared/images/new-purple-circular-logo.png')",
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
  variants: {
    extend: {
      borderWidth: ['last'],
      width: ['last'],
      display: ['group-hover'],
      borderOpacity: ['focus'],
      textColor: ['focus'],
      transitionDelay: ['group-hover'],
    },
  },
  plugins: [],
};
