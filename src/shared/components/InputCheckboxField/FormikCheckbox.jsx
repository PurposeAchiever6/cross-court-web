import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';

import Checkbox from './Checkbox';

const FormikCheckbox = ({ name, error, ...props }) => (
  <Field name={name}>
    {({ field, form: { touched, errors: formikErrors } }) => (
      <Checkbox
        {...props}
        {...field}
        error={error || (touched[field.name] && formikErrors[field.name])}
      />
    )}
  </Field>
);

FormikCheckbox.defaultProps = {
  error: null,
};

FormikCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default FormikCheckbox;
