import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn } from '@fortawesome/free-solid-svg-icons';

const ToggleButton = ({ offLabel, onLabel, size, value, onChange, className }) => {
  const getSize = (() => {
    switch (size) {
      case 'sm':
        return 'text-sm';
      case 'lg':
        return 'text-lg';
      case 'xl':
        return 'text-xl';
      case '2xl':
        return 'text-2xl';
      case '4xl':
        return 'text-4xl';
      default:
        return 'text-base';
    }
  })();

  return (
    <div className={className}>
      {offLabel && <span className="mr-5">{offLabel}</span>}
      {!value && (
        <FontAwesomeIcon
          icon={faToggleOn}
          className={`${getSize} text-cc-purple cursor-pointer`}
          rotation={180}
          onClick={() => onChange(true)}
        />
      )}
      {value && (
        <FontAwesomeIcon
          icon={faToggleOn}
          className={`${getSize} text-cc-purple cursor-pointer`}
          onClick={() => onChange(false)}
        />
      )}
      {onLabel && <span className="ml-5">{onLabel}</span>}
    </div>
  );
};

ToggleButton.defaultProps = {
  offLabel: null,
  onLabel: null,
  size: null,
  className: null,
};

ToggleButton.propTypes = {
  offLabel: PropTypes.string,
  onLabel: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ToggleButton;
