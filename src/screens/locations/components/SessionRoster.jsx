import React from 'react';
import PropTypes from 'prop-types';

import missingProfileImg from 'shared/images/missing-profile-image.png';

const SessionRoster = ({ users, className }) => (
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
    {users.length === 0 && <div className="text-sm">No reservations yet</div>}
  </div>
);

SessionRoster.defaultProps = {
  className: '',
};

SessionRoster.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  className: PropTypes.string,
};

export default SessionRoster;
