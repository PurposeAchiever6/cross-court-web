import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';

import Select from './Select';

const FormikSelect = ({ name, error, ...props }) => (
  <Field name={name}>
    {({ field, form: { setFieldValue, errors: formikErrors } }) => (
      <Select
        {...props}
        name={name}
        onChange={({ value }) => setFieldValue(field.name, value)}
        error={error || formikErrors[field.name]}
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
