import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { createSubscriptionRequestCancellation } from 'screens/products/actionCreators';
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

  const createSubscriptionRequestCancellationHandler = (payload) => {
    dispatch(createSubscriptionRequestCancellation(payload));
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
          title: 'Submit Request for',
          titleClasses: '!text-left !mb-10',
          subtitle: 'Feedback',
          subtitleClasses: 'text-cc-purple',
          size: 'xl',
          content: (
            <StepFeedbackContent
              createSubscriptionRequestCancellation={createSubscriptionRequestCancellationHandler}
              closeModal={onClose}
            />
          ),
        };
      default:
        return {
          title: 'Are you sure you want to',
          subtitle: 'cancel?',
          subtitleClasses: 'font-shapiro96_inclined_wide !text-3xl uppercase md:text-right',
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
      titleClasses={modalData.titleClasses}
      size={modalData.size}
      subtitle={modalData.subtitle}
      subtitleClasses={modalData.subtitleClasses}
    >
      {modalData.content}
    </Modal>
  );
};

CancelMembershipModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  activeSubscription: PropTypes.shape(),
};

export default CancelMembershipModal;
