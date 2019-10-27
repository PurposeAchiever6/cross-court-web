import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { shade } from 'polished';
import { colors } from 'shared/styles/constants';

const ButtonContainer = styled.button`
  background-color: ${colors.polarPlum} !important;
  color: #000 !important;
  border-color: ${colors.polarPlum} !important;
  border-radius: 0 !important;
  font-size: 1rem;
  font-weight: 500 !important;
  padding: 0.75rem 6rem !important;
  &:hover {
    background-color: ${shade(0.5, `${colors.polarPlum}`)} !important;
  }
`;

export const Button = ({ children, disabled, type }) => {
  return (
    <ButtonContainer className="btn btn-primary" type={type} disabled={disabled}>
      {children}
    </ButtonContainer>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};

export default Button;
