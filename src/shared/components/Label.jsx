import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ color, children, className }) => {
  const labelColorClass = (() => {
    switch (color) {
      case 'purple':
        return 'text-cc-purple';
      default:
        return 'text-cc-black';
    }
  })();

  return (
    <label className={`block font-shapiro95_super_wide ${labelColorClass} ${className}`}>
      {children}
    </label>
  );
};

Label.defaultProps = {
  className: '',
};

Label.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Label;
