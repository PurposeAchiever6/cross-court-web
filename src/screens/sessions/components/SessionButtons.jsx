import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import SessionWarningInfo from 'shared/components/SessionWarningInfo';
import { formatShareSessionDate, formatShareSessionTime } from 'shared/utils/date';
import { userHasCreditsForSession } from 'shared/utils/user';
import { sessionReservationInfo } from 'shared/utils/sessions';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import { getSessionDate } from 'screens/sessions/reducer';
import {
  joinSessionWaitlistInit,
  removeSessionWaitlistInit,
} from 'screens/sessions/actionCreators';

import ReserveButton from './ReserveButton';
import CancelButton from './CancelButton';
import SessionGuests from './SessionGuests';
import { sessionGuestsAllowedForUser } from '../utils';

const SessionButtons = ({
  session,
  reserveSessionAction,
  confirmSessionAction,
  showCancelModalAction,
  signupBookSessionAction,
  createAndReserveFreeSessionHandler,
  setShowAddGuestModal,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(getIsAuthenticated);
  const userProfile = useSelector(getUserProfile);
  const sessionDate = useSelector(getSessionDate);

  const { activeSubscription } = userProfile;
  const subscriptionPaused = activeSubscription?.paused;

  const { past, time, onWaitlist } = session;

  const { disabled: disabledReservation } = sessionReservationInfo(session, userProfile);
  const reservationDisabled = disabledReservation || subscriptionPaused;

  const [copied, setCopied] = useState(false);

  const reservedOrConfirmed =
    (session?.userSession && ['reserved', 'confirmed'].includes(session.userSession.state)) ||
    false;

  const guestsAllowed = sessionGuestsAllowedForUser(session);

  const copyShareInfoToClipboard = () => {
    const input = document.createElement('input');

    const SHARE_URL = `${window.location.origin}/session/${session.id}/${sessionDate}`;
    const SHARE_MSG = `I just signed up for the Crosscourt ${
      session.location.name
    } session at ${formatShareSessionTime(time)} on ${formatShareSessionDate(
      sessionDate
    )}. Use my link to sign up. ${SHARE_URL}`;
    input.setAttribute('value', SHARE_MSG);
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    setCopied(true);
  };

  const onClickJoinWaitlist = () => {
    if (!userHasCreditsForSession(userProfile, session)) {
      return history.push({
        pathname: ROUTES.MEMBERSHIPS,
        state: { showNoCreditsAnimation: true },
      });
    }

    dispatch(joinSessionWaitlistInit(session.id, sessionDate));
  };

  const onClickRemoveFromWaitlist = () => {
    dispatch(removeSessionWaitlistInit(session.id, sessionDate));
  };

  return (
    <div className="flex flex-col items-center">
      {past ? (
        <PrimaryButton className="mb-4" onClick={() => history.push(ROUTES.LOCATIONS)}>
          FIND NEW SESSION
        </PrimaryButton>
      ) : (
        <>
          <ReserveButton
            reserveSessionAction={reserveSessionAction}
            confirmSessionAction={confirmSessionAction}
            signupBookSessionAction={signupBookSessionAction}
            session={session}
            createAndReserveFreeSessionHandler={createAndReserveFreeSessionHandler}
            disabled={reservationDisabled}
          />
          {isAuthenticated && (
            <>
              {onWaitlist && (
                <PrimaryButton onClick={onClickRemoveFromWaitlist} className="mb-4">
                  OUT WAITLIST
                </PrimaryButton>
              )}
              {session?.full && !onWaitlist && !reservedOrConfirmed && (
                <PrimaryButton
                  onClick={onClickJoinWaitlist}
                  className="mb-4"
                  disabled={reservationDisabled}
                >
                  JOIN WAITLIST
                </PrimaryButton>
              )}
              {reservedOrConfirmed && (
                <>
                  <SessionGuests
                    session={session}
                    setShowAddGuestModal={setShowAddGuestModal}
                    className="mb-4"
                  />
                  {!guestsAllowed && (
                    <PrimaryButton inverted className="mb-4" onClick={copyShareInfoToClipboard}>
                      <FontAwesomeIcon className="mr-1" icon={faExternalLinkAlt} />
                      {copied ? 'COPIED' : 'INVITE A FRIEND'}
                    </PrimaryButton>
                  )}
                </>
              )}
              {reservedOrConfirmed && (
                <CancelButton session={session} modalToggler={showCancelModalAction} />
              )}
              {subscriptionPaused && (
                <div className="text-sm">
                  You can't reserve when your <br /> membership is paused
                </div>
              )}
              {!subscriptionPaused && (
                <SessionWarningInfo session={session} userProfile={userProfile} />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

SessionButtons.propTypes = {
  reserveSessionAction: PropTypes.func.isRequired,
  confirmSessionAction: PropTypes.func.isRequired,
  showCancelModalAction: PropTypes.func.isRequired,
  signupBookSessionAction: PropTypes.func.isRequired,
  createAndReserveFreeSessionHandler: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
  setShowAddGuestModal: PropTypes.func.isRequired,
};

export default SessionButtons;
