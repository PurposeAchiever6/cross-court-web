import React, { useRef, useState, useEffect } from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';

import { fileToBase64 } from 'shared/utils/attachments';
import Label from 'shared/components/Label';
import Button from 'shared/components/Button';

const InputFileField = ({
  name,
  accept,
  label,
  labelColor,
  variant,
  disabled,
  error,
  showError,
  setPreview,
  className,
}) => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);

  const handleClick = () => {
    if (disabled) {
      return;
    }

    fileInputRef.current.click();
  };

  const handleChange = async (event, setFieldValue) => {
    if (disabled) {
      return;
    }

    const uploadedFile = event.currentTarget.files[0];
    setFile(uploadedFile);
    const base64File = await fileToBase64(uploadedFile);
    setFieldValue(name, base64File);

    if (setPreview) {
      setPreview(URL.createObjectURL(uploadedFile));
    }
  };

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      if (setPreview) {
        URL.revokeObjectURL(file);
      }
    };
  }, []);

  return (
    <Field name={name}>
      {({ field, form: { setFieldValue, errors: formikErrors } }) => (
        <div className={className}>
          {label && (
            <Label forInput htmlFor={name} color={labelColor}>
              {label}
            </Label>
          )}
          <Button variant={variant} size="sm" onClick={handleClick} disabled={disabled}>
            Upload
          </Button>
          {file && (
            <div className="text-xs mt-2 truncate w-28" title={file.name}>
              {file.name}
            </div>
          )}
          <input
            className="hidden"
            ref={fileInputRef}
            onChange={(e) => handleChange(e, setFieldValue)}
            type="file"
            autoComplete="off"
            accept={accept}
          />
          {showError && (error || formikErrors[field.name]) && (
            <div className="font-shapiro45_welter_extd text-xs text-right text-red-500 mt-2">
              {error || formikErrors[field.name]}
            </div>
          )}
        </div>
      )}
    </Field>
  );
};

InputFileField.defaultProps = {
  accept: '',
  label: null,
  labelColor: null,
  variant: 'purple',
  disabled: false,
  error: null,
  showError: true,
  setPreview: null,
  className: '',
};

InputFileField.propTypes = {
  name: PropTypes.string.isRequired,
  accept: PropTypes.string,
  label: PropTypes.string,
  labelColor: PropTypes.string,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  showError: PropTypes.bool,
  setPreview: PropTypes.func,
  className: PropTypes.string,
};

export default InputFileField;
