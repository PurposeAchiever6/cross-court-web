import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from 'shared/components/Tooltip';
import InfoSvg from 'shared/components/svg/InfoSvg';

const InfoTooltip = ({ info, place, dark, className }) => (
  <Tooltip variant={dark ? 'black' : 'white'} tooltip={info} place={place} className={className}>
    <InfoSvg className={`${dark ? 'text-black/70' : 'text-white/60 '} cursor-pointer w-5`} />
  </Tooltip>
);

InfoTooltip.defaultProps = {
  place: 'right',
  dark: false,
  className: '',
};

InfoTooltip.propTypes = {
  info: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  place: PropTypes.string,
  dark: PropTypes.bool,
  className: PropTypes.string,
};

export default InfoTooltip;
