import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'shared/components/Modal';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

export const UnpauseMembershipModal = ({ isOpen, closeHandler, unpauseSubscriptionAction }) => {
  const onUnpauseClick = () => {
    unpauseSubscriptionAction();
    closeHandler();
  };

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler} title="Unpause membership">
      <div className="flex flex-col items-center justify-center">
        <p className="mb-4">
          You have the ability to reactivate your membership prior to the end of your selected pause
          period.
        </p>
        <p className="mb-4">
          Your billing period will restart from the date you unpause and your account will be
          immediately billed so we can issue your session credits. You'll have 1 month until next
          billing from the time you unpause.
        </p>
        <p className="mb-4">If you're sure you'd like to unpause your membership, confirm below.</p>
        <PrimaryButton onClick={onUnpauseClick}>Unpause Membership</PrimaryButton>
      </div>
    </Modal>
  );
};

UnpauseMembershipModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  unpauseSubscriptionAction: PropTypes.func.isRequired,
};

export default UnpauseMembershipModal;
