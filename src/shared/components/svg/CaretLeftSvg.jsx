import React from 'react';
import PropTypes from 'prop-types';

const CaretLeftSvg = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M7.02944 10.7782L5.61522 12.1924L7.02944 13.6066L14.8076 21.3848L16.2218 19.9706L8.44365 12.1924L16.2218 4.41421L14.8076 2.99999L7.02944 10.7782Z"
      fill="currentColor"
    />
  </svg>
);

CaretLeftSvg.defaultProps = {
  className: '',
};

CaretLeftSvg.propTypes = {
  className: PropTypes.string,
};

export default CaretLeftSvg;
