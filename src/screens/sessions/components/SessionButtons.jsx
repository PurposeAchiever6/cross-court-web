import React from 'react';
import { isNil } from 'ramda';
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from 'screens/auth/reducer';
import PropTypes from 'prop-types';

import ReserveButton from './ReserveButton';
import CancelButton from './CancelButton';

const SessionButtons = ({
  session,
  reserveSessionAction,
  confirmSessionAction,
  showCancelModalAction,
  userProfile,
  signupBookSessionAction,
  createAndReserveFreeSessionHandler,
}) => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  return (
    <>
      {(userProfile.unlimitedCredits || userProfile.totalCredits > 0 || !isAuthenticated) && (
        <ReserveButton
          reserveSessionAction={reserveSessionAction}
          confirmSessionAction={confirmSessionAction}
          signupBookSessionAction={signupBookSessionAction}
          session={session}
          createAndReserveFreeSessionHandler={createAndReserveFreeSessionHandler}
        />
      )}
      {isAuthenticated && !isNil(session.userSession) && (
        <CancelButton modalToggler={showCancelModalAction} />
      )}
    </>
  );
};

SessionButtons.propTypes = {
  reserveSessionAction: PropTypes.func.isRequired,
  confirmSessionAction: PropTypes.func.isRequired,
  showCancelModalAction: PropTypes.func.isRequired,
  signupBookSessionAction: PropTypes.func.isRequired,
  userProfile: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
};

export default SessionButtons;
