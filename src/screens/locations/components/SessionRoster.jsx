import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { formatSessionDate } from 'shared/utils/date';
import userSessionService from 'screens/user-sessions/service';
import Spinner from 'shared/components/Spinner';
import Avatar from 'shared/components/Avatar';

const SessionRoster = ({ session, className }) => {
  const [loadingUserSessions, setLoadingUserSessions] = useState(false);
  const [userSessions, setUserSessions] = useState([]);

  const { id, startTime } = session;
  const date = formatSessionDate(startTime);

  useEffect(() => {
    const fetchUserSessions = async () => {
      setLoadingUserSessions(true);

      const userSessions = await userSessionService.getUserSessionList(id, {
        date: new Date(date).toLocaleDateString('en-US'),
      });

      setUserSessions(userSessions);
      setLoadingUserSessions(false);
    };

    if (id) {
      fetchUserSessions();
    }
  }, [id, date]);

  if (loadingUserSessions) {
    return (
      <div className={className}>
        <div className="flex justify-center items-center text-sm">
          <span className="mr-2">Loading</span>
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex md:flex-wrap justify-center gap-2 overflow-y-auto md:overflow-y-visible">
        {userSessions.length === 0 ? (
          <div className="text-xs md:text-sm">No reservations yet</div>
        ) : (
          userSessions.map(({ isFirstSession, user, goal }) => (
            <Avatar
              key={user.id}
              img={user.imageUrl}
              size="sm"
              badge={isFirstSession ? 'New' : null}
              tooltip={`${user.firstName} ${user.lastName} ${goal ? `(${goal})` : ''}`}
              className="shrink-0"
            />
          ))
        )}
      </div>
    </div>
  );
};

SessionRoster.defaultProps = {
  className: '',
};

SessionRoster.propTypes = {
  session: PropTypes.shape().isRequired,
  className: PropTypes.string,
};

export default SessionRoster;
