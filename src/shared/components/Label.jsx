import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ color, children, className, ...props }) => {
  const labelColorClass = (() => {
    switch (color) {
      case 'purple':
        return 'text-cc-purple';
      default:
        return 'text-cc-black';
    }
  })();

  return (
    <label
      className={`block font-shapiro95_super_wide text-sm md:text-base ${labelColorClass} ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};

Label.defaultProps = {
  color: '',
  className: '',
};

Label.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Label;
