import React from 'react';
import PropTypes from 'prop-types';

import StarSvg from 'shared/components/svg/StarSvg';

const Star = ({ alt, full, hover, className, fadeEffect, selectedRate, onClick, ...props }) => (
  <div
    {...props}
    onClick={onClick}
    className={`${onClick ? 'cursor-pointer' : ''} ${
      fadeEffect ? 'transition-colors duration-500' : ''
    } ${full ? 'bg-cc-purple' : `${hover ? 'bg-cc-black/60' : 'bg-cc-gray-600'}`} p-2 mr-1`}
  >
    <StarSvg
      className={`${className} ${fadeEffect ? 'transition-colors duration-500' : ''} ${
        full ? 'text-black' : 'text-white'
      }`}
    />
  </div>
);

Star.defaultProps = {
  fadeEffect: true,
  className: '',
  onClick: undefined,
};

Star.propTypes = {
  alt: PropTypes.string.isRequired,
  full: PropTypes.bool.isRequired,
  hover: PropTypes.bool.isRequired,
  className: PropTypes.string,
  fadeEffect: PropTypes.bool,
  selectedRate: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};

export default Star;
