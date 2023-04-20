import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import styled from 'styled-components';
import Label from 'shared/components/Label';
import { hexToRgb } from 'shared/utils/colors';
import theme from '~/tailwind.theme';

const menuDarkStyles = (dark) => {
  if (dark) {
    return `
      background-color: ${theme.colors['cc-blue']['500']};
      color: ${hexToRgb(theme.colors.cream, '0.7')}; // text-cream/70
      .select-field__menu-list {
        .select-field__option {
          &--is-focused {
            background-color: ${theme.colors.cream};
            color: ${hexToRgb(theme.colors['cc-black'], '0.7')}; // text-cc-black/70
          }

          &--is-selected {
            background-color: ${theme.colors.cream};
            color: ${hexToRgb(theme.colors['cc-black'], '0.7')}; // text-cc-black/70
          }
        }
      }
    `;
  }

  return `
    background-color: ${theme.colors.cream};
    color: ${hexToRgb(theme.colors['cc-black'], '0.7')}; // text-cc-black/70
  `;
};

const darkStyles = (dark) => {
  if (dark) {
    return `
      background-color: ${theme.colors['cc-blue']['500']};
      border-width: 1px; // border
      border-color: ${theme.colors['cc-blue']['500']};
      &:hover {
        border-color: ${theme.colors['cc-blue']['500']};
      }

      &--is-focused {
        box-shadow: none;
        border-color: ${hexToRgb(theme.colors.cream, '0.1')} !important; // focus:border-cream/10
      }

      .select-field__single-value {
        color: ${hexToRgb(theme.colors.cream, '0.7')}; // text-cream/70
      }
    `;
  }

  return `
    background-color: ${theme.colors.cream};
    border-width: 1px; // border
    border-color: ${hexToRgb(theme.colors['cc-black'], '0.5')}; // border-cc-black/50
    &:hover {
      border-color: ${hexToRgb(theme.colors['cc-black'], '0.5')}; // border-cc-black/50
    }

    &--is-focused {
      box-shadow: none;
      border-color: ${theme.colors['cc-black']} !important;
    }

    .select-field__single-value {
      color: ${hexToRgb(theme.colors['cc-black'], '0.7')}; // text-cc-black/70
    }
  `;
};

const inputClasses = (variant) => {
  switch (variant) {
    case 'shrink':
      return `
        padding-left: 0.5rem; // px-2
        padding-right: 0.5rem;
        padding-top: 0.25rem; //py-1
        padding-bottom: 0.25rem;
      `;
    case 'expanded':
      return `
        padding-left: 1rem; // px-4
        padding-right: 1rem;
        padding-top: 1.25rem; // py-5
        padding-bottom: 1.25rem;
      `;
    case 'normal':
    default:
      return `
        padding-left: 0.5rem; // px-2
        padding-right: 0.5rem;
        padding-top: 0.5rem; //py-2
        padding-bottom: 0.5rem;
        @media (min-width: 768px) {
          padding-top: 0.75rem; // md:py-3
          padding-bottom: 0.75rem;
        }
      `;
  }
};

const SelectContainer = styled.div`
  .select-field__control {
    border-radius: 0;
    ${(props) => darkStyles(props.dark)}
    ${(props) => inputClasses(props.variant)}
  }

  .select-field__indicator-separator {
    display: none;
  }

  .select-field__value-container {
    padding: 0;
    margin-top: -0.25rem;
    margin-bottom: -0.25rem;
  }

  .select-field__indicator {
    padding: 0;
    padding-left: 0.3rem;
    margin-top: -0.25rem;
    margin-bottom: -0.25rem;
  }

  .select-field__menu {
    border-radius: 0;
    z-index: 1000;
    display: block;
    font-family: shapiro45_welter_extd;
    ${(props) => menuDarkStyles(props.dark)}
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
  dark,
  variant,
  ...props
}) => (
  <SelectContainer className={className} dark={dark} variant={variant}>
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
  dark: false,
  variant: 'normal',
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(PropTypes.shape()),
  label: PropTypes.string,
  labelColor: PropTypes.string,
  error: PropTypes.string,
  hint: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  dark: PropTypes.bool,
  variant: PropTypes.oneOf(['normal', 'shrink', 'expanded']),
};

export default Select;
