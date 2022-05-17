import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import { formatShareSessionDate, formatShareSessionTime } from 'shared/utils/date';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import { getSessionDate } from 'screens/sessions/reducer';
import {
  joinSessionWaitlistInit,
  removeSessionWaitlistInit,
} from 'screens/sessions/actionCreators';

import ReserveButton from './ReserveButton';
import CancelButton from './CancelButton';

const SessionButtons = ({
  session,
  reserveSessionAction,
  confirmSessionAction,
  showCancelModalAction,
  signupBookSessionAction,
  createAndReserveFreeSessionHandler,
  disabled,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(getIsAuthenticated);
  const userProfile = useSelector(getUserProfile);
  const sessionDate = useSelector(getSessionDate);

  const { activeSubscription } = userProfile;
  const subscriptionPaused = activeSubscription?.paused;
  const reservationDisabled = disabled || subscriptionPaused;

  const [copied, setCopied] = useState(false);

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

  const onClickJoinWaitlist = (sessionId, sessionDate) => {
    if (!userProfile.unlimitedCredits && userProfile.totalCredits === 0) {
      return history.push({
        pathname: ROUTES.MEMBERSHIPS,
        state: { showNoCreditsAnimation: true },
      });
    }

    dispatch(joinSessionWaitlistInit(sessionId, sessionDate));
  };

  const onClickRemoveFromWaitlist = (sessionId, sessionDate) => {
    dispatch(removeSessionWaitlistInit(sessionId, sessionDate));
  };

  return (
    <div className="flex flex-col items-center">
      {(session?.past || (session?.full && !reservedOrConfirmed)) && (
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
            disabled={reservationDisabled}
          />
          {subscriptionPaused && <p>You can't reserve when your membership is paused.</p>}
          {isAuthenticated && (
            <>
              {session?.onWaitlist && (
                <PrimaryButton
                  onClick={() => onClickRemoveFromWaitlist(session.id, sessionDate)}
                  className="mb-4"
                  disabled={disabled}
                >
                  OUT WAITLIST
                </PrimaryButton>
              )}
              {session?.full && !session?.onWaitlist && !reservedOrConfirmed && (
                <PrimaryButton
                  onClick={() => onClickJoinWaitlist(session.id, sessionDate)}
                  className="mb-4"
                  disabled={disabled}
                >
                  JOIN WAITLIST
                </PrimaryButton>
              )}
              {reservedOrConfirmed && !session?.full && (
                <PrimaryButton className="mb-4" onClick={copyShareInfoToClipboard}>
                  <FontAwesomeIcon className="mr-1" icon={faExternalLinkAlt} />
                  {copied ? 'COPIED' : 'INVITE A FRIEND'}
                </PrimaryButton>
              )}
              {reservedOrConfirmed && <CancelButton modalToggler={showCancelModalAction} />}
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
