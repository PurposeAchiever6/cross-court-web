import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { requestFormattedDate } from 'shared/utils/date';
import userSessionService from 'screens/user-sessions/service';
import Spinner from 'shared/components/Spinner';
import Avatar from 'shared/components/Avatar';
import UserCard from 'screens/sessions/components/UserCard';
import ShowMore from 'shared/components/ShowMore';

const SessionRoster = ({ session, date, showExpanded, className }) => {
  const [loadingUserSessions, setLoadingUserSessions] = useState(false);
  const [userSessions, setUserSessions] = useState([]);
  const [usersShown, setUsersShow] = useState(4);

  const { id } = session;

  useEffect(() => {
    const fetchUserSessions = async () => {
      setLoadingUserSessions(true);

      const userSessions = await userSessionService.getUserSessionList(id, {
        date: requestFormattedDate(date),
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

  if (userSessions.length === 0) {
    return (
      <div className={className}>
        <div className="text-xs md:text-sm">No reservations yet</div>
      </div>
    );
  }

  return (
    <div className={className}>
      {showExpanded ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {userSessions.map(({ isFirstSession, user }, index) =>
              index + 1 > usersShown ? null : (
                <UserCard key={user.id} user={user} newLabel={isFirstSession} expanded={false} />
              )
            )}
          </div>
          {usersShown < userSessions.length && (
            <ShowMore onClick={() => setUsersShow(usersShown + 4)} className="mt-6" />
          )}
        </div>
      ) : (
        <div className="flex md:flex-wrap justify-center gap-2 overflow-y-auto md:overflow-y-visible">
          {userSessions.map(({ isFirstSession, user, goal }) => (
            <Avatar
              key={user.id}
              img={user.imageUrl}
              size="sm"
              badge={isFirstSession ? 'New' : null}
              tooltip={`${user.firstName} ${user.lastName} ${goal ? `(${goal})` : ''}`}
              className="shrink-0"
            />
          ))}
        </div>
      )}
    </div>
  );
};

SessionRoster.defaultProps = {
  showExpanded: false,
  className: '',
};

SessionRoster.propTypes = {
  session: PropTypes.shape().isRequired,
  date: PropTypes.string.isRequired,
  showExpanded: PropTypes.bool,
  className: PropTypes.string,
};

export default SessionRoster;
