import React from 'react';
import PropTypes from 'prop-types';

import BadgeWithInfo from 'shared/components/BadgeWithInfo';

const SessionBadge = ({ skillLevel, isOpenClub, womenOnly, skillSession, variant }) => {
  if (isOpenClub) {
    return (
      <BadgeWithInfo
        info="All members can access the club to shootaround, train, or self-organize own runs (included with memberships)."
        variant={variant}
      >
        Open Club
      </BadgeWithInfo>
    );
  }

  if (womenOnly) {
    return (
      <BadgeWithInfo
        info="Women sessions are designed for the women out there who are tired of the male dominated pickup basketball culture. These sessions enable women to shed sweat and stress through the power of team sport."
        variant={variant}
      >
        Women
      </BadgeWithInfo>
    );
  }

  if (skillSession) {
    return (
      <BadgeWithInfo
        info="60 minute, trainer led, group workout for members to level up their game. Work on handles, shooting, passing, endurance, and more in this high intensity, community driven experience."
        variant={variant}
      >
        Skill Session
      </BadgeWithInfo>
    );
  }

  return (
    <BadgeWithInfo info={skillLevel.description} variant={variant}>
      {`${skillLevel.min} - ${skillLevel.max}`}
    </BadgeWithInfo>
  );
};

SessionBadge.defaultProps = {
  skillLevel: null,
  variant: 'black',
};

SessionBadge.propTypes = {
  skillLevel: PropTypes.shape(),
  isOpenClub: PropTypes.bool.isRequired,
  womenOnly: PropTypes.bool.isRequired,
  skillSession: PropTypes.bool.isRequired,
  variant: PropTypes.string,
};

export default SessionBadge;
