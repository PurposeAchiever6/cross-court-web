import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import styled from 'styled-components';
import { isNil } from 'ramda';
import Label from 'shared/components/Label';

const InputTextContainer = styled.div`
  input {
    padding-left: ${(props) => (props.leftIconWidth ? `${props.leftIconWidth}px` : '0.5rem')};
    padding-right: ${(props) => (props.rightIconWidth ? `${props.rightIconWidth}px` : '0.5rem')};
  }
`;

function InputTextField({
  name,
  error,
  icon,
  leftIcon,
  rightIcon,
  type,
  labelText,
  placeholder,
  disabled,
  displayErrorMsg,
  labelColor,
  ...props
}) {
  const [leftIconWidth, setLeftIconWidth] = useState(null);
  const [rightIconWidth, setRightIconWidth] = useState(null);

  useEffect(() => {
    const leftIconWidth = document.getElementById('left-icon')?.offsetWidth;
    const rightIconWidth = document.getElementById('right-icon')?.offsetWidth;

    setLeftIconWidth(leftIconWidth + 30);
    setRightIconWidth(rightIconWidth + 30);
  }, []);

  return (
    <Field name={name}>
      {({ field, form: { touched, errors: formikError } }) => {
        return (
          <InputTextContainer
            className="flex flex-col mb-4"
            leftIconWidth={leftIconWidth}
            rightIconWidth={rightIconWidth}
            {...props}
          >
            {labelText && (
              <Label className="mb-1 uppercase" htmlFor={name}>
                {labelText}
              </Label>
            )}
            <div className="relative">
              {leftIcon && (
                <div
                  id="left-icon"
                  className="absolute -translate-y-1/2 -translate-x-1/2 top-1/3 left-4"
                >
                  {icon}
                </div>
              )}
              <input
                className={`md:text-lg w-full font-shapiro45_welter_extd bg-cream border border-black border-opacity-50 focus:border-opacity-100 text-opacity-50 focus:text-opacity-100 text-black py-2 md:py-3 ${
                  (touched[field.name] && formikError[field.name]) || error
                    ? 'form-control is-invalid'
                    : 'form-control'
                }`}
                autoComplete="off"
                placeholder={placeholder}
                disabled={disabled}
                {...field}
                type={type}
              />
              {rightIcon && (
                <div
                  id="right-icon"
                  className="absolute -translate-y-1/2 -translate-x-1/2 top-1/3 right-4"
                >
                  {icon}
                </div>
              )}
            </div>
            {displayErrorMsg && (
              <small
                id={`${field.name}-error`}
                className={`text-right mt-1 text-red-500 font-shapiro45_welter_extd ${
                  isNil(formikError[field.name]) ? 'inactive' : 'form-text'
                }`}
              >
                {isNil(error) ? formikError[field.name] : error}
              </small>
            )}
          </InputTextContainer>
        );
      }}
    </Field>
  );
}

InputTextField.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  icon: PropTypes.shape(),
  leftIcon: PropTypes.bool,
  rightIcon: PropTypes.bool,
  type: PropTypes.string,
  labelText: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  displayErrorMsg: PropTypes.bool,
  labelColor: PropTypes.string,
};

InputTextField.defaultProps = {
  error: null,
  icon: null,
  leftIcon: false,
  rightIcon: false,
  type: 'text',
  labelText: null,
  placeholder: '',
  disabled: false,
  displayErrorMsg: true,
  labelColor: 'text-cc-purple',
};

export default InputTextField;
