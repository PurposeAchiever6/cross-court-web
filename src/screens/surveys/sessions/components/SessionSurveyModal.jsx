import React, { useState } from 'react';
import PropTypes from 'prop-types';

import InputTextareaField from 'shared/components/InputTextareaField';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import Modal from 'shared/components/Modal';
import StarsRate from 'shared/components/StarsRate';

const SessionSurveyModal = ({ showSurveyModal, setShowSurveyModal, questions, answerQuestion }) => {
  const [starsSelected, setStarsSelected] = useState(0);
  const [feedbackValue, setFeedbackValue] = useState('');
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState([]);
  const [answers, setAnswers] = useState({});

  const mandatoryIds = questions.filter((q) => q.isMandatory).map((q) => q.id);
  const allMandatoryAnswered = mandatoryIds.every((elem) => answeredQuestionIds.includes(elem));
  const showHint = starsSelected > 0 && starsSelected < 4 && feedbackValue.length < 20;

  const allowSubmit = allMandatoryAnswered && (starsSelected > 3 || feedbackValue.length >= 20);

  const starRatingClickHandler = (questionId, answer) => {
    setStarsSelected(answer);
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: answer }));

    if (answeredQuestionIds.includes(questionId)) {
      return;
    }

    setAnsweredQuestionIds([...answeredQuestionIds, questionId]);
  };

  const openQuestionHandler = (questionId, answer) => {
    setFeedbackValue(answer);
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: answer }));

    if (answer === '') {
      setAnsweredQuestionIds(answeredQuestionIds.filter((id) => id !== questionId));
    } else {
      if (answeredQuestionIds.includes(questionId)) {
        return;
      }
      setAnsweredQuestionIds([...answeredQuestionIds, questionId]);
    }
  };

  const submitHandler = () => {
    Object.entries(answers).forEach(([questionId, answerValue]) => {
      if (answerValue !== '') {
        answerQuestion(questionId, answerValue);
      }
    });

    setShowSurveyModal(false);
  };

  return (
    <Modal
      isOpen={questions.length > 0 && showSurveyModal}
      closeHandler={() => setShowSurveyModal(false)}
      closeOnOverlayClick={false}
      dark
      size="lg"
      showCloseButton={false}
      shouldCloseOnEsc={false}
    >
      <div className="flex flex-col items-center text-center">
        {questions.map((question) => {
          const { isEnabled, type } = question;

          return (
            <div key={question.id} className="w-full">
              {isEnabled && type === 'rate' && (
                <>
                  <h2 className="font-shapiro95_super_wide text-sm md:text-2xl text-white uppercase mb-5">
                    {allMandatoryAnswered ? 'Thanks for your feedback!' : question.question}
                  </h2>
                  <StarsRate
                    size="2xl"
                    rate={starsSelected}
                    onClick={(rate) => starRatingClickHandler(question.id, rate)}
                    className="inline-block mb-4"
                    showEmptyStars
                  />
                </>
              )}
              {isEnabled && type === 'open' && (
                <>
                  <InputTextareaField
                    placeholder={question.question}
                    value={feedbackValue}
                    onChange={(e) => openQuestionHandler(question.id, e.target.value)}
                    rows={6}
                    className="text-white my-5"
                    hint={showHint ? 'Please include at least 20 characters' : null}
                    formik={false}
                  />
                  <PrimaryButton
                    disabled={!allowSubmit}
                    onClick={submitHandler}
                    inverted
                    bg="transparent"
                  >
                    SUBMIT
                  </PrimaryButton>
                </>
              )}
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

SessionSurveyModal.propTypes = {
  showSurveyModal: PropTypes.bool.isRequired,
  setShowSurveyModal: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  answerQuestion: PropTypes.func.isRequired,
};

export default SessionSurveyModal;
