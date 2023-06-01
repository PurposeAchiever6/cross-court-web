import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const Spinner = ({ className, ...props }) => (
  <span className={className}>
    <FontAwesomeIcon className="animate-spin-quick" {...props} icon={faCircleNotch} />
  </span>
);

Spinner.propTypes = {
  className: PropTypes.string,
};

Spinner.defaultProps = {
  className: '',
};

export default Spinner;
