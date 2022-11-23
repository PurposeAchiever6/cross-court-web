/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import darkBasketballSvg from 'shared/images/svgs/dark-basketball.svg';
import whiteBasketballSvg from 'shared/images/svgs/white-basketball.svg';

const CheckboxInputContainer = styled.div`
  input[type='checkbox'] {
    -webkit-appearance: none;
    width: 1.2em;
    min-width: 1.2em;
    height: 1.2em;
    border-radius: 1px;
    border: 2px solid currentColor;
    display: grid;
    place-content: center;
    cursor: pointer;
    margin-right: 0.6rem;
    margin-top: 2px;

    &::before {
      content: '';
      width: 0.65em;
      height: 0.65em;
      background-color: currentColor;
      opacity: 0;
      transition: 120ms opacity ease-in-out;
    }

    &:checked::before {
      opacity: 100;
    }
  }

  &.cc-ball,
  &.cc-ball-white {
    input[type='checkbox'] {
      width: 1.6em;
      min-width: 1.6em;
      height: 1.6em;
      border-radius: 9999px;
      border: 1px solid currentColor;
      margin-right: 0.6rem;

      &::before {
        width: 1.075em;
        height: 1.075em;
        background-color: unset;
      }

      &:checked::before {
        animation: spin infinite 4s;
      }
    }

    span {
      margin-top: 4px;
    }
  }

  &.cc-ball {
    input[type='checkbox'] {
      &::before {
        content: url(${darkBasketballSvg});
      }
    }
  }

  &.cc-ball-white {
    input[type='checkbox'] {
      &::before {
        content: url(${whiteBasketballSvg});
      }
    }
  }
`;

const Checkbox = ({
  name,
  value,
  children,
  error,
  disabled,
  variant,
  className,
  hideError,
  ...props
}) => (
  <CheckboxInputContainer className={`${variant} ${className}`}>
    <label
      className={`text-sm flex cursor-pointer select-none ${
        disabled ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      <input type="checkbox" name={name} value={value} {...props} />
      <span>{children}</span>
    </label>
    {!hideError && error && <div className="block text-xs text-right text-red-500">{error}</div>}
  </CheckboxInputContainer>
);

Checkbox.defaultProps = {
  value: '',
  error: null,
  disabled: false,
  variant: '',
  className: '',
  hideError: false,
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  children: PropTypes.node.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  disabled: PropTypes.bool,
  variant: PropTypes.string,
  className: PropTypes.string,
  hideError: PropTypes.bool,
};

export default Checkbox;
