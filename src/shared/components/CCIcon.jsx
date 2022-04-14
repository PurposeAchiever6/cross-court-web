import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCcVisa,
  faCcMastercard,
  faCcDiscover,
  faCcAmex,
  faCcJcb,
  faCcDinersClub,
} from '@fortawesome/free-brands-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { string } from 'prop-types';

const CCIconContainer = styled.div`
  svg {
    color: #000;
    font-size: ${(props) => props.fontSize};
  }
`;

const Logo = ({ ccType }) => {
  switch (ccType) {
    case 'visa':
      return <FontAwesomeIcon icon={faCcVisa} />;
    case 'mastercard':
      return <FontAwesomeIcon icon={faCcMastercard} />;
    case 'discover':
      return <FontAwesomeIcon icon={faCcDiscover} />;
    case 'amex':
      return <FontAwesomeIcon icon={faCcAmex} />;
    case 'jcb':
      return <FontAwesomeIcon icon={faCcJcb} />;
    case 'diners':
      return <FontAwesomeIcon icon={faCcDinersClub} />;
    default:
      return <FontAwesomeIcon icon={faCreditCard} />;
  }
};

const CCIcon = ({ ccType, fontSize }) => (
  <CCIconContainer fontSize={fontSize}>
    <Logo ccType={ccType} />
  </CCIconContainer>
);

Logo.defaultProps = {
  ccType: '',
};

Logo.propTypes = {
  ccType: string,
};

CCIcon.defaultProps = {
  ccType: '',
  fontSize: '2rem',
};

CCIcon.propTypes = {
  ccType: string,
  fontSize: string,
};

export default CCIcon;
