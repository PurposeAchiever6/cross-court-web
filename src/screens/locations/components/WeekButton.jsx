import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const WeekButton = ({ icon, disabled, onClick, className }) => (
  <button
    type="button"
    onClick={onClick}
    className={`bg-cc-blue-900 px-4 py-2 transition-all duration-300 hover:bg-cc-blue-700 ${
      disabled ? 'opacity-50 pointer-events-none' : ''
    } ${className}`}
  >
    <FontAwesomeIcon icon={icon} />
  </button>
);

WeekButton.defaultProps = {
  className: '',
};

WeekButton.propTypes = {
  icon: PropTypes.shape().isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default WeekButton;
