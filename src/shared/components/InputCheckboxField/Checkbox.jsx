import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
      transform: scale(0);
      transition: 120ms transform ease-in-out;
      box-shadow: inset 1em 1em currentColor;
    }

    &:checked::before {
      transform: scale(1);
    }
  }

  label {
    font-size: 0.875em;
  }
`;

const Checkbox = ({ name, value, children, error, className, ...props }) => (
  <CheckboxInputContainer className={className}>
    <div className="flex">
      <input id={name} type="checkbox" checked={value} {...props} />
      <label htmlFor={name} className="cursor-pointer ml-4 select-none">
        {children}
      </label>
    </div>
    {error && <div className="block text-xs text-right text-red-500">{error}</div>}
  </CheckboxInputContainer>
);

Checkbox.defaultProps = {
  value: null,
  error: null,
  className: '',
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  value: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  className: PropTypes.string,
};

export default Checkbox;
