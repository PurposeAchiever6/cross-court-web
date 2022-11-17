import React from 'react';
import UserSvg from 'shared/components/svg/UserSvg';
import PropTypes from 'prop-types';

import useWindowSize from 'shared/hooks/useWindowSize';
import Tooltip from 'shared/components/Tooltip';
import { size as breakpoints } from 'shared/styles/mediaQueries';

const SklzCoaches = ({ sessionInfo }) => {
  const { width: windowSize } = useWindowSize();
  const place = windowSize < breakpoints.desktop ? 'bottom' : 'left';

  return (
    <>
      <h3 className="uppercase mb-6">
        <span className="font-shapiro95_super_wide text-2Xl xl:text-3xl 2xl:text-4xl">
          Your Sklz
        </span>
        <br />
        <span className="text-stroke-width-1 font-shapiro97_air_extd text-3xl xl:text-4xl 2xl:text-5xl">
          Coach
        </span>
      </h3>
      <div className="font-shapiro95_super_wide">
        <div className="flex flex-col mb-8 justify-center items-center">
          {sessionInfo?.coach?.imageUrl ? (
            <img
              className="w-20 h-20 rounded-full mb-2 object-cover my-0 mx-auto"
              src={sessionInfo.coach.imageUrl}
              alt="SKLZ_COACH"
            />
          ) : (
            <div className="h-20 w-20 flex justify-center items-center bg-gray-200 text-cc-purple mb-2 text-4xl rounded-full">
              <UserSvg className="w-8 h-8" />
            </div>
          )}
          <span className="capitalize font-medium">
            {sessionInfo.coach.fullName ? sessionInfo.coach.fullName : 'NOT ASSIGNED'}
          </span>
          {sessionInfo.coach.bio && (
            <Tooltip
              variant="black"
              place={place}
              tooltip={sessionInfo.coach.bio}
              className="bg-cc-black text-white py-1 px-2 rounded-sm mt-2 text-2xs uppercase"
              tooltipClassName="max-w-lg"
            >
              See coach {sessionInfo.coach.firstName}'s bio <br />
              <a
                rel="noopener noreferrer"
                target="_blank"
                href={sessionInfo.coach.instagramProfile}
              >
                {sessionInfo.coach.instagramUsername}
              </a>
            </Tooltip>
          )}
        </div>
      </div>
    </>
  );
};

SklzCoaches.propTypes = { sessionInfo: PropTypes.object.isRequired };

export default SklzCoaches;
