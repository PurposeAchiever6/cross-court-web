import React from 'react';
import PropTypes from 'prop-types';

import Radio from 'shared/components/InputRadioField/Radio';
import FormikRadio from 'shared/components/InputRadioField/FormikRadio';

const InputRadioField = ({ formik, ...props }) =>
  formik ? <FormikRadio {...props} /> : <Radio {...props} />;

InputRadioField.defaultProps = {
  formik: true,
};

InputRadioField.propTypes = {
  formik: PropTypes.bool,
};

export default InputRadioField;
