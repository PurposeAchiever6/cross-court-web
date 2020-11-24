import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ThanksForComingOutImg from 'shared/images/thanks-for-coming-out-2.png';
import ThanksForYourFeedbackImg from 'shared/images/thanks-for-your-feedback.png';
import StarEmptyIcon from 'shared/images/star-empty2.png';
import StarFullIcon from 'shared/images/star-full2.png';
import ScrollLock from 'react-scrolllock';
import Button from 'shared/components/Button';
import ROUTES from 'shared/constants/routes';
import { useHistory } from 'react-router-dom';
import runtimeEnv from '@mars/heroku-js-runtime-env';

const SurveyModalContainer = styled.div`
  display: flex;
  flex-direction: column;
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

const SurveyModal = ({ closeHandler, isOpen }) => {
  const env = runtimeEnv();
  const history = useHistory();
  const redirectUrl = window.localStorage.getItem('redirect');

  const starRatingMouseOverHandler = i => {
    for (let r = 0; r <= i; r++) {
      document.querySelectorAll('.star-pair')[r].classList.add('hover');
    }
  };
  const starRatingMouseOutHandler = i => {
    for (let r = 0; r <= 4; r++) {
      document.querySelectorAll('.star-pair')[r].classList.remove('hover');
    }
  };
  const starRatingClickHandler = i => {
    const rating = i + 1;

    for (let r = 0; r <= 4; r++) {
      document.querySelectorAll('.star-pair')[r].classList.remove('selected');
    }
    for (let r = 0; r <= i; r++) {
      document.querySelectorAll('.star-pair')[r].classList.add('selected');
    }

    document.querySelector('.stars').classList.add('done');
    document.querySelector('.stars').setAttribute('data-value', rating);
    document.querySelectorAll('.star-pair')[i].classList.add('selected');

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
          answer: rating.toString(),
          session_survey_question_id: 1,
        },
      }),
    })
    .then(data => {
      console.log('Rating saved successfully!', data);
      document.querySelector('.submit-btn').classList.remove('disabled');
      window.localStorage.removeItem('surveyLock');
    })
    .catch(err => window.alert('Rating error: ' + err));
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
    .then(data => {
      console.log('Feedback saved successfully!', data);
      document.querySelector('.close-btn').classList.remove('hide');
      document.querySelector('.survey-modal .body1').classList.add('hide');
      document.querySelector('.survey-modal .body2').classList.remove('hide');
    })
    .catch(err => window.alert('Feedback error: ' + err));
  };
  const conditionalCloseHandler = () => {
    if (document.querySelector('.stars').hasAttribute('data-value')) {
      window.location.reload();
    }
  };

  return (
    <ScrollLock isActive={isOpen}>
      <SurveyModalContainer className="survey-modal">
        <FontAwesomeIcon
          className="close-btn hide"
          icon={faTimes}
          onClick={conditionalCloseHandler}
        />
        <div className="body1">
          <img alt="" className="thanks-for-coming-out" src={ThanksForComingOutImg} />
          <div className="stars">
            {[1, 2, 3, 4, 5].map((v, i) => (
              <div
                className="star-pair"
                onClick={() => starRatingClickHandler(i)}
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
          ></textarea>
          <Button className="ar-button submit-btn disabled" onClick={surveySubmitAction}>
            <div className="ar-button-inner">SUBMIT</div>
          </Button>
        </div>
        <div className="body2 hide">
          <img alt="" className="thanks-for-your-feedback" src={ThanksForYourFeedbackImg} />
          <Button
            className="ar-button book-next-session-btn"
            inverted={false}
            onClick={() => {
              if (redirectUrl) {
                window.localStorage.removeItem('redirect');
                history.push(redirectUrl);
              } else {
                history.push(ROUTES.LOCATIONS);
              }
            }}
          >
            <div className="ar-button-inner">BOOK NEXT SESSION</div>
          </Button>
        </div>
      </SurveyModalContainer>
    </ScrollLock>
  );
};

SurveyModal.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default SurveyModal;
