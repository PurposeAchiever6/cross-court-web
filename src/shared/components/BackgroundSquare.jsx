import React from 'react';
import PropTypes from 'prop-types';

const BackgroundSquare = ({ className }) => (
  <div className={`absolute w-52 h-52 border border-cc-purple ${className}`} />
);

BackgroundSquare.defaultProps = {
  className: '',
};

BackgroundSquare.propTypes = {
  className: PropTypes.string,
};

export default BackgroundSquare;
