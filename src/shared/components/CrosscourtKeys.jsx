import React from 'react';

import ROUTES from 'shared/constants/routes';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import oneHourIcon from 'shared/images/cc-keys/1-hour.png';
import premiumAmenitiesIcon from 'shared/images/cc-keys/premium-amenities.png';
import fifteenPlayerLimitIcon from 'shared/images/cc-keys/15-player-limit.png';
import equipmentProvidedIcon from 'shared/images/cc-keys/equipment-provided.png';
import sessionOfficialIcon from 'shared/images/cc-keys/session-official.png';
import freshTunesIcon from 'shared/images/cc-keys/fresh-tunes.png';

const KEYS = [
  { src: oneHourIcon, text: 'One Hour', className: 'w-36 md:w-44' },
  { src: premiumAmenitiesIcon, text: 'Premium Amenities', className: 'w-36 md:w-44' },
  { src: fifteenPlayerLimitIcon, text: '15 Player Limit', className: 'w-36 md:w-44' },
  { src: equipmentProvidedIcon, text: 'Equipment Provided', className: 'w-36 md:w-44' },
  { src: sessionOfficialIcon, text: 'Session Officials', className: 'w-36 md:w-44' },
  { src: freshTunesIcon, text: 'Fresh Tunes', className: 'w-36 md:w-44' },
];

const CrosscourtKeys = () => (
  <section className="pt-14 pb-20 px-12">
    <div className="flex flex-wrap items-center justify-between -m-4">
      {KEYS.map(({ text, src, className }, index) => (
        <div key={index} className="flex flex-col items-center w-1/2 md:w-1/3 lg:w-1/6 p-4">
          <img className={className} alt={`session-perk-${text}`} src={src} />
          <div className="font-shapiro95_super_wide text-center text-sm sm:text-base mt-4 uppercase">
            {text}
          </div>
        </div>
      ))}
    </div>
    <div className="text-center mt-16">
      <PrimaryButton to={ROUTES.LOCATIONS}>Book Session</PrimaryButton>
    </div>
  </section>
);

export default CrosscourtKeys;
