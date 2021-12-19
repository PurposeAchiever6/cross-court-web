import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import ROUTES from 'shared/constants/routes';
import colors from 'shared/styles/constants';
import SportCharacter from 'shared/images/sport-character.png';

import { getUserProfile } from 'screens/my-account/reducer';
import { getSessionInfo, getSessionDate } from 'screens/sessions/reducer';
import { formatShareSessionDate, formatShareSessionTime } from 'shared/utils/date';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import { isUserInFirstFreeSessionFlow } from 'shared/utils/user';

const SessionBookedContainer = styled.div`
  .title {
    font-family: shapiro95_super_wide;
    color: ${colors.brandBlack};
    font-size: 24px;
    line-height: 24px;
    @media (min-width: 992px) {
      font-size: 33px;
      line-height: 33px;
    }
  }

  .subtitle {
    color: ${colors.brandBlack};
    font-family: dharma_gothic_cexbold;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: ${colors.brandBlack};
    font-family: shapiro95_super_wide;
    font-size: 26px;
    line-height: 26px;
    @media (min-width: 992px) {
      font-size: 36px;
      line-height: 36px;
    }
  }

  .black-btn {
    border: 3px solid black;
    .content {
      border: 0;
      color: black;
      transition: 500ms background-color ease, 500ms color ease;
      :hover {
        background-color: black;
        color: white;
      }
    }
  }
`;

const SessionReserved = () => {
  const history = useHistory();

  const [copied, setCopied] = useState(false);

  const sessionInfo = useSelector(getSessionInfo);
  const sessionDate = useSelector(getSessionDate);
  const userProfile = useSelector(getUserProfile);

  const copyShareInfoToClipboard = () => {
    const input = document.createElement('input');
    const SHARE_URL = `${window.location.origin}/session/${sessionInfo.id}/${sessionDate}`;
    const SHARE_MSG = `I just signed up for the Crosscourt ${
      sessionInfo.location.name
    } session at ${formatShareSessionTime(sessionInfo.time)} on ${formatShareSessionDate(
      sessionDate
    )}. Use my link to sign up. ${SHARE_URL}`;
    input.setAttribute('value', SHARE_MSG);
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    setCopied(true);
  };

  useEffect(() => {
    if (isUserInFirstFreeSessionFlow(userProfile)) {
      history.push(ROUTES.FIRSTSESSIONRESERVED);
    }
  }, [history, userProfile]);

  return (
    <SessionBookedContainer>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <img className="w-52" src={SportCharacter} alt="Sport Icon" />
        <p className="title">SESSION BOOKED</p>
        <p className="subtitle">SUCCESSFULLY!</p>
        <PrimaryButton className="mt-6 mb-4" onClick={copyShareInfoToClipboard}>
          <FontAwesomeIcon icon={faExternalLinkAlt} /> {copied ? 'COPIED' : 'INVITE A FRIEND'}
        </PrimaryButton>
        <PrimaryButton bg="transparent" className="black-btn" to={ROUTES.MYACCOUNT}>
          DONE
        </PrimaryButton>
      </div>
    </SessionBookedContainer>
  );
};

export default SessionReserved;
