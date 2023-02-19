import React from 'react';
import PropTypes from 'prop-types';

import { sessionReservationInfo } from 'shared/utils/sessions';
import WarningTriangle from 'shared/images/warning-triangle.png';
import Tooltip from 'shared/components/Tooltip';
import InfoSvg from 'shared/components/svg/InfoSvg';

const SessionWarningInfo = ({ session, userProfile, className }) => {
  const { warningIcon, text, tooltip } = sessionReservationInfo(session, userProfile);

  if (!text) {
    return null;
  }

  return (
    <div className={`flex justify-center items-center ${className}`}>
      {warningIcon && <img alt="warning-icon" className="w-4 h-4" src={WarningTriangle} />}
      <p className="text-2xs sm:text-xs text-center uppercase mt-1 ml-2">{text}</p>
      {tooltip && (
        <Tooltip variant="purple" tooltip={tooltip} tooltipClassName="whitespace-normal">
          <InfoSvg className="text-cc-purple cursor-pointer ml-2" />
        </Tooltip>
      )}
    </div>
  );
};

SessionWarningInfo.propTypes = {
  session: PropTypes.shape().isRequired,
  userProfile: PropTypes.shape().isRequired,
  className: PropTypes.string,
};

export default SessionWarningInfo;
