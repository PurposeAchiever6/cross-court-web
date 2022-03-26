import React from 'react';
import PropTypes from 'prop-types';

import { Field } from 'formik';
import Textarea from './Textarea';

const FormikTextarea = ({ name, error, ...props }) => (
  <Field name={name}>
    {({ field, form: { touched, errors: formikErrors } }) => (
      <Textarea
        {...props}
        {...field}
        error={error || (touched[field.name] && formikErrors[field.name])}
      />
    )}
  </Field>
);

FormikTextarea.defaultProps = {
  error: null,
};

FormikTextarea.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default FormikTextarea;
