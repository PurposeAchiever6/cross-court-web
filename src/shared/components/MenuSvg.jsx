import React from 'react';
import PropTypes from 'prop-types';

const MenuSvg = ({ color }) => (
  <svg width="27" height="22" viewBox="0 0 27 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M26.5 1H0" stroke={color} strokeWidth="2" />
    <path d="M26.5 11H0" stroke={color} strokeWidth="2" />
    <path d="M26.5 21H0" stroke={color} strokeWidth="2" />
  </svg>
);

MenuSvg.propTypes = {
  color: PropTypes.string,
};

MenuSvg.defaultProps = {
  color: 'black',
};

export default MenuSvg;
