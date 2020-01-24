import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCcVisa,
  faCcMastercard,
  faCcDiscover,
  faCcAmex,
} from '@fortawesome/free-brands-svg-icons';

const CCIconContainer = styled.div`
  svg {
    color: #000;
    font-size: 2rem;
  }
`;

const CCIcon = ({ ccType }) => {
  switch (ccType) {
    case 'visa':
      return (
        <CCIconContainer>
          <FontAwesomeIcon icon={faCcVisa} />
        </CCIconContainer>
      );
    case 'mastercard':
      return (
        <CCIconContainer>
          <FontAwesomeIcon icon={faCcMastercard} />
        </CCIconContainer>
      );
    case 'discover':
      return (
        <CCIconContainer>
          <FontAwesomeIcon icon={faCcDiscover} />
        </CCIconContainer>
      );
    case 'amex':
      return (
        <CCIconContainer>
          <FontAwesomeIcon icon={faCcAmex} />
        </CCIconContainer>
      );
    default:
      return (
        <CCIconContainer>
          <FontAwesomeIcon icon={faCcVisa} />
        </CCIconContainer>
      );
  }
};

export default CCIcon;
