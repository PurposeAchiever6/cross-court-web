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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
