import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import styled from 'styled-components';
import { isNil, head } from 'ramda';
import colors from 'shared/styles/constants';

const InputCheckboxContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2rem;

  .checkbox-container {
    display: flex;
    flex: 1;
    height: 100%;
    justify-content: flex-start;
    align-items: center;

    label {
      font-size: 0.8rem;
      font-weight: 500;
    }

    input {
      margin-left: 0;
    }
    .text-container {
      padding-left: 0.5rem;
    }
  }

  small {
    text-align: right;
    color: ${colors.errorRed};
    text-transform: initial;
  }
`;
export default function InputCheckbox({ error, name, labelText, disabled = false, children }) {
  console.log(error);
  return (
    <Field name={name}>
      {({ field, form: { touched, errors: formikError } }) => (
        <InputCheckboxContainer>
          <div className="checkbox-container">
            {labelText && (
              <label className="form-check-label" htmlFor={field.name}>
                {labelText}
              </label>
            )}
            <input
              type="checkbox"
              className={
                (touched[field.name] && formikError[field.name]) || error ? 'is-invalid' : ''
              }
              checked={field.value}
              disabled={disabled}
              {...field}
            />
            <div className="text-container">{children}</div>
          </div>
          <small id={`${field.name}-error`} className="form-text">
            {isNil(error) ? formikError[field.name] : head(error)}
          </small>
        </InputCheckboxContainer>
      )}
    </Field>
  );
}
InputCheckbox.propTypes = {
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};
