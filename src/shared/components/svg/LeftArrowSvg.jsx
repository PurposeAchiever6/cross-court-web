import React from 'react';
import PropTypes from 'prop-types';

const LeftArrowSvg = ({ disabled = false }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15 8L1 8"
      stroke={disabled ? '#BBBECD' : 'black'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 15L1 8L8 1"
      stroke={disabled ? '#BBBECD' : 'black'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

LeftArrowSvg.propTypes = {
  disabled: PropTypes.bool,
};

export default LeftArrowSvg;
