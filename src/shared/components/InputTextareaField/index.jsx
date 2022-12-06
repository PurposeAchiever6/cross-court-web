import React from 'react';
import PropTypes from 'prop-types';

import Textarea from 'shared/components/InputTextareaField/Textarea';
import FormikTextarea from 'shared/components/InputTextareaField/FormikTextarea';

const InputTextareaField = ({ formik, ...props }) =>
  formik ? <FormikTextarea {...props} /> : <Textarea {...props} />;

InputTextareaField.defaultProps = {
  formik: true,
};

InputTextareaField.propTypes = {
  formik: PropTypes.bool,
};

export default InputTextareaField;
