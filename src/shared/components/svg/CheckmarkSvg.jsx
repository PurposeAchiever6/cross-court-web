import React from 'react';
import PropTypes from 'prop-types';

const CheckmarkSvg = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="12" fill="currentColor" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M18.269 6.31769L19.7311 7.68232L9.66667 18.4656L4.26895 12.6823L5.73106 11.3177L9.66667 15.5344L18.269 6.31769Z"
      fill="white"
    />
  </svg>
);

CheckmarkSvg.defaultProps = {
  className: '',
};

CheckmarkSvg.propTypes = {
  className: PropTypes.string,
};

export default CheckmarkSvg;
