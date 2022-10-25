import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import darkBasketballSvg from 'shared/images/svgs/dark-basketball.svg';
import whiteBasketballSvg from 'shared/images/svgs/white-basketball.svg';

const CheckboxInputContainer = styled.div`
  input[type='checkbox'] {
    -webkit-appearance: none;
    width: 1.15em;
    min-width: 1.15em;
    height: 1.15em;
    border-radius: 1px;
    border: 2px solid currentColor;
    display: grid;
    place-content: center;
    cursor: pointer;
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
      width: 1.35em;
      min-width: 1.35em;
      height: 1.35em;
      border-radius: 9999px;
      border: 1px solid currentColor;

      &::before {
        width: 0.95em;
        height: 1em;
        background-color: unset;
      }

      &:checked::before {
        animation: spin infinite 3s;
      }
    }

    label {
      margin-top: 2px;
      margin-left: 0.875rem;
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

  label {
    font-size: 0.875em;
    margin-left: 1rem;
  }
`;

const Checkbox = ({ name, value, children, error, disabled, variant, className, ...props }) => (
  <CheckboxInputContainer className={`${variant} ${className}`}>
    <div className={`flex ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <input id={name} type="checkbox" checked={value} {...props} />
      <label htmlFor={name} className="cursor-pointer select-none">
        {children}
      </label>
    </div>
    {error && <div className="block text-xs text-right text-red-500">{error}</div>}
  </CheckboxInputContainer>
);

Checkbox.defaultProps = {
  value: null,
  error: null,
  disabled: false,
  variant: '',
  className: '',
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  value: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  disabled: PropTypes.bool,
  variant: PropTypes.string,
  className: PropTypes.string,
};

export default Checkbox;
