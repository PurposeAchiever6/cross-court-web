import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from 'shared/components/Modal';
import Button from 'shared/components/Button';

export const FirstTimersInformationModal = ({ isOpen, onConfirm }) => {
  const [submiting, setSubmiting] = useState(false);

  const onConfirmHandler = () => {
    setSubmiting(true);
    onConfirm();
  };

  return (
    <Modal title="Please Note" isOpen={isOpen} closeOnOverlayClick={false} showCloseButton={false}>
      <div>
        <p className="text-sm mb-6">
          Please arrive at least 20 minutes early for your first session so our experience team can
          get you settled in. Thanks!
        </p>
        <Button onClick={onConfirmHandler} loading={submiting}>
          Let's Go
        </Button>
      </div>
    </Modal>
  );
};

FirstTimersInformationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default FirstTimersInformationModal;
