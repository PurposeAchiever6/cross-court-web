import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import runtimeEnv from '@mars/heroku-js-runtime-env';

import SportCharacter from 'shared/images/sport-character.png';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import ROUTES from 'shared/constants/routes';
import { getSessionId, getSessionDate } from '../reducer';

const SessionConfirmed = () => {
  const sessionId = useSelector(getSessionId);
  const sessionDate = useSelector(getSessionDate);
  const [copied, setCopied] = useState(false);

  const env = runtimeEnv();
  const APP_URL = env.REACT_APP_URL;
  const SHARE_URL = `${APP_URL}/session/${sessionId}/${sessionDate}`;
  return (
    <div className="session-confirmed">
      <div className="session-info-container">
        <img className="sport-character-image" src={SportCharacter} alt="Sport Icon" />
        <p>The session was re-confirmed successfully!</p>
        <PrimaryButton
          double
          className="invite-a-friend-button"
          data-href={`sms:?&body=${encodeURI(SHARE_URL)}`}
          onClick={() => {
            const input = document.createElement('input');
            input.setAttribute('value', SHARE_URL);
            document.body.appendChild(input);
            input.select();
            document.body.removeChild(input);
            setCopied(true);
          }}
        >
          <FontAwesomeIcon icon={faExternalLinkAlt} /> {copied ? 'COPIED' : 'INVITE A FRIEND'}
          <div className="double-drop" />
        </PrimaryButton>
        <br />
        <PrimaryButton className="done-button" to={ROUTES.MYACCOUNT}>
          DONE
        </PrimaryButton>
      </div>
    </div>
  );
};

export default SessionConfirmed;
