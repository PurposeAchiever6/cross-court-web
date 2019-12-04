import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { shade } from 'polished';
import colors from 'shared/styles/constants';

const Button = styled.button`
  background-color: transparent;
  color: ${colors.white};
  border: 1px solid ${colors.white};
  border-radius: 0;
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0.7rem 2rem;

  &:hover {
    background-color: ${shade(0.5, `${colors.white}`)};
  }
`;

const AlternativeButton = ({ children, className, ...props }) => {
  return (
    <Button className={`alternative-btn ${className}`} {...props}>
      {children}
    </Button>
  );
};

AlternativeButton.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  className: PropTypes.string,
};

AlternativeButton.defaultProps = {
  type: 'button',
  disabled: false,
  className: '',
};

export default AlternativeButton;
