import React from 'react';
import PropTypes from 'prop-types';

const LocationPinSvg = ({ className }) => (
  <svg viewBox="0 0 33 42" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M16.5 42C21.3366 42 32.5 24.8366 32.5 16C32.5 7.16344 25.3366 0 16.5 0C7.66344 0 0.5 7.16344 0.5 16C0.5 24.8366 11.6634 42 16.5 42ZM16.5 24C20.9183 24 24.5 20.4183 24.5 16C24.5 11.5817 20.9183 8 16.5 8C12.0817 8 8.5 11.5817 8.5 16C8.5 20.4183 12.0817 24 16.5 24Z"
      fill="currentColor"
    />
  </svg>
);

LocationPinSvg.defaultProps = {
  className: '',
};

LocationPinSvg.propTypes = {
  className: PropTypes.string,
};

export default LocationPinSvg;
