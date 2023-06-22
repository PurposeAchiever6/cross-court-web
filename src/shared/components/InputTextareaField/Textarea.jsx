import React, { useState } from 'react';
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
  onChange,
  showCharCount,
  maxLength,
  value,
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

  const [charCount, setCharCount] = useState(value?.length ?? 0);
  const handleChange = (e) => {
    onChange(e);
    setCharCount(e.target.value.length);
  };

  return (
    <div className={className}>
      <div className={disabled ? 'opacity-50 pointer-events-none' : ''}>
        <div className="flex items-center justify-between">
          {label && (
            <Label forInput color={labelColor}>
              {label}
            </Label>
          )}
          {showCharCount && (
            <span className="font-shapiro45_welter_extd text-sm opacity-70">
              {charCount} / {maxLength || 0}
            </span>
          )}
        </div>
        <textarea
          rows={rows}
          className={`w-full font-shapiro45_welter_extd text-opacity-70 focus:text-opacity-100 text-sm ${colorClasses} ${variantClasses}`}
          disabled={disabled}
          onChange={handleChange}
          value={value}
          maxLength={maxLength}
          {...props}
        />
        {hint && (
          <div
            className={`font-shapiro45_welter_extd text-xs text-right mt-1 ${
              error ? 'text-red-500' : 'text-current opacity-70'
            }`}
          >
            {hint}
          </div>
        )}
        {error && !hint && (
          <div className="font-shapiro45_welter_extd text-xs text-right text-red-500 mt-1">
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
  showCharCount: false,
  maxLength: undefined,
  value: '',
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
  onChange: PropTypes.func.isRequired,
  showCharCount: PropTypes.bool,
  maxLength: PropTypes.number,
  value: PropTypes.string,
};

export default Textarea;
