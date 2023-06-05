import React from 'react';
import PropTypes from 'prop-types';

const SignalBarsSvg = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M20 2H16V22H20V2Z" fill="currentColor" />
    <path d="M10 8H14V22H10V8Z" fill="currentColor" />
    <path d="M4 12H8V22H4V12Z" fill="currentColor" />
  </svg>
);

SignalBarsSvg.defaultProps = {
  className: '',
};

SignalBarsSvg.propTypes = {
  className: PropTypes.string,
};

export default SignalBarsSvg;
