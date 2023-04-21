import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { longSessionDate, formatSessionTime } from 'shared/utils/date';
import { pluralize } from 'shared/utils/helpers';
import Modal from 'shared/components/Modal';
import Button from 'shared/components/Button';

export const CancelModal = ({ isOpen, closeHandler, cancelSession, session, user }) => {
  const [disableBtn, setDisableBtn] = useState(false);

  const { unlimitedCredits } = user;
  const { date, time, isOpenClub, costCredits, userSession } = session;
  const { inCancellationTime, isFreeSession, scouting, shootingMachineReservations } =
    userSession || {};

  const onCancelClick = () => {
    setDisableBtn(true);
    cancelSession();
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
          'shooting machine(s) rental price will not be refunded.'
        );
      }

      return 'You will not be charged for the shooting machine(s) rental.';
    }

    const lateCancelFee = import.meta.env.VITE_CANCELED_OUT_OF_TIME_PRICE;
    const hasLateCancelFee = Number(lateCancelFee);

    if (unlimitedCredits) {
      if (inCancellationTime) {
        return null;
      }

      if (scouting) {
        let message =
          'The evaluation credit will not be refunded because of the late cancellation.';

        if (hasLateCancelFee) {
          message += ` You will also be charged a $${lateCancelFee} late cancellation fee.`;
        } else {
          message += ' You will not be charged a late cancellation fee.';
        }

        return message;
      }

      if (hasLateCancelFee) {
        return `You will be charged a $${lateCancelFee} late cancellation fee.`;
      }

      return 'You will not be charged a late cancellation fee.';
    }

    if (inCancellationTime) {
      if (costCredits === 0) {
        return scouting ? 'The evaluation credit will be refunded to your account.' : null;
      }

      return scouting
        ? 'The session and evaluation credits will be refunded to your account.'
        : `The ${pluralize('credit', costCredits)} will be refunded to your account.`;
    }

    if (isFreeSession) {
      return `Your free session credit will remain in your account, but we do charge a $${
        import.meta.env.VITE_FREE_SESSION_CANCELED_OUT_OF_TIME_PRICE
      } late cancellation fee.`;
    }

    if (costCredits === 0) {
      if (scouting) {
        let message =
          'The evaluation credit will not be refunded because of the late cancellation.';

        if (hasLateCancelFee) {
          message += ` You will also be charged a $${lateCancelFee} late cancellation fee.`;
        }

        return message;
      }

      if (hasLateCancelFee) {
        return `You will be charged a $${lateCancelFee} late cancellation fee.`;
      }

      return null;
    }

    let message = scouting
      ? 'The session and evaluation credits will not be refunded because of the late cancellation.'
      : `The ${pluralize(
          'credit',
          costCredits
        )} will not be refunded because of the late cancellation.`;

    if (hasLateCancelFee) {
      message += ` You will also be charged a $${lateCancelFee} late cancellation fee.`;
    }

    return message;
  })();

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler}>
      <div className="text-center">
        <h2 className="font-shapiro95_super_wide text-lg sm:text-2xl mb-6">
          Are you sure you want to cancel your booking?
        </h2>
        <div className="mb-8">
          <span>{longSessionDate(date)}</span>
          <span className="mx-2">@</span>
          <span>{formatSessionTime(time)}</span>
          {cancellationText && <div className="text-sm mt-5 font-bold">{cancellationText}</div>}
        </div>
        <Button onClick={onCancelClick} disabled={disableBtn} className="mr-2">
          Yes, cancel it
        </Button>
        <Button onClick={closeHandler} variant="outline-purple" className="ml-2">
          No, keep it
        </Button>
      </div>
    </Modal>
  );
};

CancelModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  cancelSession: PropTypes.func.isRequired,
  session: PropTypes.shape(),
  user: PropTypes.shape(),
};

export default CancelModal;
