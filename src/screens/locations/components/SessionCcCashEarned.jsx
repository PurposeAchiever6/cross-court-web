import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from 'shared/components/Tooltip';

const SessionCcCashEarned = ({ ccCash, className }) => (
  <div className={className}>
    <Tooltip variant="purple" tooltip="Get CCcash for coming out to certain sessions">
      <div className="rounded-full border border-cc-black bg-cc-black text-white flex flex-col justify-center items-center w-10 h-10">
        ${ccCash}
      </div>
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
