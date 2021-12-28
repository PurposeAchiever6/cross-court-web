import React, { useState } from 'react';
import { isNil } from 'ramda';
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
import { formatShareSessionDate, formatShareSessionTime } from 'shared/utils/date';

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
  const isSessionComplete = session.past;
  const isSessionFull = session.spotsLeft === 0;

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

  return (
    <>
      {isAuthenticated &&
        !isSessionComplete &&
        !isSessionFull &&
        session?.userSession &&
        ['reserved', 'confirmed'].indexOf(session.userSession.state) !== -1 && (
          <div className="mb-8">
            <PrimaryButton onClick={copyShareInfoToClipboard}>
              <FontAwesomeIcon className="mr-1" icon={faExternalLinkAlt} />
              {copied ? 'COPIED' : 'INVITE A FRIEND'}
            </PrimaryButton>
          </div>
        )}
      {session && !session.past && (
        <>
          {(userProfile.unlimitedCredits || userProfile.totalCredits > 0 || !isAuthenticated) && (
            <ReserveButton
              reserveSessionAction={reserveSessionAction}
              confirmSessionAction={confirmSessionAction}
              signupBookSessionAction={signupBookSessionAction}
              session={session}
              createAndReserveFreeSessionHandler={createAndReserveFreeSessionHandler}
              disabled={disabled}
            />
          )}
          {isAuthenticated && !isNil(session.userSession) && (
            <CancelButton modalToggler={showCancelModalAction} />
          )}
        </>
      )}
      {isAuthenticated &&
        !userProfile.unlimitedCredits &&
        userProfile.totalCredits === 0 &&
        !isSessionComplete &&
        !isSessionFull &&
        (!session.userSession ||
          (session.userSession &&
            ['reserved', 'confirmed'].indexOf(session.userSession.state) === -1)) && (
          <PrimaryButton
            onClick={() => {
              window.localStorage.setItem('redirect', window.location.pathname);
              history.push(ROUTES.MEMBERSHIPS);
            }}
            disabled={disabled}
          >
            CONFIRM RESERVATION
          </PrimaryButton>
        )}
      {session && (isSessionComplete || isSessionFull) && (
        <PrimaryButton onClick={() => history.push(ROUTES.LOCATIONS)} disabled={disabled}>
          FIND NEW SESSION
        </PrimaryButton>
      )}
    </>
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
  userProfile: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
};

export default SessionButtons;
