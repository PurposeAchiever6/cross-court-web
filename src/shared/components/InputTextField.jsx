import React from 'react';
import PropTypes from 'prop-types';

import InputText from 'shared/components/InputTextField/InputText';
import FormikInputText from 'shared/components/InputTextField/FormikInputText';

const InputTextField = ({ formik, ...props }) =>
  formik ? <FormikInputText {...props} /> : <InputText {...props} />;

InputTextField.defaultProps = {
  formik: true,
};

InputTextField.propTypes = {
  formik: PropTypes.bool,
};

export default InputTextField;
