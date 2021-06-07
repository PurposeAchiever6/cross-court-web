module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'cc-black': '#231F20',
        'cc-purple': '#9999FF',
      },
      fontSize: {
        '10xl': ['10rem', { lineHeight: '1' }],
      },
      scale: {
        115: '1.15',
      },
      fontFamily: ['hover'],
      zIndex: {
        1005: 1005,
      },
      boxShadow: {
        navbar: '0px 4px 4px #9999FF',
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
