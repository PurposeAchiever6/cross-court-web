import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { pluralize } from 'shared/utils/helpers';
import SessionInfo from 'screens/sessions/components/SessionInfo';
import SkillLevelWarning from 'screens/sessions/components/SkillLevelWarning';
import { getSessionsMessageContainerText } from 'screens/sessions/utils';

const Session = ({ sessionInfo, isAuthenticated, userProfile }) => {
  const { date } = useParams();
  const isSessionComplete = sessionInfo.past;
  const isSessionFull = sessionInfo.spotsLeft === 0;
  const isSkillSession = sessionInfo.skillSession;
  const userScoutingCredits = userProfile.scoutingCredits;

  return (
    <div className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-between py-12 px-4 md:p-8 font-shapiro95_super_wide text-white">
      {isAuthenticated && <SkillLevelWarning userProfile={userProfile} sessionInfo={sessionInfo} />}
      <SessionInfo date={date} sessionInfo={sessionInfo} />
      <div className="font-shapiro95_super_wide text-center text-sm max-w-2xs mx-auto">
        <div>
          {getSessionsMessageContainerText(
            isSessionComplete,
            isSessionFull,
            isSkillSession,
            isAuthenticated,
            userProfile
          )}
        </div>
        {userScoutingCredits > 0 && (
          <div className="mt-4">
            YOU HAVE {userScoutingCredits} SCOUTING {pluralize('CREDIT', userScoutingCredits, 'S')}{' '}
            AVAILABLE
          </div>
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
