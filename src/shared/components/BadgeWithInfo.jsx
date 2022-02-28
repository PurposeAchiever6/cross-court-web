import React from 'react';
import PropTypes from 'prop-types';

import Badge from 'shared/components/Badge';
import Tooltip from 'shared/components/Tooltip';
import InfoSvg from 'shared/components/svg/InfoSvg';

const BadgeWithInfo = ({ info, variant, children }) => {
  return (
    <div className="flex items-center">
      <Badge variant={variant} className="text-2xs text-center px-3 mr-2 font-shapiro95_super_wide">
        {children}
      </Badge>
      <Tooltip variant="purple" tooltip={info} place="right">
        <InfoSvg className="text-cc-purple cursor-pointer" />
      </Tooltip>
    </div>
  );
};

BadgeWithInfo.defaultProps = {
  variant: 'black',
  light: false,
};

BadgeWithInfo.propTypes = {
  info: PropTypes.string,
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default BadgeWithInfo;
