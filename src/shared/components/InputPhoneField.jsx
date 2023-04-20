import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';

import UsFlag from 'shared/images/us-flag.png';
import { formatPhoneNumber } from 'shared/utils/helpers';
import Label from 'shared/components/Label';

const InputPhoneField = ({
  name,
  label,
  labelColor,
  error,
  className,
  dark,
  variant,
  ...props
}) => {
  const colorClasses = (() => {
    if (dark) {
      return 'text-cream bg-cc-blue-500 border border-cc-blue-500 focus:border-cream/10';
    }

    return 'text-cc-black bg-cream border border-cc-black/50 focus:border-cc-black/100';
  })();

  const variantClasses = (() => {
    switch (variant) {
      case 'shrink':
        return 'pr-2 py-1';
      case 'expanded':
        return 'pr-4 py-5';
      case 'normal':
      default:
        return 'pr-2 py-2 md:py-3';
    }
  })();

  return (
    <div className={className}>
      <Field name={name}>
        {({ field: { name, value, onChange, onBlur }, form: { errors: formikError } }) => (
          <div className="flex flex-col">
            {label && (
              <Label
                className="mb-1 uppercase text-sm md:text-base"
                htmlFor={name}
                color={labelColor}
              >
                {label}
              </Label>
            )}
            <div className="relative">
              <img
                src={UsFlag}
                alt="us-flag"
                className="absolute transform -translate-y-1/2 top-1/2 left-4 leading-none h-6 md:h-8"
              />
              <input
                name={name}
                className={`w-full pl-12 md:pl-16 font-shapiro45_welter_extd text-opacity-70 focus:text-opacity-100 ${colorClasses} ${variantClasses}`}
                autoComplete="off"
                onChange={onChange}
                onBlur={onBlur}
                value={formatPhoneNumber(value)}
                type="tel"
                maxLength="17"
                onPaste={(e) => e.preventDefault() && false}
                {...props}
              />
            </div>
            {(error || formikError[name]) && (
              <div className="font-shapiro45_welter_extd text-xs text-right text-red-500 mt-2">
                {error || formikError[name]}
              </div>
            )}
          </div>
        )}
      </Field>
    </div>
  );
};

InputPhoneField.defaultProps = {
  label: null,
  labelColor: null,
  error: null,
  className: '',
  dark: false,
  variant: 'normal',
};

InputPhoneField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelColor: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  dark: PropTypes.bool,
  variant: PropTypes.oneOf(['normal', 'shrink', 'expanded']),
};

export default InputPhoneField;
