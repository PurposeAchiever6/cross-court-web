import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import styled from 'styled-components';
import Label from 'shared/components/Label';

const SelectContainer = styled.div`
  .select-field__control {
    border: 1px solid rgba(0, 0, 0, 0.5);
    color: rgba(0, 0, 0, 0.5);
    border-radius: 0;
    font-family: shapiro45_welter_extd;
    background-color: #fbf7f3;
    padding: 0.5rem 0.5rem;

    &--is-focused {
      box-shadow: none;
      border-color: rgba(0, 0, 0, 1) !important;

      .select-field__single-value {
        color: rgba(0, 0, 0, 1);
      }
    }

    &:hover {
      border-color: unset;
    }

    @media (max-width: 768px) {
      padding: 0 0.5rem;
    }
  }

  .select-field__value-container {
    padding-left: 0;
  }

  .select-field__single-value {
    color: rgba(0, 0, 0, 0.5);
  }

  .select-field__indicator {
    padding: 0.3rem;
  }

  .select-field__menu {
    z-index: 1000;
    display: block;
    font-family: shapiro45_welter_extd;
  }
`;

const Select = ({
  name,
  value,
  options,
  label,
  labelColor,
  error,
  hint,
  disabled,
  placeholder,
  className,
  ...props
}) => (
  <SelectContainer className={className}>
    <div className={disabled ? 'opacity-50 pointer-events-none' : ''}>
      {label && (
        <Label className="mb-1 uppercase text-sm md:text-base" color={labelColor} htmlFor={name}>
          {label}
        </Label>
      )}
      <ReactSelect
        name={name}
        classNamePrefix="select-field"
        isDisabled={disabled}
        placeholder={placeholder}
        value={options.find((option) => option.value === value)}
        options={options}
        {...props}
      />
      {hint && (
        <div
          className={`font-shapiro45_welter_extd text-xs text-right mt-2 ${
            error ? 'text-red-500' : 'text-current opacity-70'
          }`}
        >
          {hint}
        </div>
      )}
      {error && !hint && (
        <div className="font-shapiro45_welter_extd text-xs text-right text-red-500 mt-2">
          {error}
        </div>
      )}
    </div>
  </SelectContainer>
);

Select.defaultProps = {
  label: null,
  value: null,
  options: [],
  labelColor: null,
  error: null,
  hint: null,
  disabled: false,
  placeholder: '',
  className: '',
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.array,
  label: PropTypes.string,
  labelColor: PropTypes.string,
  error: PropTypes.string,
  hint: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default Select;
