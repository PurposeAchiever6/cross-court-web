import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { subscriptionFeedback, cancelSubscription } from 'screens/products/actionCreators';
import Modal from 'shared/components/Modal';
import StepConfirmationContent from 'shared/components/CancelMembershipModal/StepConfirmationContent';
import StepFeedbackContent from 'shared/components/CancelMembershipModal/StepFeedbackContent';
import StepCanceledContent from 'shared/components/CancelMembershipModal/StepCanceledContent';

const STEP_CONFIRMATION = 'confirmation';
const STEP_FEEDBACK = 'feedback';
const STEP_CANCELED = 'canceled';

const CancelMembershipModal = ({ isOpen, closeHandler, subscription }) => {
  const dispatch = useDispatch();

  const [step, setStep] = useState(STEP_CONFIRMATION);

  const subscriptionFeedbackHandler = (feedback) => {
    dispatch(subscriptionFeedback(feedback));
  };

  const cancelSubscriptionHandler = () => {
    dispatch(cancelSubscription(subscription));
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
          title: 'Membership Canceled',
          size: 'lg',
          content: <StepCanceledContent closeModal={onClose} />,
        };
      case STEP_FEEDBACK:
        return {
          title: 'Feedback',
          size: 'xl',
          content: (
            <StepFeedbackContent
              subscriptionFeedback={subscriptionFeedbackHandler}
              cancelSubscription={cancelSubscriptionHandler}
            />
          ),
        };
      default:
        return {
          title: 'Are you sure you want to cancel your membership?',
          size: 'xl',
          content: <StepConfirmationContent showFeedback={() => setStep(STEP_FEEDBACK)} />,
        };
    }
  })();

  return (
    <Modal isOpen={isOpen} closeHandler={onClose} title={modalData.title} size={modalData.size}>
      {modalData.content}
    </Modal>
  );
};

CancelMembershipModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  subscription: PropTypes.shape().isRequired,
};

export default CancelMembershipModal;
