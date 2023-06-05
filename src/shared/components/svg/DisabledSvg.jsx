import React from 'react';
import PropTypes from 'prop-types';

const DisabledSvg = ({ className }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.10048 25.8995C3.56699 23.366 2 19.866 2 16C2 8.26801 8.26801 2 16 2C19.866 2 23.366 3.56699 25.8995 6.10048L6.10048 25.8995ZM7.61562 27.2127C9.95279 28.9632 12.8553 30 16 30C23.732 30 30 23.732 30 16C30 12.8553 28.9632 9.95279 27.2127 7.61562L7.61562 27.2127ZM0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z"
      fill="currentColor"
    />
  </svg>
);

DisabledSvg.defaultProps = {
  className: '',
};

DisabledSvg.propTypes = {
  className: PropTypes.string,
};

export default DisabledSvg;
