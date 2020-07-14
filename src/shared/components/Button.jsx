import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { shade } from 'polished';
import colors from 'shared/styles/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const StyledButton = styled.button`
  outline: none;
  background-color: ${props => (props.disabled ? 'grey' : colors.polarPlum)};
  color: ${colors.white};
  border-color: ${colors.polarPlum};
  border: 0;
  border-radius: 0;
  font-size: 1rem;
  font-weight: 500;
  padding: 1rem 3rem;
  cursor: pointer;
  touch-action: manipulation;
  &:hover {
    background-color: ${shade(0.5, `${colors.polarPlum}`)};
  }
  .spinner {
    animation: spin 2s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Button = ({ children, loading, ...props }) => {
  return (
    <StyledButton {...props} aria-label={children}>
      {loading ? <FontAwesomeIcon className="spinner" icon={faCircleNotch} /> : children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  type: PropTypes.string,
  className: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  loading: false,
  className: '',
};

export default Button;
