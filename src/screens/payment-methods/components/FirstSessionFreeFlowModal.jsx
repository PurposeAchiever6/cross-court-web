import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'shared/components/Modal';
import Button from 'shared/components/Button';

const FirstSessionFreeFlowModal = ({ isOpen, closeHandler }) => (
  <Modal isOpen={isOpen} closeHandler={closeHandler} title="Let's Sweat!" size="sm">
    <div className="mb-8">
      While your first Session is on us, we do require you to input a payment method in case you do
      not show up and we have to charge your account.
    </div>
    <div className="text-center">
      <Button variant="outline-purple" onClick={closeHandler}>
        I UNDERSTAND
      </Button>
    </div>
  </Modal>
);

FirstSessionFreeFlowModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
};

export default FirstSessionFreeFlowModal;
