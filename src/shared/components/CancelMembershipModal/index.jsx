import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { subscriptionFeedback } from 'screens/products/actionCreators';
import Modal from 'shared/components/Modal';
import StepFeedbackContent from 'shared/components/CancelMembershipModal/StepFeedbackContent';
import StepCanceledContent from 'shared/components/CancelMembershipModal/StepCanceledContent';

const STEP_CONFIRMATION = 'confirmation';
const STEP_CANCELED = 'canceled';

const CancelMembershipModal = ({ isOpen, closeHandler }) => {
  const dispatch = useDispatch();

  const [step, setStep] = useState(STEP_CONFIRMATION);

  const subscriptionFeedbackHandler = (feedback) => {
    dispatch(subscriptionFeedback(feedback));
    setStep(STEP_CANCELED);
  };

  const onClose = () => {
    setStep(STEP_CONFIRMATION);
    closeHandler();
  };

  const modalData = (() => {
    switch (step) {
      case STEP_CANCELED:
        return {
          title: 'Request Submitted',
          size: 'lg',
          content: <StepCanceledContent closeModal={onClose} />,
        };
      default:
        return {
          title: 'Submit Request for Cancellation',
          subtitle: 'Feedback',
          size: 'xl',
          content: <StepFeedbackContent subscriptionFeedback={subscriptionFeedbackHandler} />,
        };
    }
  })();

  return (
    <Modal
      isOpen={isOpen}
      closeHandler={onClose}
      title={modalData.title}
      size={modalData.size}
      subtitle={modalData.subtitle}
    >
      {modalData.content}
    </Modal>
  );
};

CancelMembershipModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
};

export default CancelMembershipModal;
