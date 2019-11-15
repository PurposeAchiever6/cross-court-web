import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { shade } from 'polished';
import colors from 'shared/styles/constants';

const ButtonComponent = styled.button`
  background-color: ${colors.polarPlum};
  color: ${colors.white};
  border-color: ${colors.polarPlum};
  border: 0;
  border-radius: 0;
  font-size: 1rem;
  font-weight: 500;
  padding: 1rem 3rem;
  &:hover {
    background-color: ${shade(0.5, `${colors.polarPlum}`)};
  }
`;

export const Button = ({ children, disabled, type = 'button' }) => {
  return (
    <ButtonComponent type={type} disabled={disabled}>
      {children}
    </ButtonComponent>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default Button;
