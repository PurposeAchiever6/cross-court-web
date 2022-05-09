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
    background-color: #fbf7f3;
    font-family: shapiro45_welter_extd;
    &:focus {
      border: 1px solid rgba(0, 0, 0, 1);
      color: rgba(0, 0, 0, 1);
      box-shadow: none;
    }
    padding: 0.5rem 0.5rem;
    @media (max-width: 768px) {
      padding: 0;
    }
  }

  .select-field__indicator {
    padding: 0.3rem;
  }

  .select-field__menu {
    z-index: 1000;
    display: block;
  }
`;

const Select = ({
  label,
  labelColor,
  name,
  placeholder,
  className,
  disabled,
  options,
  onChange,
  error,
}) => (
  <SelectContainer className={className}>
    {label && (
      <Label className="mb-1" color={labelColor} htmlFor={name}>
        {label}
      </Label>
    )}
    <ReactSelect
      name={name}
      classNamePrefix="select-field"
      options={options}
      isDisabled={disabled}
      placeholder={placeholder}
      onChange={onChange}
    />
    {error && (
      <div className="block text-xs text-right text-red-500 font-shapiro45_welter_extd mt-2">
        {error}
      </div>
    )}
  </SelectContainer>
);

Select.defaultProps = {
  label: null,
  labelColor: 'black',
  name: null,
  placeholder: null,
  className: '',
  disabled: false,
  options: [],
  onChange: null,
  error: null,
};

Select.propTypes = {
  label: PropTypes.string,
  labelColor: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default Select;
