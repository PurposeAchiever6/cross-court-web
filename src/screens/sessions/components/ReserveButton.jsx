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
            <AlternativeButton className="btn-alternative">JOIN WAITLIST</AlternativeButton>
          </a>
        );
      }
      return (
        <Button
          className="ar-button double reserve-btn"
          onClick={reserveSessionAction}
          disabled={isPast(sessionDate)}
        >
          <div className="ar-button-inner">RESERVE SESSION</div>
          <div className="double-drop"></div>
        </Button>
      );
    }

    if (equals(session.userSession.state, 'reserved')) {
      return (
        <Button
          className="ar-button double reserve-btn"
          onClick={confirmSessionAction}
          disabled={not(session.userSession.inConfirmationTime)}
        >
          <div className="ar-button-inner">CONFIRM SESSION</div>
          <div className="double-drop"></div>
        </Button>
      );
    }
    if (equals(session.userSession.state, 'confirmed')) {
      return (
        <Button className="ar-button double disabled reserve-btn" disabled>
          <div className="ar-button-inner">SESSION CONFIRMED</div>
          <div className="double-drop"></div>
        </Button>
      );
    }
  }

  return (
    <Button className="ar-button reserve-btn" onClick={signupBookSessionAction}>
      <div className="ar-button-inner">CONFIRM RESERVATION</div>
    </Button>
  );
};

ReserveButton.propTypes = {
  reserveSessionAction: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
  confirmSessionAction: PropTypes.func.isRequired,
  signupBookSessionAction: PropTypes.func.isRequired,
};

export default ReserveButton;
