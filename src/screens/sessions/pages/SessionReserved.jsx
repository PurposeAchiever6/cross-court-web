import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import ROUTES from 'shared/constants/routes';
import colors from 'shared/styles/constants';
import SportCharacter from 'shared/images/sport-character.png';

import { getSessionInfo, getSessionDate } from '../reducer';
import { formatShareSessionDate, formatShareSessionTime } from 'shared/utils/date';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

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
  const sessionInfo = useSelector(getSessionInfo);
  const sessionDate = useSelector(getSessionDate);
  const [copied, setCopied] = useState(false);

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

  return (
    <SessionBookedContainer className="md:absolute left-1/2 top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
      <div className="flex flex-col items-center py-12">
        <img className="w-52" src={SportCharacter} alt="Sport Icon" />
        <p className="title">SESSION BOOKED</p>
        <p className="subtitle">SUCCESSFULLY!</p>
        <PrimaryButton className="mt-6 mb-4" onClick={copyShareInfoToClipboard} double>
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
