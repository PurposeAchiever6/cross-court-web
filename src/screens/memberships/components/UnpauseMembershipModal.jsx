import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'shared/components/Modal';
import Button from 'shared/components/Button';

export const UnpauseMembershipModal = ({ isOpen, closeHandler, unpauseSubscriptionAction }) => {
  const onUnpauseClick = () => {
    unpauseSubscriptionAction();
    closeHandler();
  };

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler} title="Unpause membership">
      <p className="mb-4">
        You have the ability to reactivate your membership prior to the end of your selected pause
        period.
      </p>
      <p className="mb-4">
        Your billing period will restart from the date you unpause and your account will be
        immediately billed so we can issue your session credits. You'll have 1 month until next
        billing from the time you unpause.
      </p>
      <p className="mb-6">If you're sure you'd like to unpause your membership, confirm below.</p>
      <Button onClick={onUnpauseClick}>Confirm</Button>
    </Modal>
  );
};

UnpauseMembershipModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  unpauseSubscriptionAction: PropTypes.func.isRequired,
};

export default UnpauseMembershipModal;
