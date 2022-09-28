import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import userSessionService from 'screens/userSessions/service';
import Spinner from 'shared/components/Spinner';
import missingProfileImg from 'shared/images/missing-profile-image.png';

const SessionRoster = ({ sessionId, date, className }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserSessions = async () => {
      setLoading(true);
      const userSessions = await userSessionService.getUserSessionList(sessionId, {
        date: new Date(date).toLocaleDateString('en-US'),
      });

      setUsers(userSessions.map((userSession) => userSession.user));
      setLoading(false);
    };

    if (sessionId) {
      fetchUserSessions();
    }
  }, [sessionId, date]);

  if (loading)
    return (
      <div className="flex items-center text-sm">
        <p className="mr-2">Loading</p>
        <Spinner />
      </div>
    );

  if (!loading && users.length === 0) return <div className="text-sm">No reservations yet</div>;

  return (
    <div className={className}>
      {users.map((user, index) => (
        <div className="flex items-center mb-2" key={user.id}>
          <span className="font-shapiro95_super_wide w-6 text-right inline-block mr-3">
            {index + 1}
          </span>
          <img
            className="w-6 h-6 object-cover rounded-full mr-2"
            src={user.imageUrl ? user.imageUrl : missingProfileImg}
            alt="profile-img"
          />
          <span className="capitalize">{`${user.firstName} ${user.lastName}`}</span>
        </div>
      ))}
    </div>
  );
};

SessionRoster.defaultProps = {
  className: '',
};

SessionRoster.propTypes = {
  sessionId: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default SessionRoster;
