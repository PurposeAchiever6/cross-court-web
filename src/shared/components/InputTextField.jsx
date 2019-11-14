import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import styled from 'styled-components';
import colors from 'shared/styles/constants';
import { isNil } from 'ramda';

const InputTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  label {
    font-family: 'Untitled Sans';
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 0.2em;
    color: ${colors.polarPlum};
    margin: 0 0 0.75rem;
    text-transform: uppercase;
    font-weight: bold;
  }
  small {
    color: red;
    text-transform: capitalize;
  }
  input {
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0;
    padding: 1.5rem 0.5rem;
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
}) {
  return (
    <Field name={name}>
      {({ field, form: { touched, errors: formikError } }) => {
        return (
          <InputTextContainer>
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
  labelText: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  showLabel: PropTypes.bool,
  displayErrorMsg: PropTypes.bool,
};

export default InputTextField;
