import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { isNil } from 'ramda';
import UsFlag from 'shared/images/us-flag.png';
import { formatPhoneNumber } from 'shared/utils/helpers';
import Label from 'shared/components/Label';

const InputPhoneField = ({
  name,
  error,
  labelText,
  placeholder,
  disabled,
  labelColor,
  ...props
}) => (
  <Field name={name}>
    {({ field: { name, value, onChange, onBlur }, form: { touched, errors: formikError } }) => (
      <div {...props} className="flex flex-col mb-4">
        {labelText && (
          <Label className="mb-1 uppercase" htmlFor={name}>
            {labelText}
          </Label>
        )}
        <div className="relative">
          <img src={UsFlag} alt="us-flag" className="absolute top-1 md:top-2 left-4 h-3/4" />
          <input
            className={`md:text-lg w-full font-shapiro45_welter_extd bg-cream border border-black border-opacity-50 focus:border-opacity-100 text-opacity-50 focus:text-opacity-100 text-black pl-16 py-2 md:py-3 ${
              (touched[name] && formikError[name]) || error
                ? 'form-control is-invalid'
                : 'form-control'
            }`}
            autoComplete="off"
            placeholder={placeholder}
            disabled={disabled}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            value={formatPhoneNumber(value)}
            type="tel"
            maxLength="17"
            onPaste={(e) => e.preventDefault() && false}
          />
        </div>
        <small
          id={`${name}-error`}
          className={`text-right mt-1 text-red-500 font-shapiro45_welter_extd ${
            isNil(formikError[name]) ? 'inactive' : 'form-text'
          }`}
        >
          {isNil(error) ? formikError[name] : error}
        </small>
      </div>
    )}
  </Field>
);

InputPhoneField.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  labelText: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  labelColor: PropTypes.string,
};

InputPhoneField.defaultProps = {
  error: null,
  labelText: null,
  placeholder: '',
  disabled: false,
  labelColor: 'text-cc-purple',
};

export default InputPhoneField;
