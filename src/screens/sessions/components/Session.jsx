import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import SessionInfo from 'screens/sessions/components/SessionInfo';
import SkillLevelWarning from 'screens/sessions/components/SkillLevelWarning';
import { getSessionsMessageContainerText } from 'screens/sessions/utils';

const Session = ({ sessionInfo, isAuthenticated, userProfile }) => {
  const { date } = useParams();
  const isSessionComplete = sessionInfo.past;
  const isSessionFull = sessionInfo.spotsLeft === 0;
  const isSkillSession = sessionInfo.skillSession;

  return (
    <div className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-between py-12 px-4 md:p-8 font-shapiro95_super_wide text-white">
      {isAuthenticated && <SkillLevelWarning userProfile={userProfile} sessionInfo={sessionInfo} />}
      <SessionInfo date={date} sessionInfo={sessionInfo} />
      <div className="font-shapiro95_super_wide text-center text-sm max-w-2xs mx-auto">
        {getSessionsMessageContainerText(
          isSessionComplete,
          isSessionFull,
          isSkillSession,
          isAuthenticated,
          userProfile
        )}
      </div>
    </div>
  );
};

Session.propTypes = {
  sessionInfo: PropTypes.shape({
    past: PropTypes.bool,
    spotsLeft: PropTypes.number,
    skillSession: PropTypes.bool,
  }),
  isAuthenticated: PropTypes.bool,
  userProfile: PropTypes.shape({}),
};

export default Session;
