import React from 'react';
import PropTypes from 'prop-types';

const PasswordSvg = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M7 4H5V20H7V4Z" fill="currentColor" />
    <path
      d="M15.1481 9.22836L14 7L12.8519 9.22836L10.4645 8.46447L11.2284 10.8519L9 12L11.2284 13.1481L10.4645 15.5355L12.8519 14.7716L14 17L15.1481 14.7716L17.5355 15.5355L16.7716 13.1481L19 12L16.7716 10.8519L17.5355 8.46447L15.1481 9.22836Z"
      fill="currentColor"
    />
  </svg>
);

PasswordSvg.defaultProps = {
  className: '',
};

PasswordSvg.propTypes = {
  className: PropTypes.string,
};

export default PasswordSvg;
