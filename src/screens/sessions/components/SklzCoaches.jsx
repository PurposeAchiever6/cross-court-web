import React from 'react';
import UserSvg from 'shared/components/svg/UserSvg';
import PropTypes from 'prop-types';

const SklzCoaches = ({ sessionInfo }) => {
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
          {sessionInfo?.sklzCoach?.imageUrl ? (
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
            {sessionInfo.coach.name ? sessionInfo.coach.name : 'NOT ASSIGNED'}
          </span>
        </div>
      </div>
    </>
  );
};

SklzCoaches.propTypes = { sessionInfo: PropTypes.object.isRequired };

export default SklzCoaches;
