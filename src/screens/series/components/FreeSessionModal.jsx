import React from 'react';
import styled from 'styled-components';
import Button from 'shared/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const FreeSessionModalContainer = styled.div`
  width: 25rem;
  display: flex;
  flex-direction: column;
  font-family: Untitled Sans;
  position: relative;

  .title {
    font-weight: bold;
    font-size: 1.75rem;
    line-height: 1.9rem;
    color: #000000;
    margin-bottom: 2rem;
    margin-top: 2rem;
  }

  .text {
    font-size: 1.25rem;
    line-height: 1.7rem;
    color: #000000;
    margin-bottom: 3rem;
  }

  svg {
    right: 0;
    position: absolute;
    top: 0;
    font-size: 1.25rem;
    color: #000;
    cursor: pointer;
    font-size: 1.75rem;
  }
`;

const FreeSessionModal = ({ claimFreeSessionAction, closeHandler }) => (
  <FreeSessionModalContainer>
    <FontAwesomeIcon icon={faTimes} onClick={closeHandler} />

    <span className="title">Free Credit Claimed!</span>
    <span className="text">
      Why do we ask for a payment method? Even though your credit remains a 100% free, you will be
      charged if you book a session and don’t attend to it.
    </span>
    <Button onClick={claimFreeSessionAction}>I Understand</Button>
  </FreeSessionModalContainer>
);

export default FreeSessionModal;
