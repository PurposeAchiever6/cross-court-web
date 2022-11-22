import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from 'shared/components/InputCheckboxField/Checkbox';
import FormikCheckbox from 'shared/components/InputCheckboxField/FormikCheckbox';

const InputCheckboxField = ({ formik, ...props }) =>
  formik ? <FormikCheckbox {...props} /> : <Checkbox {...props} />;

InputCheckboxField.defaultProps = {
  formik: true,
};

InputCheckboxField.propTypes = {
  formik: PropTypes.bool,
};

export default InputCheckboxField;
