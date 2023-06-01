import React from 'react';
import PropTypes from 'prop-types';

const ArrowPointDownSvg = ({ className }) => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M2.66699 4.00008H7.66699V12.0573L4.80506 9.19535L3.86225 10.1382L8.33366 14.6096L12.8051 10.1382L11.8623 9.19535L9.00033 12.0573V2.66675H2.66699V4.00008Z"
      fill="currentColor"
    />
  </svg>
);

ArrowPointDownSvg.defaultProps = {
  className: '',
};

ArrowPointDownSvg.propTypes = {
  className: PropTypes.string,
};

export default ArrowPointDownSvg;
