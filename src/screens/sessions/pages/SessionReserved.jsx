import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import ROUTES from 'shared/constants/routes';
import colors from 'shared/styles/constants';
import SportCharacter from 'shared/images/sport-character.png';
import ArButton from 'shared/components/ArButton';

import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer.js';
import { getSessionInfo, getSessionDate } from '../reducer';
import {
  formatShareSessionDate,
  formatShareSessionTime,
} from 'shared/utils/date';

const SessionReservedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .session-info-container {
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
      cursor: pointer;
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

  button {
    width: 100%;
    margin-bottom: 6rem;
  }
`;

const SessionReserved = () => {
  const sessionInfo = useSelector(getSessionInfo);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const sessionDate = useSelector(getSessionDate);

  const userProfile = useSelector(getUserProfile);

  const copyShareInfoToClipboard = () => {
    const input = document.createElement('input');
    const referralCode =
      isAuthenticated && userProfile.referralCode
        ? '?referralCode=' + userProfile.referralCode
        : '';
    const SHARE_URL = `${window.location.origin}/session/${sessionInfo.id}/${sessionDate}${referralCode}`;
    const SHARE_MSG = `I just signed up for the Crosscourt ${
      sessionInfo.location.name
    } session at ${formatShareSessionTime(sessionInfo.time)} on ${formatShareSessionDate(
      sessionDate
    )}. Your first Crosscourt session's free! Use my link to sign up. ${SHARE_URL}`;
    input.setAttribute('value', SHARE_MSG);
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    document.querySelector('.invite-a-friend-button .ar-button-inner').innerHTML = 'COPIED!';
  };

  return (
    <SessionReservedContainer className="session-reserved">
      <div className="session-info-container">
        <img className="sport-character-image" src={SportCharacter} alt="Sport Icon" />
        <h1>SESSION BOOKED</h1>
        <h2>SUCCESSFULLY!</h2>
        <button
          className="ar-button double invite-a-friend-button"
          onClick={copyShareInfoToClipboard}
        >
          <div className="ar-button-inner">
            <FontAwesomeIcon icon={faExternalLinkAlt} /> INVITE A FRIEND
          </div>
          <div className="double-drop"></div>
        </button>
        <p className="refer-a-new-friend-message">REFER A NEW PLAYER, GET A FREE SESSION WHEN THEY BOOK!</p>
        <ArButton className="done-button" inverted link={ROUTES.MYACCOUNT}>
          DONE
        </ArButton>
      </div>
    </SessionReservedContainer>
  );
};

export default SessionReserved;
