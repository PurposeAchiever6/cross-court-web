import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { isNil } from 'ramda';
import colors from 'shared/styles/constants';
import UsFlag from 'shared/images/us-flag.png';
import { formatPhoneNumber } from 'shared/utils/helpers';

const InputTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;

  label {
    font-size: 0.75rem;
    line-height: 1rem;
    color: #9999ff;
    margin: 0 0 0.75rem;
    text-transform: uppercase;
    font-weight: bold;
  }
  small {
    text-align: right;
    margin-top: 1rem;
    color: ${colors.errorRed};
    text-transform: initial;
  }
  input {
    border: 1px solid rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    color: rgba(0, 0, 0, 0.5);
    border-radius: 0;
    font-size: 1.2rem;
    padding: 1rem 1rem 1rem 4rem;
    width: 100%;
    &:focus {
      border: 1px solid rgba(0, 0, 0, 1);
      color: rgba(0, 0, 0, 1);
      box-shadow: none;
    }
  }

  .input-box {
    position: relative;

    img {
      position: absolute;
      left: 34px;
      top: 50%;
      height: 70%;
      transform: translate(-50%, -50%);
      bottom: 50%;
    }
  }
`;

const InputTextField = ({
  name,
  error,
  labelText,
  placeholder = '',
  disabled = false,
  showLabel = true,
  displayErrorMsg = true,
  ...props
}) => (
  <Field name={name}>
    {({ field: { name, value, onChange, onBlur }, form: { touched, errors: formikError } }) => (
      <InputTextContainer {...props}>
        {showLabel && <label htmlFor={name}>{labelText}</label>}
        <div className="input-box">
          <img src={UsFlag} alt="us-flag" />
          <input
            className={
              (touched[name] && formikError[name]) || error
                ? 'form-control is-invalid'
                : 'form-control'
            }
            autoComplete="off"
            placeholder={placeholder}
            disabled={disabled}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            value={formatPhoneNumber(value)}
            type="tel"
            maxLength="17"
            onPaste={e => e.preventDefault() && false}
          />
        </div>
        {displayErrorMsg && (
          <small
            id={`${name}-error`}
            className={isNil(formikError[name]) ? 'inactive' : 'form-text'}
          >
            {isNil(error) ? formikError[name] : error}
          </small>
        )}
      </InputTextContainer>
    )}
  </Field>
);

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
