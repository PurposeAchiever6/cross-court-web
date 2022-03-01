import React from 'react';
import { isNil } from 'ramda';
import UserSvg from 'shared/components/svg/UserSvg';
import PropTypes from 'prop-types';

const SessionOfficials = ({ sessionInfo }) => {
  return (
    <>
      <h3 className="uppercase mb-6">
        <span className="font-shapiro95_super_wide text-lg xl:text-2xl 2xl:text-3xl">
          Your Session
        </span>
        <br />
        <span className="text-stroke-width-1 font-shapiro97_air_extd text-2xl xl:text-3xl 2xl:text-4xl">
          Officials
        </span>
      </h3>
      <div className="font-shapiro95_super_wide">
        <div className="flex flex-col mb-8 justify-center items-center">
          {isNil(sessionInfo.sem) || isNil(sessionInfo.sem.imageUrl) ? (
            <div className="h-20 w-20 flex justify-center items-center bg-gray-200 text-cc-purple mb-2 text-4xl rounded-full">
              <UserSvg className="w-8 h-8" />
            </div>
          ) : (
            <img
              className="w-20 h-20 rounded-full mb-2 object-cover my-0 mx-auto"
              src={sessionInfo.sem.imageUrl}
              alt="SEM"
            />
          )}

          <span className="capitalize font-medium">
            {sessionInfo.sem.name ? sessionInfo.sem.name : 'NOT ASSIGNED'}
          </span>
        </div>
        <div className="flex flex-col mb-8 justify-center items-center">
          {isNil(sessionInfo.referee) || isNil(sessionInfo.referee.imageUrl) ? (
            <div className="h-20 w-20 flex justify-center items-center bg-gray-200 text-cc-purple mb-2 text-4xl rounded-full">
              <UserSvg className="w-8 h-8" />
            </div>
          ) : (
            <img
              className="w-20 h-20 rounded-full mb-2 object-cover my-0 mx-auto"
              src={sessionInfo.referee.imageUrl}
              alt="SEM"
            />
          )}
          <span className="capitalize font-medium">
            {sessionInfo.referee.name ? sessionInfo.referee.name : 'NOT ASSIGNED'}
          </span>
        </div>
      </div>
    </>
  );
};

SessionOfficials.propTypes = { sessionInfo: PropTypes.object.isRequired };

export default SessionOfficials;
