/* eslint-disable no-bitwise */

const hexToRgb = (hex, opacity = '') => {
  let hexString = hex;

  if (hexString.charAt(0) === '#') {
    hexString = hexString.slice(1);
  }

  const bigint = parseInt(hexString, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  let rgb = `rgb(${r},${g},${b})`;

  if (opacity) {
    rgb = `rgba(${r},${g},${b},${opacity})`;
  }

  return rgb;
};

export { hexToRgb };
