import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';

import Radio from './Radio';

const FormikRadio = ({ name, value, error, ...props }) => (
  <Field name={name} value={value} type="radio">
    {({ field, form: { touched, errors: formikErrors } }) => (
      <Radio
        {...props}
        {...field}
        error={error || (touched[field.name] && formikErrors[field.name])}
      />
    )}
  </Field>
);

FormikRadio.defaultProps = {
  value: null,
  error: null,
};

FormikRadio.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default FormikRadio;
