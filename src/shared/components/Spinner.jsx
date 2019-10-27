import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const SpinnerContainer = styled.div`
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
  .spinner {
    animation: spinner 0.6s linear infinite;
  }
`;

export default function Spinner() {
  return (
    <SpinnerContainer>
      <FontAwesomeIcon className="spinner" icon={faCircleNotch} />
    </SpinnerContainer>
  );
}
