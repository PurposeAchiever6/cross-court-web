import React from 'react';
import { useSelector } from 'react-redux';
import { isNil, equals, not } from 'ramda';
import PropTypes from 'prop-types';

import Button from 'shared/components/Button';
import AlternativeButton from 'shared/components/AlternativeButton';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { isPast, formatSessionTime, formatSessionDate } from 'shared/utils/date';
import { getUserProfile } from 'screens/my-account/reducer';

import { getSessionDate } from '../reducer';

const ReserveButton = ({
  reserveSessionAction,
  session,
  confirmSessionAction,
  signupBookSessionAction,
}) => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const sessionDate = useSelector(getSessionDate);
  const { phoneNumber } = useSelector(getUserProfile);

  const emailSessionDate = formatSessionDate(sessionDate);
  const sessionTime = formatSessionTime(session.time);
  const mailInfo = `mailto:info@crosscourt.com?subject=Join Waitlist&body=I would like to be added to the waitlist for the ${sessionTime} session on ${emailSessionDate} at ${session.location.name}. Please notify me if a spot opens up. You can reach me at ${phoneNumber}.`;

  if (isAuthenticated) {
    if (isNil(session.userSession)) {
      if (session.full) {
        return (
          <a href={mailInfo}>
            <AlternativeButton className="btn-alternative">Join Waitlist</AlternativeButton>
          </a>
        );
      }
      return (
        <Button
          className="reserve-btn"
          onClick={reserveSessionAction}
          disabled={isPast(sessionDate)}
        >
          Reserve Session
        </Button>
      );
    }

    if (equals(session.userSession.state, 'reserved')) {
      return (
        <Button
          className="reserve-btn"
          onClick={confirmSessionAction}
          disabled={not(session.userSession.inConfirmationTime)}
        >
          Confirm Session
        </Button>
      );
    }
    if (equals(session.userSession.state, 'confirmed')) {
      return (
        <Button className="reserve-btn" disabled>
          Session Confirmed
        </Button>
      );
    }
  }

  return (
    <Button className="reserve-btn" onClick={signupBookSessionAction}>
      Reserve
    </Button>
  );
};

ReserveButton.propTypes = {
  reserveSessionAction: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
  confirmSessionAction: PropTypes.func.isRequired,
};

export default ReserveButton;
