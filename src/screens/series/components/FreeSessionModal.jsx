import React from 'react';
import styled from 'styled-components';
import Button from 'shared/components/Button';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const FreeSessionModalContainer = styled.div`
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

    <span className="title">Let&apos;s sweat!</span>
    <span className="text">
      While your first Session is on us, we do require you to input a payment method in case you do
      not show up and we have to charge your account.
    </span>
    <Button onClick={claimFreeSessionAction}>I Understand</Button>
  </FreeSessionModalContainer>
);

FreeSessionModal.propTypes = {
  claimFreeSessionAction: PropTypes.func.isRequired,
  closeHandler: PropTypes.func.isRequired,
};

export default FreeSessionModal;
