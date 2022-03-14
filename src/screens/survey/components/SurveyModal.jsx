import React, { useState, useEffect } from 'react';

import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import Modal from 'shared/components/Modal';
import StarEmptyIcon from 'shared/images/star-empty.png';
import StarFullIcon from 'shared/images/star-full2.png';

const SurveyModal = ({ showSurveyModal, setShowSurveyModal, questions, answerQuestion }) => {
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

  const starRatingMouseOverHandler = (i) => {
    for (let r = 0; r <= i; r++) {
      document.querySelectorAll('.star-pair')[r].classList.add('hover');
    }
  };

  const starRatingMouseOutHandler = (i) => {
    for (let r = 0; r <= i; r++) {
      document.querySelectorAll('.star-pair')[r].classList.remove('hover');
    }
  };

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
                  <p className="font-shapiro95_super_wide text-sm md:text-2xl text-white uppercase">
                    {allMandatoryAnswered ? 'Thanks for your feedback!' : question.question}
                  </p>
                  <div className="survey-modal-stars my-4">
                    {[1, 2, 3, 4, 5].map((_v, i) => (
                      <div
                        key={`star-${i}`}
                        className={`star-pair ${i + 1 <= starsSelected ? 'selected' : ''}`}
                        onClick={() => starRatingClickHandler(question.id, i + 1)}
                        onMouseOver={() => starRatingMouseOverHandler(i)}
                        onMouseOut={() => starRatingMouseOutHandler(i)}
                      >
                        <img alt="" className="star-empty" src={StarEmptyIcon} />
                        <img alt="" className="star-full" src={StarFullIcon} />
                      </div>
                    ))}
                  </div>
                </>
              )}
              {isEnabled && type === 'open' && (
                <>
                  <textarea
                    className="p-3 my-5 w-full text-sm md:text-md h-24 md:h-auto"
                    placeholder={question.question}
                    value={feedbackValue}
                    onChange={(e) => openQuestionHandler(question.id, e.target.value)}
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

SurveyModal.defaultProps = {};

export default SurveyModal;
