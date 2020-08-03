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
        <p>The session was re-confirmed successfully!</p>
        <button
          className="ar-button double invite-a-friend-button"
          data-href={'sms:?&body=' + encodeURI(SHARE_URL)}
          onClick={e => {
            var input = document.createElement('input');
            input.setAttribute('value', SHARE_URL);
            document.body.appendChild(input);
            input.select();
            var result = document.execCommand('copy');
            document.body.removeChild(input);
            document.querySelector('.invite-a-friend-button .ar-button-inner').innerHTML  = 'COPIED!';
          }}
        >
          <div className="ar-button-inner">
            <FontAwesomeIcon icon={faExternalLinkAlt} /> INVITE A FRIEND
          </div>
          <div className="double-drop"></div>
        </button>
        <br />
        <ArButton className="done-button" link={ROUTES.MYACCOUNT}>
          DONE
        </ArButton>
      </div>
    </SessionConfirmedContainer>
  );
};

export default SessionConfirmed;
