import React from 'react';
import PropTypes from 'prop-types';
import SkillLevelWarning from 'screens/sessions/components/SkillLevelWarning';
import SessionBadge from 'screens/sessions/components/SessionBadge';
import { sessionData } from 'screens/sessions/utils';

const SessionInfo = ({ isAuthenticated, userProfile, date, sessionInfo }) => {
  return (
    <div className="mb-8 flex flex-col items-center md:items-start">
      {isAuthenticated && <SkillLevelWarning userProfile={userProfile} sessionInfo={sessionInfo} />}
      {sessionData(date, sessionInfo).map((data, i) => (
        <div className="flex flex-col mb-8" key={`info-${i}`}>
          <span className="uppercase block tracking-wider font-semibold">{data.title}</span>
          <span className="font-shapiro45_welter_extd text-sm uppercase">{data.value}</span>
        </div>
      ))}
      <SessionBadge
        skillLevel={sessionInfo.skillLevel}
        isOpenClub={sessionInfo.isOpenClub}
        womenOnly={sessionInfo.womenOnly}
        skillSession={sessionInfo.skillSession}
        variant="white"
      />
    </div>
  );
};

SessionInfo.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userProfile: PropTypes.object.isRequired,
  sessionInfo: PropTypes.object.isRequired,
  date: PropTypes.string,
};

export default SessionInfo;
