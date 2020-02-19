import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isNil, equals, not } from 'ramda';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import Button from 'shared/components/Button';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { isPast } from 'shared/utils/date';

import { getSessionDate } from '../reducer';

const ReserveButton = ({ reserveSessionAction, session, confirmSessionAction }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const sessionDate = useSelector(getSessionDate);

  if (isAuthenticated) {
    if (isNil(session.userSession)) {
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
    <Link to={ROUTES.LOGIN}>
      <Button className="reserve-btn">Reserve</Button>
    </Link>
  );
};

ReserveButton.propTypes = {
  reserveSessionAction: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
  confirmSessionAction: PropTypes.func.isRequired,
};

export default ReserveButton;
