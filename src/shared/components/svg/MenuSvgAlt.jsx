import React from 'react';
import PropTypes from 'prop-types';

const MenuSvgAlt = ({ color, className }) => (
  <svg
    className={className}
    width="27"
    height="22"
    viewBox="0 0 27 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M26.5 1H0" stroke={color} strokeWidth="3" />
    <path d="M26.5 11H0" stroke={color} strokeWidth="3" />
    <path d="M26.5 21H0" stroke={color} strokeWidth="3" />
  </svg>
);

MenuSvgAlt.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
};

MenuSvgAlt.defaultProps = {
  color: '#9999FF',
  className: '',
};

export default MenuSvgAlt;
