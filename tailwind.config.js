module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'cc-black': '#1a1a1a',
        'cc-purple': '#9999FF',
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        '10xl': ['10rem', { lineHeight: '1' }],
        '12xl': ['14rem', { lineHeight: '1' }],
      },
      maxWidth: {
        '2xs': '16rem',
      },
      scale: {
        115: '1.15',
      },
      zIndex: {
        1005: 1005,
      },
      boxShadow: {
        navbar: '0px 4px 4px #9999FF',
      },
      animation: {
        fade: 'fade 2500ms linear 800ms 1 backwards',
        'slide-top': 'slide-top 1500ms ease-out 2000ms 1 backwards',
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
      dharma_gothic_cexbold: ['dharma_gothic_cexboldf'],
      dharma_gothic_cheavy_italic: ['dharma_gothic_cheavy_italic'],
      dharma_gothic_cheavy: ['dharma_gothic_cheavy'],
      shapiro45_welter_extd: ['shapiro45_welter_extd'],
      shapiro95_super_wide: ['shapiro95_super_wide'],
      shapiro96_inclined_wide: ['shapiro96_inclined_wide'],
      shapiro97_air_extd: ['shapiro97_air_extd'],
    },
  },
  variants: {
    extend: { width: ['last'] },
  },
  plugins: [],
};