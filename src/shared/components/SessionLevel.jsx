import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import InfoSvg from 'shared/components/svg/InfoSvg';
import colors from 'shared/styles/constants';

const SessionLevel = ({ level, showInfo = false }) => {
  return (
    <div className="flex items-center">
      <span className="rounded-md bg-cc-black text-2xs text-center text-white px-5 mr-3 my-2 font-shapiro95_super_wide">
        {`${level.min} - ${level.max}`}
      </span>
      {showInfo && (
        <>
          <InfoSvg className="text-cc-purple" dataTip={level.description} />
          <ReactTooltip
            backgroundColor={colors.brandPurple}
            textColor="white"
            place="right"
            effect="solid"
            className="max-w-xs font-shapiro45_welter_extd"
            html
          />
        </>
      )}
    </div>
  );
};

SessionLevel.propTypes = {
  level: PropTypes.object,
  showInfo: PropTypes.bool,
};

export default SessionLevel;
