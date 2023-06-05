/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ forInput, color, children, className, ...props }) => {
  const inputClasses = forInput
    ? 'font-shapiro45_welter_extd text-sm mb-1'
    : 'font-shapiro95_super_wide';

  const labelColorClass = (() => {
    switch (color) {
      case 'purple':
        return 'text-cc-purple';
      case 'white':
        return 'text-white';
      default:
        return 'text-cc-black';
    }
  })();

  return (
    <label className={`block ${inputClasses} ${labelColorClass} ${className}`} {...props}>
      {children}
    </label>
  );
};

Label.defaultProps = {
  forInput: false,
  color: '',
  className: '',
};

Label.propTypes = {
  forInput: PropTypes.bool,
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Label;
