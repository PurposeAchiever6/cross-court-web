import React from 'react';
import PropTypes from 'prop-types';

const CrossSvg = ({ className }) => (
  <svg viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M21.1192 20.3692L2.38086 1.63083"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M2.38088 20.3692L21.1192 1.63083"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

CrossSvg.defaultProps = {
  className: '',
};

CrossSvg.propTypes = {
  className: PropTypes.string,
};

export default CrossSvg;
