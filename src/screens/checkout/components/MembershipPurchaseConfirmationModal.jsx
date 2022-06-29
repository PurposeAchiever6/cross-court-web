import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'shared/components/Modal';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const MembershipPurchaseConfirmationModal = ({ isOpen, closeHandler, onConfirm }) => (
  <Modal isOpen={isOpen} closeHandler={closeHandler} title="Membership Purchase" size="sm">
    <div className="mb-8">
      I understand I am purchasing a monthly subscription that will auto charge me on a monthly
      basis unless my membership is paused or canceled.
    </div>
    <div className="text-center">
      <PrimaryButton onClick={onConfirm}>Confirm</PrimaryButton>
    </div>
  </Modal>
);

MembershipPurchaseConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default MembershipPurchaseConfirmationModal;
