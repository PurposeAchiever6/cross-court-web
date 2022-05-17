import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from 'shared/components/Modal';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

export const FirstTimersInformationModal = ({ isOpen, onConfirm }) => {
  const [submiting, setSubmiting] = useState(false);

  const onConfirmHandler = () => {
    setSubmiting(true);
    onConfirm();
  };

  return (
    <Modal
      title="Please Note"
      isOpen={isOpen}
      closeOnOverlayClick={false}
      showCloseButton={false}
      dark
    >
      <div>
        <p className="text-white mb-8">
          Please arrive at least 20 minutes early for your first session so our experience team can
          get you settled in. Thanks!
        </p>
        <div className="text-center">
          <PrimaryButton onClick={onConfirmHandler} loading={submiting}>
            Let's Go
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};

FirstTimersInformationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default FirstTimersInformationModal;
