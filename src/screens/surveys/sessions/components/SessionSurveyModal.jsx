import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { createSessionSurvey } from 'screens/surveys/sessions/actionCreators';
import Modal from 'shared/components/Modal';
import StarsRate from 'shared/components/StarsRate';
import InputTextareaField from 'shared/components/InputTextareaField';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const SessionSurveyModal = ({ showSurveyModal, setShowSurveyModal }) => {
  const dispatch = useDispatch();

  const [starsSelected, setStarsSelected] = useState(0);
  const [feedbackValue, setFeedbackValue] = useState('');

  const showHint = starsSelected > 0 && starsSelected <= 3;
  const allowSubmit = starsSelected >= 4 || feedbackValue.length >= 20;

  const title =
    starsSelected > 0
      ? 'Thanks for your feedback!'
      : 'Thanks for coming out! Rate your last session';

  const submitHandler = () => {
    dispatch(createSessionSurvey({ rate: starsSelected, feedback: feedbackValue }));
    setShowSurveyModal(false);
  };

  return (
    <Modal
      isOpen={showSurveyModal}
      closeHandler={() => setShowSurveyModal(false)}
      closeOnOverlayClick={false}
      dark
      size="lg"
      showCloseButton={false}
      shouldCloseOnEsc={false}
      title={title}
    >
      <div className="text-center">
        <StarsRate
          size="2xl"
          rate={starsSelected}
          onClick={(rate) => setStarsSelected(rate)}
          className="inline-block mb-8"
          showEmptyStars
        />
        <InputTextareaField
          placeholder="What is the most important reason for your score?"
          value={feedbackValue}
          onChange={(e) => setFeedbackValue(e.target.value)}
          rows={6}
          className="text-white mb-8"
          hint={showHint ? 'Please include at least 20 characters' : null}
          formik={false}
        />
        <PrimaryButton disabled={!allowSubmit} onClick={submitHandler} inverted bg="transparent">
          SUBMIT
        </PrimaryButton>
      </div>
    </Modal>
  );
};

SessionSurveyModal.propTypes = {
  showSurveyModal: PropTypes.bool.isRequired,
  setShowSurveyModal: PropTypes.func.isRequired,
};

export default SessionSurveyModal;
