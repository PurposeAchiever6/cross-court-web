import React from 'react';

import PropTypes from 'prop-types';
import CrossSvg from './svg/CrossSvg';

const CloseButton = ({ onClick, color, className }) => (
  <button className={className} onClick={onClick} type="button">
    <CrossSvg color={color} />
  </button>
);

CloseButton.defaultProps = {
  color: 'white',
  className: '',
};

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default CloseButton;
