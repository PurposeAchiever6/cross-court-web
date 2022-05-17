import React, { useState, useEffect } from 'react';

import InputTextareaField from 'shared/components/InputTextareaField';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import Modal from 'shared/components/Modal';
import StarsRate from 'shared/components/StarsRate';

const SessionSurveyModal = ({ showSurveyModal, setShowSurveyModal, questions, answerQuestion }) => {
  const [starsSelected, setStarsSelected] = useState(0);
  const [feedbackValue, setFeedbackValue] = useState('');
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState([]);
  const [allMandatoryAnswered, setAllMandatoryAnswered] = useState(false);
  const mandatoryIds = questions.filter((q) => q.isMandatory).map((q) => q.id);

  useEffect(() => {
    if (mandatoryIds.length) {
      setAllMandatoryAnswered(mandatoryIds.every((elem) => answeredQuestionIds.includes(elem)));
    }
  }, [answeredQuestionIds, mandatoryIds]);

  const starRatingClickHandler = (questionId, answer) => {
    setStarsSelected(answer);
    answerQuestion(questionId, answer);
    if (answeredQuestionIds.includes(questionId)) return;

    setAnsweredQuestionIds([...answeredQuestionIds, questionId]);
  };

  const openQuestionHandler = (questionId, answer) => {
    setFeedbackValue(answer);

    if (answer === '') {
      setAnsweredQuestionIds(answeredQuestionIds.filter((id) => id !== questionId));
    } else {
      if (answeredQuestionIds.includes(questionId)) return;

      setAnsweredQuestionIds([...answeredQuestionIds, questionId]);
    }
  };

  const submitHandler = (questionId, answer) => {
    if (answer !== '') answerQuestion(questionId, answer);
    setShowSurveyModal(false);
  };

  return (
    <Modal
      isOpen={questions.length > 0 && showSurveyModal}
      closeHandler={() => setShowSurveyModal(false)}
      closeOnOverlayClick={false}
      dark
      size="lg"
      showCloseButton={allMandatoryAnswered}
      shouldCloseOnEsc={allMandatoryAnswered}
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
                    className="my-5"
                    formik={false}
                  />
                  <PrimaryButton
                    disabled={!allMandatoryAnswered}
                    onClick={() => submitHandler(question.id, feedbackValue)}
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

export default SessionSurveyModal;
