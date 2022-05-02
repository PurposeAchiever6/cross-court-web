import React from 'react';
import PropTypes from 'prop-types';

import Select from 'shared/components/InputSelectField/Select';
import FormikSelect from 'shared/components/InputSelectField/FormikSelect';

const InputSelectField = ({ formik, ...props }) =>
  formik ? <FormikSelect {...props} /> : <Select {...props} />;

InputSelectField.defaultProps = {
  formik: false,
};

InputSelectField.propTypes = {
  formik: PropTypes.bool,
};

export default InputSelectField;
