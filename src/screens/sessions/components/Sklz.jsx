import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';

import SessionInfo from 'screens/sessions/components/SessionInfo';
import { getSessionCostCreditsText, getSessionsMessageContainerText } from 'screens/sessions/utils';

const Sklz = ({ sessionInfo, isAuthenticated, userProfile }) => {
  const { id, date } = useParams();

  const isSessionComplete = sessionInfo.past;
  const isSessionFull = sessionInfo.spotsLeft === 0;
  const isSkillSession = sessionInfo.skillSession;
  const costCreditsText = getSessionCostCreditsText(sessionInfo);

  if (!id) {
    return <Redirect to={ROUTES.HOME} />;
  }

  if (!isSkillSession) {
    return <Redirect to={`/session/${id}/${date}`} />;
  }

  return (
    <div className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-between py-12 px-4 md:p-8 font-shapiro95_super_wide text-white">
      <SessionInfo date={date} sessionInfo={sessionInfo} />
      <div className="font-shapiro95_super_wide text-center text-sm uppercase max-w-2xs mx-auto">
        {costCreditsText && <div className="mb-6">{costCreditsText}</div>}
        <div>
          {getSessionsMessageContainerText(
            isSessionComplete,
            isSessionFull,
            isSkillSession,
            isAuthenticated,
            userProfile
          )}
        </div>
      </div>
    </div>
  );
};

Sklz.propTypes = {
  sessionInfo: PropTypes.shape({
    past: PropTypes.bool,
    spotsLeft: PropTypes.number,
    skillSession: PropTypes.bool,
  }),
  isAuthenticated: PropTypes.bool,
  userProfile: PropTypes.shape({}),
};

export default Sklz;
