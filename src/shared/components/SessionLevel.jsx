import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import InfoSvg from 'shared/components/svg/InfoSvg';
import LEVELS from 'shared/constants/levels';
import TEXT from 'shared/constants/text';

const SessionLevel = ({ level, showInfo = false }) => {
  if (level === LEVELS.BASIC) {
    return null;
  }

  return (
    <div className="flex items-center font-shapiro45_welter_extd">
      <span className="rounded-full bg-gray-400 text-xs text-center text-white px-5 py-2 mr-3">
        LEVEL
        <span className="ml-2">2</span>
      </span>
      {showInfo && (
        <>
          <InfoSvg className="text-gray-400" dataTip={TEXT.ADVANCED_TOOLTIP} />
          <ReactTooltip
            backgroundColor="#D1D5DB"
            textColor="black"
            place="right"
            effect="solid"
            className="max-w-xs"
            html
          />
        </>
      )}
    </div>
  );
};

SessionLevel.propTypes = {
  level: PropTypes.string.isRequired,
  showInfo: PropTypes.bool,
};

export default SessionLevel;
