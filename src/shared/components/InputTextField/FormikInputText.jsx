import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';

import InputText from './InputText';

const FormikInputText = ({ name, error, ...props }) => (
  <Field name={name}>
    {({ field, form: { touched, errors: formikErrors } }) => (
      <InputText
        {...props}
        {...field}
        error={error || (touched[field.name] && formikErrors[field.name])}
      />
    )}
  </Field>
);

FormikInputText.defaultProps = {
  error: null,
};

FormikInputText.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default FormikInputText;
