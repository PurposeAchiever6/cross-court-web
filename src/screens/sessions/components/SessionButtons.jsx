import React from 'react';
import { isNil } from 'ramda';
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from 'screens/auth/reducer';

import ReserveButton from './ReserveButton';
import CancelButton from './CancelButton';

const SessionButtons = ({
  session,
  reserveSessionAction,
  confirmSessionAction,
  showCancelModalAction,
  userProfile,
}) => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  return (
    <>
      {(userProfile.credits > 0 || !isAuthenticated) && (
        <ReserveButton
          reserveSessionAction={reserveSessionAction}
          confirmSessionAction={confirmSessionAction}
          session={session}
        />
      )}
      {isAuthenticated && !isNil(session.user_session) && (
        <CancelButton modalToggler={showCancelModalAction} session={session} />
      )}
    </>
  );
};

export default SessionButtons;
