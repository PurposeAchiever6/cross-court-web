import React from 'react';
import PropTypes from 'prop-types';

import Label from 'shared/components/Label';

const Textarea = ({ label, error, labelColor, hint, rows, className, ...props }) => (
  <div className={className}>
    {label && (
      <Label className="mb-1" color={labelColor}>
        {label}
      </Label>
    )}
    <textarea
      rows={rows}
      className="p-3 w-full text-sm border text-cc-black text-opacity-70 focus:text-opacity-100 border-cc-black border-opacity-50 focus:border-opacity-100"
      {...props}
    />
    {hint && (
      <div
        className={`block text-xs text-right ${
          error ? 'text-red-500' : 'text-cc-black text-opacity-70'
        }`}
      >
        {hint}
      </div>
    )}
    {error && !hint && <div className="block text-xs text-right text-red-500">{error}</div>}
  </div>
);

Textarea.defaultProps = {
  label: null,
  error: null,
  labelColor: 'black',
  hint: null,
  rows: 4,
  className: '',
};

Textarea.propTypes = {
  label: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  labelColor: PropTypes.string,
  hint: PropTypes.string,
  rows: PropTypes.number,
  className: PropTypes.string,
};

export default Textarea;
