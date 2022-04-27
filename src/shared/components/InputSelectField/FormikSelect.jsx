import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import Select from './Select';

const FormikSelect = ({ name, error, ...props }) => (
  <Field name={name}>
    {({ field, form: { setFieldValue, errors: formikError } }) => (
      <Select
        {...props}
        onChange={({ value }) => setFieldValue(field.name, value)}
        error={error || formikError[field.name]}
      />
    )}
  </Field>
);

FormikSelect.defaultProps = {
  error: null,
};

FormikSelect.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default FormikSelect;
