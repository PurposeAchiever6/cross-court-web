import React from 'react';

import ROUTES from 'shared/constants/routes';

import oneHourIcon from 'shared/images/1-hour.png';
import premiumFacilityIcon from 'shared/images/premium-facility.png';
import fifteenPlayerLimitIcon from 'shared/images/15-player-limit.png';
import equipmentProvidedIcon from 'shared/images/equipment-provided.png';
import sessionOfficialIcon from 'shared/images/session-official.png';
import hypeSoundtracksIcon from 'shared/images/hype-soundtracks.png';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { useSelector } from 'react-redux';

const TheSession = (props) => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  return (
    <div className="flex flex-col">
      <section className="flex flex-wrap p-8 items-center justify-between" {...props}>
        <div className="w-1/2 md:w-2/12 mb-4 md:mb-0 flex flex-col items-center text-center font-shapiro95_super_wide text-sm md:text-base">
          <img className="w-36 md:w-44" alt="" src={oneHourIcon} />
          <span>
            ONE
            <br />
            HOUR
          </span>
        </div>
        <div className="w-1/2 md:w-2/12 mb-4 md:mb-0 flex flex-col items-center text-center font-shapiro95_super_wide text-sm md:text-base">
          <img className="w-36 md:w-44" alt="" src={premiumFacilityIcon} />
          <span>
            PREMIUM
            <br />
            FACILITY
          </span>
        </div>
        <div className="w-1/2 md:w-2/12 mb-4 md:mb-0 flex flex-col items-center text-center font-shapiro95_super_wide text-sm md:text-base">
          <img className="w-36 md:w-44" alt="" src={fifteenPlayerLimitIcon} />
          <span>
            15 PLAYER
            <br />
            LIMIT
          </span>
        </div>
        <div className="w-1/2 md:w-2/12 mb-4 md:mb-0 flex flex-col items-center text-center font-shapiro95_super_wide text-sm md:text-base">
          <img className="w-36 md:w-44" alt="" src={equipmentProvidedIcon} />
          <span>
            EQUIPMENT
            <br />
            PROVIDED
          </span>
        </div>
        <div className="w-1/2 md:w-2/12 mb-4 md:mb-0 flex flex-col items-center text-center font-shapiro95_super_wide text-sm md:text-base">
          <img className="w-36 md:w-44" alt="" src={sessionOfficialIcon} />
          <span>
            SESSION
            <br />
            OFFICIAL
          </span>
        </div>
        <div className="w-1/2 md:w-2/12 mb-4 md:mb-0 flex flex-col items-center text-center font-shapiro95_super_wide text-sm md:text-base">
          <img className="w-36 md:w-44 mb-2" alt="" src={hypeSoundtracksIcon} />
          <span>
            HYPE
            <br />
            SOUNDTRACKS
          </span>
        </div>
      </section>
      <PrimaryButton className="text-center my-6" to={ROUTES.LOCATIONS}>
        {isAuthenticated ? 'BOOK SESSION' : 'FIRST FREE'}
      </PrimaryButton>
    </div>
  );
};

export default TheSession;
