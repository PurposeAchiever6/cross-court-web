import React from 'react';
import PropTypes from 'prop-types';

import Label from 'shared/components/Label';

const Textarea = ({
  label,
  labelColor,
  error,
  hint,
  disabled,
  rows,
  dark,
  variant,
  className,
  ...props
}) => {
  const colorClasses = (() => {
    if (dark) {
      return 'text-cream bg-cc-blue-500 border border-cc-blue-500 focus:border-cream/10';
    }

    return 'text-cc-black bg-cc-gray-400 border border-cc-gray-400 focus:border-cc-gray-600 placeholder:text-gray-400';
  })();

  const variantClasses = (() => {
    switch (variant) {
      case 'shrink':
        return 'px-2 py-1';
      case 'expanded':
        return 'px-4 py-5';
      case 'normal':
      default:
        return 'px-2 py-2 md:py-3';
    }
  })();

  return (
    <div className={className}>
      <div className={disabled ? 'opacity-50 pointer-events-none' : ''}>
        {label && (
          <Label forInput color={labelColor}>
            {label}
          </Label>
        )}
        <textarea
          rows={rows}
          className={`w-full font-shapiro45_welter_extd text-opacity-70 focus:text-opacity-100 text-sm ${colorClasses} ${variantClasses}`}
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
};

Textarea.defaultProps = {
  label: null,
  labelColor: null,
  error: null,
  hint: null,
  disabled: false,
  rows: 4,
  dark: false,
  variant: 'normal',
  className: '',
};

Textarea.propTypes = {
  label: PropTypes.string,
  labelColor: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  hint: PropTypes.string,
  disabled: PropTypes.bool,
  rows: PropTypes.number,
  dark: PropTypes.bool,
  variant: PropTypes.oneOf(['normal', 'shrink', 'expanded']),
  className: PropTypes.string,
};

export default Textarea;
