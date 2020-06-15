import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { shade } from 'polished';

import colors from 'shared/styles/constants';

const Button = styled.button`
  align-items: center;
  background-color: ${props => (props.disabled ? colors.white : colors.white)}
  border: 1px solid ${props => (props.disabled ? colors.grey : colors.black)}
  color: ${props => (props.disabled ? colors.grey : colors.black)}
  cursor: ${props => (props.disabled ? 'auto' : 'pointer')};
  display: flex;
  font-size: 1rem;
  height: 3rem;
  justify-content: space-around;
  line-height: 1rem;
  padding: 0.5rem;
  touch-action: manipulation;
  width: 8rem;

  ${props =>
    !props.disabled &&
    `&:hover {
    background-color: ${shade(0.5, `${colors.white}`)};
  }`}
  
`;

const OutlinedButton = ({ children, className, ...props }) => (
  <Button className={className} {...props}>
    {children}
  </Button>
);

OutlinedButton.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  className: PropTypes.string,
};

OutlinedButton.defaultProps = {
  type: 'button',
  disabled: false,
  className: '',
};

export default OutlinedButton;
