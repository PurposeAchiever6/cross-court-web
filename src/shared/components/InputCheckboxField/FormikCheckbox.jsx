import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';

import Checkbox from './Checkbox';

const FormikCheckbox = ({ name, value, error, isGroup, ...props }) => (
  <Field name={name} value={isGroup ? value : undefined} type="checkbox">
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
  value: null,
  error: null,
  isGroup: false,
};

FormikCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  error: PropTypes.string,
  isGroup: PropTypes.bool,
};

export default FormikCheckbox;
