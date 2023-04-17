import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { isNil } from 'ramda';

import Button from 'shared/components/Button';
import { fileToBase64 } from 'shared/utils/attachments';

const InputFileField = ({
  name,
  error,
  label,
  placeholder,
  disabled,
  displayErrorMsg,
  setFieldValue,
  accept,
  buttonProps,
  ...props
}) => {
  const hiddenFileInput = useRef(null);
  const [fileName, setFileName] = useState(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = async (event) => {
    const uploadedFile = event.currentTarget.files[0];
    setFileName(uploadedFile.name);
    const base64File = await fileToBase64(uploadedFile);
    setFieldValue('image', base64File);
  };

  return (
    <Field name={name}>
      {({ field, form: { errors: formikError } }) => (
        <div className="flex flex-col max-w-sm" {...props}>
          {label && (
            <label className="text-base mb-3 uppercase font-bold" htmlFor={field.name}>
              {label}
            </label>
          )}
          <Button size="sm" className="w-min" onClick={handleClick} {...buttonProps}>
            Upload
          </Button>
          {fileName && <span className="text-sm mt-2 truncate">{fileName}</span>}
          <input
            className="hidden"
            ref={hiddenFileInput}
            onChange={handleChange}
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
      )}
    </Field>
  );
};

InputFileField.defaultProps = {
  placeholder: '',
  disabled: false,
  displayErrorMsg: true,
  accept: '',
  label: '',
  buttonProps: {},
};

InputFileField.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  displayErrorMsg: PropTypes.bool,
  accept: PropTypes.string,
  buttonProps: PropTypes.shape(),
};

export default InputFileField;
