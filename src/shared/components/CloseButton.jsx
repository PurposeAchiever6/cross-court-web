import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import device from 'shared/styles/mediaQueries';
import CrossSvg from './svg/CrossSvg';

const Button = styled.button`
  display: none;
  border: none;
  background: none;
  padding: 0;
  position: absolute;
  top: 3rem;
  right: 2rem;

  @media ${device.mobile} {
    display: block;
  }
`;

const CloseButton = ({ onClick, className, color = 'white' }) => (
  <Button className={className} onClick={onClick}>
    <CrossSvg color={color} />
  </Button>
);

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
};

export default CloseButton;
