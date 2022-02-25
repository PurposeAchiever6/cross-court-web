import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ThanksForComingOutImg from 'shared/images/thanks-for-coming-out-2.png';
import ThanksForYourFeedbackImg from 'shared/images/thanks-for-your-feedback.png';
import StarEmptyIcon from 'shared/images/star-empty.png';
import StarFullIcon from 'shared/images/star-full2.png';
import ScrollLock from 'react-scrolllock';
import ROUTES from 'shared/constants/routes';
import { useHistory } from 'react-router-dom';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const SurveyModalContainer = styled.div`
  width: 100%;
  position: relative;

  .title {
    font-size: 1.75rem;
    line-height: 1.9rem;
    color: #000000;
    margin-bottom: 2rem;
    margin-top: 2rem;
  }

  .text {
    color: #000000;
    margin-bottom: 3rem;
  }

  svg {
    right: 0;
    position: absolute;
    top: 0;
    font-size: 1.25rem;
    color: #000;
    cursor: pointer;
    font-size: 1.75rem;
  }
`;

const SurveyModal = () => {
  const env = runtimeEnv();
  const history = useHistory();
  const redirectUrl = window.localStorage.getItem('redirect');

  const [starsSelected, setStarsSelected] = useState(0);
  const [feedbackValue, setFeedbackValue] = useState('');

  const starRatingMouseOverHandler = (i) => {
    for (let r = 0; r <= i; r++) {
      document.querySelectorAll('.star-pair')[r].classList.add('hover');
    }
  };
  const starRatingMouseOutHandler = (i) => {
    for (let r = 0; r <= 4; r++) {
      document.querySelectorAll('.star-pair')[r].classList.remove('hover');
    }
  };
  const starRatingClickHandler = (i) => {
    setStarsSelected(i);

    fetch(`${env.REACT_APP_API_URL}/session_surveys/answers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access-token': window.localStorage.getItem('ACCESS-TOKEN'),
        uid: window.localStorage.getItem('UID'),
        client: window.localStorage.getItem('CLIENT'),
      },
      body: JSON.stringify({
        session_answer: {
          answer: i,
          session_survey_question_id: 1,
        },
      }),
    })
      .then(() => {
        window.localStorage.removeItem('surveyLock');
      })
      .catch((err) => window.alert('Rating error: ' + err));
  };
  const surveySubmitAction = () => {
    fetch(`${env.REACT_APP_API_URL}/session_surveys/answers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access-token': window.localStorage.getItem('ACCESS-TOKEN'),
        uid: window.localStorage.getItem('UID'),
        client: window.localStorage.getItem('CLIENT'),
      },
      body: JSON.stringify({
        session_answer: {
          answer: document.querySelector('.feedback').value,
          session_survey_question_id: 2,
        },
      }),
    })
      .then((data) => {
        document.querySelector('.close-btn').classList.remove('hide');
        document.querySelector('.survey-modal .body1').classList.add('hide');
        document.querySelector('.survey-modal .body2').classList.remove('hide');
      })
      .catch((err) => window.alert('Feedback error: ' + err));
  };

  const conditionalCloseHandler = () => {
    window.location.reload();
  };

  return (
    <ScrollLock isActive={true}>
      <SurveyModalContainer className="survey-modal bg-cc-black">
        <FontAwesomeIcon
          className="close-btn hide"
          icon={faTimes}
          onClick={conditionalCloseHandler}
        />
        <div className="body1">
          <img alt="" className="thanks-for-coming-out" src={ThanksForComingOutImg} />
          <div className="stars">
            {[1, 2, 3, 4, 5].map((_v, i) => (
              <div
                key={`star-${i}`}
                className={`star-pair ${i + 1 <= starsSelected ? 'selected' : ''}`}
                onClick={() => starRatingClickHandler(i + 1)}
                onMouseOver={() => starRatingMouseOverHandler(i)}
                onMouseOut={() => starRatingMouseOutHandler(i)}
              >
                <img alt="" className="star-empty" src={StarEmptyIcon} />
                <img alt="" className="star-full" src={StarFullIcon} />
              </div>
            ))}
          </div>
          <textarea
            className="feedback"
            placeholder="What is the most important reason for your score? (Optional)"
            value={feedbackValue}
            onChange={(e) => setFeedbackValue(e.target.value)}
          ></textarea>
          <PrimaryButton
            className="submit-btn"
            disabled={starsSelected === 0}
            onClick={surveySubmitAction}
            inverted
            bg="transparent"
          >
            SUBMIT
          </PrimaryButton>
        </div>
        <div className="body2 hide">
          <img alt="" className="thanks-for-your-feedback inline" src={ThanksForYourFeedbackImg} />
          <PrimaryButton
            className="book-next-session-btn"
            onClick={() => {
              if (redirectUrl) {
                window.localStorage.removeItem('redirect');
                history.push(redirectUrl);
              } else {
                history.push(ROUTES.LOCATIONS);
              }
            }}
          >
            BOOK NEXT SESSION
          </PrimaryButton>
        </div>
      </SurveyModalContainer>
    </ScrollLock>
  );
};

SurveyModal.defaultProps = {};

export default SurveyModal;
