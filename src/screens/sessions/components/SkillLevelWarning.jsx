import React from 'react';
import WarningTriangle from 'shared/images/warning-triangle.png';
import PropTypes from 'prop-types';

const SkillLevelWarning = ({ userProfile, sessionInfo }) => {
  const { skillRating } = userProfile;
  const { skillLevel, skillSession } = sessionInfo;
  const level = parseFloat(skillRating || 0);

  let showWarning = false;

  if (
    !skillSession &&
    skillRating !== '' &&
    skillLevel?.min !== '' &&
    skillLevel?.max !== '' &&
    (level < parseFloat(skillLevel?.min) || level > parseFloat(skillLevel?.max))
  ) {
    showWarning = true;
  }

  return (
    showWarning && (
      <div className="flex items-center justify-center mb-10">
        <img alt="" className="w-6" src={WarningTriangle} />
        <p className="text-cc-purple font-normal font-shapiro45_welter_extd text-sm ml-3">
          You have selected a session outside your personal skill level bracket
        </p>
      </div>
    )
  );
};

SkillLevelWarning.propTypes = {
  userProfile: PropTypes.object,
  sessionInfo: PropTypes.object,
};

export default SkillLevelWarning;
