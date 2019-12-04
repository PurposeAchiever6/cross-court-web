import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { shade } from 'polished';
import colors from 'shared/styles/constants';

const StyledButton = styled.button`
  outline: none;
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

const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  className: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  className: '',
};

export default Button;
