import React, { useState } from 'react';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import PropTypes from 'prop-types';

import Modal from 'shared/components/Modal';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

export const CancelModal = ({
  isOpen,
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
      }
      return 'You will not be charged a late cancellation fee';
    }

    if (inCancellationTime) {
      return 'The credit will be refunded to your account';
    }

    if (isFreeSession) {
      return `Your free session credit will remain in your account, but we do charge a \
                $${env.REACT_APP_FREE_SESSION_CANCELED_OUT_OF_TIME_PRICE} late cancellation fee`;
    }

    return 'The credit will not be refunded because of the late cancellation';
  })();

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler} title="Cancel Reservation">
      <div className="text-center">
        <div className="mb-6">
          <div>Are you sure you want to cancel your session?</div>
          {cancellationText && <div className="mt-6 mb-8 font-bold">{cancellationText}</div>}
        </div>
        <PrimaryButton onClick={onCancelClick} inverted disabled={disableBtn}>
          Cancel Reservation
        </PrimaryButton>
      </div>
    </Modal>
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
