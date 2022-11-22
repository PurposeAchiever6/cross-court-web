import React from 'react';
import PropTypes from 'prop-types';

import Radio from 'shared/components/InputRadioField/Radio';
import FormikRadio from 'shared/components/InputRadioField/FormikRadio';

const InputCheckboxField = ({ formik, ...props }) =>
  formik ? <FormikRadio {...props} /> : <Radio {...props} />;

InputCheckboxField.defaultProps = {
  formik: true,
};

InputCheckboxField.propTypes = {
  formik: PropTypes.bool,
};

export default InputCheckboxField;
