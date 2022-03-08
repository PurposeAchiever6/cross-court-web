import React from 'react';
import PropTypes from 'prop-types';

const CrossSvg = ({ color }) => (
  <svg width="18" height="17" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21.1192 20.3692L2.38086 1.63083"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M2.38088 20.3692L21.1192 1.63083"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

CrossSvg.propTypes = {
  color: PropTypes.string.isRequired,
};

export default CrossSvg;
