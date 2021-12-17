import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Field } from 'formik';
import styled from 'styled-components';
import colors from 'shared/styles/constants';

const InputSelectContainer = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 1rem;
    line-height: 1.5rem;
    color: ${(props) => props.labelColor};
    margin: 0 0 0.75rem;
    text-transform: uppercase;
    font-weight: bold;
    font-weight: 400;
  }

  small {
    text-align: right;
    margin-top: 1rem;
    color: ${colors.errorRed};
    text-transform: initial;
    font-family: shapiro45_welter_extd;
  }

  .select-field__control {
    border: 1px solid rgba(0, 0, 0, 0.5);
    color: rgba(0, 0, 0, 0.5);
    border-radius: 0;
    padding: 0.5rem 0.5rem;
    background-color: #fbf7f3;
    font-family: shapiro45_welter_extd;
    &:focus {
      border: 1px solid rgba(0, 0, 0, 1);
      color: rgba(0, 0, 0, 1);
      box-shadow: none;
    }
  }

  .select-field__indicator {
    padding: 0.3rem;
  }
`;

const InputSelectField = ({
  name,
  error,
  labelText,
  placeholder,
  disabled,
  showLabel,
  displayErrorMsg,
  labelColor,
  options,
  className,
}) => (
  <Field name={name}>
    {({ field, form: { setFieldValue, touched, errors: formikError } }) => (
      <InputSelectContainer labelColor={labelColor} className={className}>
        {showLabel && <label htmlFor={field.name}>{labelText}</label>}
        <Select
          name={field.name}
          classNamePrefix="select-field"
          options={options}
          isDisabled={disabled}
          placeholder={placeholder}
          onChange={({ value }) => setFieldValue(field.name, value)}
        />
        {displayErrorMsg && (
          <small
            id={`${field.name}-error`}
            className={formikError[field.name] ? 'form-text' : 'inactive'}
          >
            {error || formikError[field.name]}
          </small>
        )}
      </InputSelectContainer>
    )}
  </Field>
);

InputSelectField.defaultProps = {
  error: null,
  labelText: null,
  placeholder: null,
  disabled: false,
  showLabel: true,
  displayErrorMsg: true,
  labelColor: '#9999FF',
  className: '',
};

InputSelectField.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  error: PropTypes.string,
  labelText: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  showLabel: PropTypes.bool,
  displayErrorMsg: PropTypes.bool,
  labelColor: PropTypes.string,
  className: PropTypes.string,
};

export default InputSelectField;
