import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from 'screens/auth/reducer';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ReserveButton from './ReserveButton';
import CancelButton from './CancelButton';
import ROUTES from 'shared/constants/routes';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { getSessionDate } from 'screens/sessions/reducer';
import {
  formatShareSessionDate,
  formatShareSessionTime,
  formatSessionTime,
  formatSessionDate,
} from 'shared/utils/date';

const SessionButtons = ({
  session,
  reserveSessionAction,
  confirmSessionAction,
  showCancelModalAction,
  userProfile,
  signupBookSessionAction,
  createAndReserveFreeSessionHandler,
  disabled,
}) => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const history = useHistory();
  const [copied, setCopied] = useState(false);
  const sessionDate = useSelector(getSessionDate);
  const reservedOrConfirmed =
    (session?.userSession && ['reserved', 'confirmed'].includes(session.userSession.state)) ||
    false;

  const copyShareInfoToClipboard = () => {
    const input = document.createElement('input');

    const SHARE_URL = `${window.location.origin}/session/${session.id}/${sessionDate}`;
    const SHARE_MSG = `I just signed up for the Crosscourt ${
      session.location.name
    } session at ${formatShareSessionTime(session.time)} on ${formatShareSessionDate(
      sessionDate
    )}. Use my link to sign up. ${SHARE_URL}`;
    input.setAttribute('value', SHARE_MSG);
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    setCopied(true);
  };

  const emailSessionDate = formatSessionDate(sessionDate);
  const sessionTime = formatSessionTime(session.time);
  const mailInfo = `mailto:ccteam@cross-court.com?subject=Join Waitlist&body=I would like to be added to the waitlist for the ${sessionTime} session on ${emailSessionDate} at ${session.location.name}. Please notify me if a spot opens up. You can reach me at ${userProfile.phoneNumber}.`;

  return (
    <div className="flex flex-col">
      {(session?.past || session?.full) && (
        <PrimaryButton
          className="mb-4"
          onClick={() => history.push(ROUTES.LOCATIONS)}
          disabled={disabled}
        >
          FIND NEW SESSION
        </PrimaryButton>
      )}
      {!session?.past && (
        <>
          <ReserveButton
            reserveSessionAction={reserveSessionAction}
            confirmSessionAction={confirmSessionAction}
            signupBookSessionAction={signupBookSessionAction}
            session={session}
            createAndReserveFreeSessionHandler={createAndReserveFreeSessionHandler}
            disabled={disabled}
          />
          {isAuthenticated && (
            <>
              {session?.full && !reservedOrConfirmed && (
                <a href={mailInfo}>
                  <PrimaryButton className="mb-4" disabled={disabled}>
                    JOIN WAITLIST
                  </PrimaryButton>
                </a>
              )}
              {reservedOrConfirmed && (
                <>
                  <PrimaryButton className="mb-4" onClick={copyShareInfoToClipboard}>
                    <FontAwesomeIcon className="mr-1" icon={faExternalLinkAlt} />
                    {copied ? 'COPIED' : 'INVITE A FRIEND'}
                  </PrimaryButton>
                  <CancelButton modalToggler={showCancelModalAction} />
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

SessionButtons.defaultProps = {
  disabled: false,
};

SessionButtons.propTypes = {
  reserveSessionAction: PropTypes.func.isRequired,
  confirmSessionAction: PropTypes.func.isRequired,
  showCancelModalAction: PropTypes.func.isRequired,
  signupBookSessionAction: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
};

export default SessionButtons;
