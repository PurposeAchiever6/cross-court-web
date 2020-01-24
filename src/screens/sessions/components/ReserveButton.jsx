import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isNil, equals } from 'ramda';

import ROUTES from 'shared/constants/routes';
import Button from 'shared/components/Button';
import { getIsAuthenticated } from 'screens/auth/reducer';

const ReserveButton = ({ reserveSessionAction, session, confirmSessionAction }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  if (isAuthenticated) {
    if (isNil(session.user_session)) {
      return (
        <Button className="reserve-btn" onClick={reserveSessionAction}>
          Reserve Session
        </Button>
      );
    }

    if (equals(session.user_session.state, 'reserved')) {
      return (
        <Button className="reserve-btn" onClick={confirmSessionAction}>
          Confirm Session
        </Button>
      );
    }
    if (equals(session.user_session.state, 'confirmed')) {
      return (
        <Button className="reserve-btn" disabled={equals(session.user_session.state, 'confirmed')}>
          Confirm Session
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

export default ReserveButton;
