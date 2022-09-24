import React from 'react';
import PropTypes from 'prop-types';

import Label from 'shared/components/Label';

const Textarea = ({ label, labelColor, error, hint, disabled, rows, className, ...props }) => (
  <div className={className}>
    <div className={disabled ? 'opacity-50 pointer-events-none' : ''}>
      {label && (
        <Label className="mb-1 uppercase text-sm md:text-base" color={labelColor}>
          {label}
        </Label>
      )}
      <textarea
        rows={rows}
        className="w-full font-shapiro45_welter_extd text-cc-black text-opacity-70 focus:text-opacity-100 bg-cream border border-cc-black/50 focus:border-cc-black/100 px-2 py-2 md:py-3"
        disabled={disabled}
        {...props}
      />
      {hint && (
        <div
          className={`font-shapiro45_welter_extd text-xs text-right mt-px ${
            error ? 'text-red-500' : 'text-current opacity-70'
          }`}
        >
          {hint}
        </div>
      )}
      {error && !hint && (
        <div className="font-shapiro45_welter_extd text-xs text-right text-red-500 mt-px">
          {error}
        </div>
      )}
    </div>
  </div>
);

Textarea.defaultProps = {
  label: null,
  labelColor: null,
  error: null,
  hint: null,
  disabled: false,
  rows: 4,
  className: '',
};

Textarea.propTypes = {
  label: PropTypes.string,
  labelColor: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  hint: PropTypes.string,
  disabled: PropTypes.bool,
  rows: PropTypes.number,
  className: PropTypes.string,
};

export default Textarea;
