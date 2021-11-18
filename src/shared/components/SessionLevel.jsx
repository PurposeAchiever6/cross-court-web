import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import InfoSvg from 'shared/components/svg/InfoSvg';
import colors from 'shared/styles/constants';

const SessionLevel = ({ level, showInfo, light }) => {
  return (
    <div className="flex items-center">
      <span
        className={`rounded-md ${
          light ? 'bg-white text-black' : 'bg-cc-black text-white'
        }  text-2xs text-center px-5 mr-3 font-shapiro95_super_wide`}
      >
        {`${level.min} - ${level.max}`}
      </span>
      {showInfo && (
        <>
          <InfoSvg className="text-cc-purple cursor-pointer" dataTip={level.description} />
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

SessionLevel.defaultProps = {
  light: false,
  showInfo: false,
};

SessionLevel.propTypes = {
  level: PropTypes.object.isRequired,
  showInfo: PropTypes.bool,
  light: PropTypes.bool,
};

export default SessionLevel;
