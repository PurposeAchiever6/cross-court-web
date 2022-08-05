import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from 'shared/components/Tooltip';
import Badge from 'shared/components/Badge';

const SessionCcCashEarned = ({ ccCash, className }) => (
  <div className={className}>
    <Tooltip tooltip={`Receive $${ccCash} in CC Cash when you attend this session`}>
      <Badge variant="black" size="sm" className="font-shapiro95_super_wide">
        Earn ${ccCash}
      </Badge>
    </Tooltip>
  </div>
);

SessionCcCashEarned.defaultProps = {
  className: '',
};

SessionCcCashEarned.propTypes = {
  ccCash: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default SessionCcCashEarned;
