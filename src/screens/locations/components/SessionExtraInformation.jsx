import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { formatSessionDate } from 'shared/utils/date';
import { getIsAuthenticated } from 'screens/auth/reducer';
import SessionVote from 'screens/locations/components/SessionVote';
import SessionCcCashEarned from 'screens/locations/components/SessionCcCashEarned';

const SessionExtraInformation = ({ session, className }) => {
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
        className={className}
      />
    );
  }

  if (sessionCcCashEarned > 0) {
    return <SessionCcCashEarned ccCash={sessionCcCashEarned} className={className} />;
  }

  return null;
};

SessionExtraInformation.defaultProps = {
  className: '',
};

SessionExtraInformation.propTypes = {
  session: PropTypes.shape().isRequired,
  className: PropTypes.string,
};

export default SessionExtraInformation;
