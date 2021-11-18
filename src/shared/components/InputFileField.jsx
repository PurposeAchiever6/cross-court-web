import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { isNil } from 'ramda';

import { fileToBase64 } from 'shared/utils/attachments';

const InputFileField = ({
  name,
  error,
  labelText,
  placeholder,
  disabled,
  showLabel,
  displayErrorMsg,
  setFieldValue,
  accept,
  ...props
}) => {
  return (
    <Field name={name}>
      {({ field, form: { errors: formikError } }) => {
        return (
          <div className="flex flex-col mb-6" {...props}>
            {showLabel && (
              <label className="text-base mb-3 uppercase font-bold" htmlFor={field.name}>
                {labelText}
              </label>
            )}
            <input
              onChange={async (event) => {
                const file = await fileToBase64(event.currentTarget.files[0]);
                setFieldValue('image', file);
              }}
              type="file"
              autoComplete="off"
              accept={accept}
            />
            {displayErrorMsg && (
              <small
                id={`${field.name}-error`}
                className={`text-right mt-4 text-red-500 font-shapiro45_welter_extd ${
                  isNil(formikError[field.name]) ? 'inactive' : 'form-text'
                }`}
              >
                {isNil(error) ? formikError[field.name] : error}
              </small>
            )}
          </div>
        );
      }}
    </Field>
  );
};

InputFileField.defaultProps = {
  placeholder: '',
  disabled: false,
  showLabel: true,
  displayErrorMsg: true,
  accept: '',
};

InputFileField.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  showLabel: PropTypes.bool,
  displayErrorMsg: PropTypes.bool,
};

export default InputFileField;
