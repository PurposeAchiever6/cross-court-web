import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { shade } from 'polished';
import { colors } from 'shared/styles/constants';

const ButtonContainer = styled.div`
  .btn.btn-primary {
    background-color: ${colors.polarPlum};
    color: ${colors.black};
    border-color: ${colors.polarPlum};
    border-radius: 0;
    font-size: 1rem;
    font-weight: 500;
    padding: 0.75rem 6rem;
    &:hover {
      background-color: ${shade(0.5, `${colors.polarPlum}`)};
    }
  }
`;

export const Button = ({ children, disabled }) => {
  return (
    <ButtonContainer>
      <button className="btn btn-primary" type="submit" disabled={disabled}>
        {children}
      </button>
    </ButtonContainer>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default Button;
