import React, { useState } from 'react';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

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

export const CancelModal = ({
  closeHandler,
  cancelSessionAction,
  inCancellationTime,
  unlimitedCredits,
  isFreeSession,
}) => {
  const env = runtimeEnv();
  const [disableBtn, setDisableBtn] = useState(false);

  const onCancelClick = () => {
    setDisableBtn(true);
    cancelSessionAction();
  };

  const cancellationText = (() => {
    if (unlimitedCredits) {
      if (inCancellationTime) {
        return null;
      }

      const unlimitedCreditsCancelFee = env.REACT_APP_UNLIMITED_CREDITS_CANCELED_OUT_OF_TIME_PRICE;

      if (Number(unlimitedCreditsCancelFee) > 0) {
        return `You will be charged a $${unlimitedCreditsCancelFee} \
                late cancellation fee`;
      } else {
        return 'You will not be charged a late cancellation fee';
      }
    } else {
      if (inCancellationTime) {
        return 'The credit will be refunded to your account';
      }

      if (isFreeSession) {
        return `Your free session credit will remain in your account, but we do charge a \
                $${env.REACT_APP_FREE_SESSION_CANCELED_OUT_OF_TIME_PRICE} late cancellation fee`;
      }

      return 'The credit will not be refunded because of the late cancellation';
    }
  })();

  return (
    <CancelModalContainer className="cancel-modal">
      <h2>CANCEL?</h2>
      <span className="text">Are you sure you want to cancel your session?</span>
      {cancellationText && <strong>{cancellationText}</strong>}
      <PrimaryButton onClick={onCancelClick} inverted disabled={disableBtn}>
        CANCEL RESERVATION
      </PrimaryButton>
      <span className="link" onClick={closeHandler}>
        Nevermind
      </span>
    </CancelModalContainer>
  );
};

CancelModal.propTypes = {
  unlimitedCredits: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  cancelSessionAction: PropTypes.func.isRequired,
  inCancellationTime: PropTypes.bool,
  isFreeSession: PropTypes.bool,
};

export default CancelModal;
