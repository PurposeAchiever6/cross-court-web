/* eslint-disable no-else-return */
/* eslint-disable no-lonely-if */
import React from 'react';
import PropTypes from 'prop-types';
import WarningTriangle from 'shared/images/warning-triangle.png';

import { sessionReservationInfo } from 'shared/utils/sessions';

const SessionWarningInfo = ({ session, userProfile, className }) => {
  const { warning } = sessionReservationInfo(session, userProfile);

  if (!warning) {
    return null;
  }

  return (
    <div className={`flex justify-center items-center whitespace-nowrap ${className}`}>
      <img alt="warning-icon" className="w-4 h-4" src={WarningTriangle} />
      <p className="text-2xs sm:text-xs uppercase mt-1 ml-2">{warning}</p>
    </div>
  );
};

SessionWarningInfo.propTypes = {
  session: PropTypes.shape().isRequired,
  userProfile: PropTypes.shape().isRequired,
  className: PropTypes.string,
};

export default SessionWarningInfo;
