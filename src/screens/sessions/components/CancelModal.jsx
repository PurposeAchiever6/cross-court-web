import React from 'react';
import styled from 'styled-components';
import Button from 'shared/components/Button';
import colors from 'shared/styles/constants';
import PropTypes from 'prop-types';

const CancelModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    font-weight: bold;
    font-size: 28px;
    line-height: 44px;
    margin-bottom: 1.2rem;
  }

  .text {
    font-size: 18px;
    line-height: 22px;
    margin-bottom: 2rem;
    width: 65%;
    text-align: center;
  }

  strong {
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    margin-bottom: 3rem;
    width: 50%;
    text-align: center;
  }

  button {
    margin-bottom: 2rem;
  }

  .link {
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.1em;
    text-decoration-line: underline;
    cursor: pointer;
  }
`;

export const CancelModal = ({ closeHandler, cancelSessionAction, inCancellationTime }) => (
  <CancelModalContainer className="cancel-modal">
    <h2>CANCELLATION</h2>
    <span className="text">Are you sure you want to cancel your session?</span>
    <strong>
      {inCancellationTime
        ? '1 credit will be refunded to your account'
        : 'The credit will not be refunded'}
    </strong>
    <Button className="ar-button inverted" onClick={cancelSessionAction}>
      <div className="ar-button-inner">CANCEL RESERVATION</div>
    </Button>
    <span className="link" onClick={closeHandler}>
      Nevermind
    </span>
  </CancelModalContainer>
);

CancelModal.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  cancelSessionAction: PropTypes.func.isRequired,
  inCancellationTime: PropTypes.bool.isRequired,
};

export default CancelModal;
