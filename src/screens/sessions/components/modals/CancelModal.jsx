import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { pluralize } from 'shared/utils/helpers';
import Modal from 'shared/components/Modal';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

export const CancelModal = ({
  isOpen,
  closeHandler,
  cancelSessionAction,
  sessionInfo,
  unlimitedCredits,
}) => {
  const [disableBtn, setDisableBtn] = useState(false);

  const inCancellationTime = sessionInfo?.userSession?.inCancellationTime;
  const isFreeSession = sessionInfo?.userSession?.isFreeSession;
  const scouting = sessionInfo?.userSession?.scouting;
  const shootingMachineReservations = sessionInfo?.userSession?.shootingMachineReservations;
  const isOpenClub = sessionInfo?.isOpenClub;
  const costCredits = sessionInfo?.costCredits;

  const onCancelClick = () => {
    setDisableBtn(true);
    cancelSessionAction();
  };

  const cancellationText = (() => {
    if (isOpenClub) {
      if (!shootingMachineReservations?.length) {
        return;
      }

      const shootingMachineReservationsPrice = shootingMachineReservations.reduce(
        (totalPrice, shootingMachineReservation) =>
          shootingMachineReservation.charged
            ? totalPrice + shootingMachineReservation.price
            : totalPrice,
        0
      );

      if (shootingMachineReservationsPrice > 0) {
        return (
          `Due to the late cancellation, the $${shootingMachineReservationsPrice} ` +
          'shooting machine(s) rental price will not be refunded'
        );
      }

      return 'You will not be charged for the shooting machine(s) rental';
    }

    const lateCancelFee = import.meta.env.VITE_CANCELED_OUT_OF_TIME_PRICE;
    const hasLateCancelFee = Number(lateCancelFee);

    if (unlimitedCredits) {
      if (inCancellationTime) {
        return null;
      }

      if (hasLateCancelFee) {
        return `You will be charged a $${lateCancelFee} late cancellation fee`;
      }

      return 'You will not be charged a late cancellation fee';
    }

    if (inCancellationTime) {
      if (costCredits === 0) {
        return scouting ? 'The evaluation credit will be refunded to your account' : null;
      }

      return scouting
        ? 'The session and evaluation credits will be refunded to your account'
        : `The ${pluralize('credit', costCredits)} will be refunded to your account`;
    }

    if (isFreeSession) {
      return `Your free session credit will remain in your account, but we do charge a \
                $${
                  import.meta.env.VITE_FREE_SESSION_CANCELED_OUT_OF_TIME_PRICE
                } late cancellation fee`;
    }

    if (costCredits === 0) {
      if (scouting) {
        let message = 'The evaluation credit will not be refunded because of the late cancellation';

        if (hasLateCancelFee) {
          message += `. You will also be charged a $${lateCancelFee} late cancellation fee`;
        }

        return message;
      }

      if (hasLateCancelFee) {
        return `You will be charged a $${lateCancelFee} late cancellation fee`;
      }

      return null;
    }

    let message = scouting
      ? 'The session and evaluation credits will not be refunded because of the late cancellation'
      : `The ${pluralize(
          'credit',
          costCredits
        )} will not be refunded because of the late cancellation`;

    if (hasLateCancelFee) {
      message += `. You will also be charged a $${lateCancelFee} late cancellation fee`;
    }

    return message;
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
  isOpen: PropTypes.bool.isRequired,
  unlimitedCredits: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  cancelSessionAction: PropTypes.func.isRequired,
  sessionInfo: PropTypes.shape(),
};

export default CancelModal;
