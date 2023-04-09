import React from 'react';
import PropTypes from 'prop-types';

const CheckSvg = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g clipPath="url(#clip0_348_193)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.3235 4.70589L12.636 20.9951L3.32918 16.3417L4.67082 13.6584L11.364 17.005L18.6765 3.29413L21.3235 4.70589Z"
        fill="currentColor"
      />
    </g>
  </svg>
);

CheckSvg.defaultProps = {
  className: '',
};

CheckSvg.propTypes = {
  className: PropTypes.string,
};

export default CheckSvg;
