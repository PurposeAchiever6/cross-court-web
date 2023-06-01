import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from 'shared/components/Modal';
import { createSubscriptionRequestCancellation } from 'screens/products/actionCreators';
import StepFeedbackContent from 'shared/components/EndMembershipModal/components/FeedbackModal/StepFeedbackContent';
import StepCanceledContent from 'shared/components/EndMembershipModal/components/FeedbackModal/StepCanceledContent';

const FEEDBACK = 'feedback';
const STEP_CANCELED = 'canceled';

const FeedbackModal = ({ isOpen, closeHandler }) => {
  const dispatch = useDispatch();

  const [step, setStep] = useState(FEEDBACK);

  const createSubscriptionRequestCancellationHandler = (payload) => {
    dispatch(createSubscriptionRequestCancellation(payload));
    setStep(STEP_CANCELED);
  };

  const modalData = (() => {
    switch (step) {
      case STEP_CANCELED:
        return <StepCanceledContent />;
      default:
        return (
          <StepFeedbackContent
            createSubscriptionRequestCancellation={createSubscriptionRequestCancellationHandler}
          />
        );
    }
  })();

  return (
    <Modal
      isOpen={isOpen}
      closeHandler={() => {
        setStep(FEEDBACK);
        closeHandler();
      }}
      size="lg"
    >
      {modalData}
    </Modal>
  );
};

FeedbackModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
};

export default FeedbackModal;
