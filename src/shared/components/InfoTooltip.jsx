import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from 'shared/components/Tooltip';
import InfoSvg from 'shared/components/svg/InfoSvg';

const InfoTooltip = ({ info, place, className }) => (
  <Tooltip variant="purple" tooltip={info} place={place} className={className}>
    <InfoSvg className="text-cc-purple cursor-pointer" />
  </Tooltip>
);

InfoTooltip.defaultProps = {
  place: 'right',
  className: '',
};

InfoTooltip.propTypes = {
  info: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  place: PropTypes.string,
  className: PropTypes.string,
};

export default InfoTooltip;
