import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import InfoSvg from 'shared/components/svg/InfoSvg';
import colors from 'shared/styles/constants';

const BadgeWithInfo = ({ showInfo, info, light, children }) => {
  return (
    <div className="flex items-center">
      <span
        className={`rounded-md ${
          light ? 'bg-white text-black' : 'bg-cc-black text-white'
        }  text-2xs text-center px-5 mr-3 font-shapiro95_super_wide`}
      >
        {children}
      </span>
      {showInfo && (
        <>
          <InfoSvg className="text-cc-purple cursor-pointer" dataTip={info} />
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

BadgeWithInfo.defaultProps = {
  showInfo: false,
  info: '',
  light: false,
};

BadgeWithInfo.propTypes = {
  showInfo: PropTypes.bool,
  info: PropTypes.string,
  light: PropTypes.bool,
  children: PropTypes.node,
};

export default BadgeWithInfo;
