import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import InfoSvg from 'shared/components/svg/InfoSvg';
import LEVELS from 'shared/constants/levels';
import TEXT from 'shared/constants/text';
import colors from 'shared/styles/constants';

const SessionLevel = ({ level, showInfo = false }) => {
  if (level === LEVELS.BASIC) {
    return null;
  }

  return (
    <div className="flex items-center my-1">
      <span className="mr-1 flex bg-black rounded-md px-2 text-white text-3xs font-shapiro95_super_wide w-20 justify-center py-1">
        <p>LEVEL 2</p>
      </span>
      {showInfo && (
        <>
          <InfoSvg dataTip={TEXT.ADVANCED_TOOLTIP} />
          <ReactTooltip
            backgroundColor={colors.brandBlack}
            place="right"
            effect="solid"
            delayHide={500}
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
