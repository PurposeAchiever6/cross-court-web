import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'shared/components/Modal';

export const ForgotPasswordEmailSentModal = ({ isOpen, closeHandler, email }) => (
  <Modal isOpen={isOpen} closeHandler={closeHandler} title="Email Sent" size="lg">
    <p className="text-sm">
      We sent an email to {email} which contains a link to reset your password.
    </p>
  </Modal>
);

ForgotPasswordEmailSentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export default ForgotPasswordEmailSentModal;
