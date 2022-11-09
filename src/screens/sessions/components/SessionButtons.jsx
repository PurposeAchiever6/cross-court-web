import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import { formatShareSessionDate, formatShareSessionTime } from 'shared/utils/date';
import { userHasCreditsForSession } from 'shared/utils/user';
import { reserveTeamReservationAllowed } from 'shared/utils/sessions';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import { getSessionDate } from 'screens/sessions/reducer';
import {
  joinSessionWaitlistInit,
  removeSessionWaitlistInit,
} from 'screens/sessions/actionCreators';
import { sessionGuestsAllowed } from 'screens/sessions/utils';

import ReserveButton from './ReserveButton';
import CancelButton from './CancelButton';
import SessionGuests from './SessionGuests';

const SessionButtons = ({
  session,
  reserveSessionAction,
  confirmSessionAction,
  showCancelModalAction,
  signupBookSessionAction,
  createAndReserveFreeSessionHandler,
  disabled,
  setShowAddGuestModal,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(getIsAuthenticated);
  const userProfile = useSelector(getUserProfile);
  const sessionDate = useSelector(getSessionDate);

  const { activeSubscription, reserveTeam } = userProfile;
  const subscriptionPaused = activeSubscription?.paused;

  const { isOpenClub, past, time, reservationsCount, isPrivate, onWaitlist } = session;

  const reserveTeamAllowed = reserveTeamReservationAllowed({
    sessionTime: time,
    sessionDate,
    reservationsCount,
    isOpenClub,
    past,
    isReserveTeam: reserveTeam,
    isPrivate,
  });

  const guestsAllowed = sessionGuestsAllowed(session);

  const reserveTeamNotAllowed = reserveTeam ? !reserveTeamAllowed : false;

  const reservationDisabled = disabled || subscriptionPaused || reserveTeamNotAllowed;

  const [copied, setCopied] = useState(false);

  const reservedOrConfirmed =
    (session?.userSession && ['reserved', 'confirmed'].includes(session.userSession.state)) ||
    false;

  const shootingMachineReservation = session?.userSession?.shootingMachineReservation;

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
      {(past || (session?.full && !reservedOrConfirmed)) && (
        <PrimaryButton
          className="mb-4"
          onClick={() => history.push(ROUTES.LOCATIONS)}
          disabled={disabled}
        >
          FIND NEW SESSION
        </PrimaryButton>
      )}
      {!past && (
        <>
          <ReserveButton
            reserveSessionAction={reserveSessionAction}
            confirmSessionAction={confirmSessionAction}
            signupBookSessionAction={signupBookSessionAction}
            session={session}
            createAndReserveFreeSessionHandler={createAndReserveFreeSessionHandler}
            disabled={reservationDisabled}
          />
          {subscriptionPaused && (
            <p className="text-sm mt-4">
              You can't reserve when your <br /> membership is paused
            </p>
          )}
          {reserveTeamNotAllowed && !reservedOrConfirmed && !onWaitlist && (
            <p className="text-sm mt-4">Reserve team restricted</p>
          )}
          {isAuthenticated && (
            <>
              {onWaitlist && (
                <PrimaryButton
                  onClick={onClickRemoveFromWaitlist}
                  className="mb-4"
                  disabled={disabled}
                >
                  OUT WAITLIST
                </PrimaryButton>
              )}
              {session?.full && !onWaitlist && !reservedOrConfirmed && (
                <PrimaryButton onClick={onClickJoinWaitlist} className="mb-4" disabled={disabled}>
                  JOIN WAITLIST
                </PrimaryButton>
              )}
              {reservedOrConfirmed &&
                !session?.full &&
                (guestsAllowed ? (
                  <SessionGuests session={session} setShowAddGuestModal={setShowAddGuestModal} />
                ) : (
                  <PrimaryButton inverted className="mb-4" onClick={copyShareInfoToClipboard}>
                    <FontAwesomeIcon className="mr-1" icon={faExternalLinkAlt} />
                    {copied ? 'COPIED' : 'INVITE A FRIEND'}
                  </PrimaryButton>
                ))}
              {reservedOrConfirmed && <CancelButton modalToggler={showCancelModalAction} />}
              {shootingMachineReservation && (
                <div className="text-sm">
                  You have reserved a shooting machine from {shootingMachineReservation.startTime}{' '}
                  to {shootingMachineReservation.endTime}
                </div>
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
  createAndReserveFreeSessionHandler: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  setShowAddGuestModal: PropTypes.func.isRequired,
};

export default SessionButtons;
