/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import darkBasketballSvg from 'shared/images/svgs/dark-basketball.svg';
import whiteBasketballSvg from 'shared/images/svgs/white-basketball.svg';

const RadioInputContainer = styled.div`
  input[type='radio'] {
    -webkit-appearance: none;
    width: 1.2em;
    min-width: 1.2em;
    height: 1.2em;
    border-radius: 100%;
    border: 2px solid currentColor;
    display: grid;
    place-content: center;
    cursor: pointer;
    margin-right: 0.6rem;

    &::before {
      content: '';
      width: 0.65em;
      height: 0.65em;
      background-color: currentColor;
      opacity: 0;
      transition: 120ms opacity ease-in-out;
      border-radius: 100%;
    }

    &:checked::before {
      opacity: 100;
    }
  }

  &.cc-ball,
  &.cc-ball-white {
    input[type='radio'] {
      width: 1.5em;
      min-width: 1.5em;
      height: 1.5em;
      border-radius: 9999px;
      border: 1px solid currentColor;
      margin-right: 0.6rem;

      &::before {
        width: 1.2em;
        height: 1.2em;
        background-color: unset;
      }

      &:checked::before {
        animation: spin infinite 3s;
      }
    }
  }

  &.cc-ball {
    input[type='radio'] {
      &::before {
        content: url(${darkBasketballSvg});
      }
    }
  }

  &.cc-ball-white {
    input[type='radio'] {
      &::before {
        content: url(${whiteBasketballSvg});
      }
    }
  }
`;

const Radio = ({ name, value, children, error, disabled, variant, className, ...props }) => (
  <RadioInputContainer className={`${variant} ${className}`}>
    <label
      className={`text-sm flex cursor-pointer select-none ${
        disabled ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      <input type="radio" name={name} value={value} {...props} />
      {children}
    </label>
    {error && <div className="block text-xs text-right text-red-500">{error}</div>}
  </RadioInputContainer>
);

Radio.defaultProps = {
  value: '',
  error: null,
  disabled: false,
  variant: '',
  className: '',
};

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  children: PropTypes.node.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  disabled: PropTypes.bool,
  variant: PropTypes.string,
  className: PropTypes.string,
};

export default Radio;
