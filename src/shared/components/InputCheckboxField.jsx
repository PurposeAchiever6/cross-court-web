import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

const InputCheckboxField = ({ name, children, error, disabled, className }) => (
  <Field name={name}>
    {({ field, form: { touched, errors: formikError } }) => (
      <div className={className}>
        <div className="flex">
          <input
            id={field.name}
            type="checkbox"
            className="cursor-pointer mt-1"
            checked={field.value}
            disabled={disabled}
            {...field}
          />
          <label htmlFor={field.name} className="cursor-pointer ml-4 text-sm">
            {children}
          </label>
        </div>
        {(error || (touched[field.name] && formikError[field.name])) && (
          <small className="block text-red-500 text-right mt-1">
            {error || formikError[field.name]}
          </small>
        )}
      </div>
    )}
  </Field>
);

InputCheckboxField.defaultProps = {
  error: null,
  disabled: false,
  className: '',
};

InputCheckboxField.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default InputCheckboxField;
