import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { formatSessionDate } from 'shared/utils/date';
import { getIsAuthenticated } from 'screens/auth/reducer';
import SessionVote from 'screens/locations/components/SessionVote';
import SessionCcCashEarned from 'screens/locations/components/SessionCcCashEarned';

const SessionExtraInformation = ({ session }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  const sessionDate = formatSessionDate(session.startTime);
  const sessionCcCashEarned = Number(session.ccCashEarned);

  if (isAuthenticated && session.comingSoon && !session.past) {
    return (
      <SessionVote
        sessionId={session.id}
        sessionDate={sessionDate}
        votes={session.votes}
        voted={session.voted}
        className="mt-2 lg:mt-0 lg:mr-3"
      />
    );
  }

  if (sessionCcCashEarned > 0) {
    return (
      <SessionCcCashEarned
        ccCash={sessionCcCashEarned}
        className="lg:self-start mt-2 lg:mt-0 lg:mr-3"
      />
    );
  }

  return null;
};

SessionExtraInformation.propTypes = {
  session: PropTypes.shape().isRequired,
};

export default SessionExtraInformation;
