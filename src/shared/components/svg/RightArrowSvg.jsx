import React from 'react';
import PropTypes from 'prop-types';

const RightArrowSvg = ({ disabled = false }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1 8L15 8"
      stroke={disabled ? '#BBBECD' : 'black'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 1L15 8L8 15"
      stroke={disabled ? '#BBBECD' : 'black'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

RightArrowSvg.propTypes = {
  disabled: PropTypes.bool,
};

export default RightArrowSvg;
