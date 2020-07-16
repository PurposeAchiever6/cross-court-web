import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import runtimeEnv from '@mars/heroku-js-runtime-env';

import colors from 'shared/styles/constants';
import SportCharacter from 'shared/images/sport-character.png';
import ArButton from 'shared/components/ArButton';
import ROUTES from 'shared/constants/routes';
import { getSessionId, getSessionDate } from '../reducer';

const SessionConfirmedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .session-info-container {
    width: 30rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  img {
    margin-bottom: 2.75rem;
    margin-top: 5rem;
  }

  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${colors.black};
    margin-bottom: 3rem;
    width: 70%;
    text-align: center;
  }
  span {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 2.5rem;
  }

  .share-buttons-container {
    display: flex;
    margin-bottom: 5rem;

    button {
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.14);
      border-radius: 2px;
      font-size: 1rem;
      border: 0;
      margin: 0 10px;
      height: 2.5rem;
      width: 2.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .facebook {
      background: #3b5998;
      color: ${colors.white};
    }

    .whatsapp {
      background-color: #40c351;
      color: ${colors.white};
    }

    .facebook-messenger {
      background-color: ${colors.white};
      color: #448aff;
    }

    .external-link {
      background-color: ${colors.white};
      color: ${colors.black};
    }
  }

  a {
    width: 59%;
  }

  button {
    width: 100%;
    margin-bottom: 6rem;
  }
`;

const SessionConfirmed = () => {
  const sessionId = useSelector(getSessionId);
  const sessionDate = useSelector(getSessionDate);

  const env = runtimeEnv();
  const APP_URL = env.REACT_APP_URL;
  const SHARE_URL = `${APP_URL}/session/${sessionId}/${sessionDate}`;
  return (
    <SessionConfirmedContainer className="session-confirmed">
      <div className="session-info-container">
        <img className="sport-character-image" src={SportCharacter} alt="Sport Icon" />
        <h1>The session was re-confirmed successfully!</h1>
        <a
          className="ar-button double invite-a-friend-button"
          href={'sms:?&body=' + encodeURI(SHARE_URL)}
        >
          <div className="ar-button-inner">
            <FontAwesomeIcon icon={faExternalLinkAlt} /> INVITE A FRIEND
          </div>
          <div className="double-drop"></div>
        </a>
        <ArButton className="done-button" link={ROUTES.MYACCOUNT}>
          DONE
        </ArButton>
      </div>
    </SessionConfirmedContainer>
  );
};

export default SessionConfirmed;
