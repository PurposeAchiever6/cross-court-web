import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { subscriptionFeedback } from 'screens/products/actionCreators';
import Modal from 'shared/components/Modal';
import StepFeedbackContent from 'shared/components/CancelMembershipModal/StepFeedbackContent';
import StepCanceledContent from 'shared/components/CancelMembershipModal/StepCanceledContent';
import StepAreYouSureContent from 'shared/components/CancelMembershipModal/StepAreYouSureContent';

const STEP_ARE_YOU_SURE = 'are_you_sure';
const STEP_CONFIRMATION = 'confirmation';
const STEP_CANCELED = 'canceled';
const STEP_CANCELLATION_FEEDBACK = 'cancellation_feedback';

const CancelMembershipModal = ({ isOpen, closeHandler, activeSubscription }) => {
  const dispatch = useDispatch();

  const [step, setStep] = useState(STEP_ARE_YOU_SURE);

  const pausesPerYear = activeSubscription?.pausesPerYear;

  const subscriptionFeedbackHandler = (feedback) => {
    dispatch(subscriptionFeedback(feedback));
    setStep(STEP_CANCELED);
  };

  const onClose = () => {
    setStep(STEP_CONFIRMATION);
    closeHandler();
  };

  const areYouSureHandler = () => {
    setStep(STEP_CANCELLATION_FEEDBACK);
  };

  const modalData = (() => {
    switch (step) {
      case STEP_CANCELED:
        return {
          title: 'Request Submitted',
          size: 'lg',
          content: <StepCanceledContent closeModal={onClose} />,
        };
      case STEP_CANCELLATION_FEEDBACK:
        return {
          title: 'Submit Request for Cancellation',
          subtitle: 'Feedback',
          size: 'xl',
          content: <StepFeedbackContent subscriptionFeedback={subscriptionFeedbackHandler} />,
        };
      default:
        return {
          title: 'Are you sure you want to cancel?',
          size: 'xl',
          content: (
            <StepAreYouSureContent
              areYouSureHandler={areYouSureHandler}
              pausesPerYear={pausesPerYear}
            />
          ),
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
