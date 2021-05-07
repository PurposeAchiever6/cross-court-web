import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import colors from 'shared/styles/constants';

const Button = styled.button`
  outline: none;
  background-color: transparent;
  color: ${colors.white};
  border: 2px solid ${colors.brandBlue};
  border-radius: 0;
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0.7rem 2rem;
  cursor: pointer;
  font-family: 'shapiro95_super_wide';
  font-size: 14px;
  line-height: 19px;

  :hover {
    background-color: ${colors.brandBlue};
  }
`;

const SecondaryButton = ({ children, className, ...props }) => {
  return (
    <Button className={`${className}`} {...props}>
      {children}
    </Button>
  );
};

SecondaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

SecondaryButton.defaultProps = {
  className: '',
};

export default SecondaryButton;
