import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import styled from 'styled-components';
import colors from 'shared/styles/constants';
import { isNil } from 'ramda';

const InputTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;

  label {
    font-family: shapiro95_super_wide;
    font-size: 1rem;
    line-height: 1.5rem;
    color: ${(props) => props.labelColor};
    margin: 0 0 0.5rem;
    text-transform: uppercase;
    font-weight: bold;
    font-weight: 400;
  }
  small {
    text-align: right;
    margin-top: 0.5rem;
    color: ${colors.errorRed};
    text-transform: initial;
    font-family: shapiro45_welter_extd;
  }
  input {
    border: 1px solid rgba(0, 0, 0, 0.5);
    color: rgba(0, 0, 0, 0.5);
    border-radius: 0;
    font-size: 1.2rem;
    padding: 1rem 0.5rem;
    background-color: #fbf7f3;
    font-family: shapiro45_welter_extd;
    &:focus {
      border: 1px solid rgba(0, 0, 0, 1);
      color: rgba(0, 0, 0, 1);
      box-shadow: none;
    }
  }
`;

function InputTextField({
  name,
  error,
  type = 'text',
  labelText,
  placeholder = '',
  disabled = false,
  showLabel = true,
  displayErrorMsg = true,
  labelColor = '#9999FF',
  ...props
}) {
  return (
    <Field name={name}>
      {({ field, form: { touched, errors: formikError } }) => {
        return (
          <InputTextContainer labelColor={labelColor} {...props}>
            {showLabel && <label htmlFor={field.name}>{labelText}</label>}
            <input
              className={
                (touched[field.name] && formikError[field.name]) || error
                  ? 'form-control is-invalid'
                  : 'form-control'
              }
              autoComplete="off"
              placeholder={placeholder}
              disabled={disabled}
              {...field}
              type={type}
            />
            {displayErrorMsg && (
              <small
                id={`${field.name}-error`}
                className={isNil(formikError[field.name]) ? 'inactive' : 'form-text'}
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
  type: PropTypes.string,
  labelText: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  showLabel: PropTypes.bool,
  displayErrorMsg: PropTypes.bool,
  labelColor: PropTypes.string,
};

export default InputTextField;
