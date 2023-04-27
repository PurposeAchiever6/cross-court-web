import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { longSessionDate, hourRange } from 'shared/utils/date';
import SignalBarsSvg from 'shared/components/svg/SignalBarsSvg';
import Link from 'shared/components/Link';
import SessionLogo from 'screens/sessions/components/SessionLogo';
import MapModal from 'screens/sessions/components/MapModal';

const SessionInformation = ({ session, date, className }) => {
  const [showMapModal, setShowMapModal] = useState(false);

  const {
    time,
    durationMinutes,
    location,
    normalSession,
    skillLevel,
    skillSession,
    isOpenClub,
    themeTitle,
    themeDescription,
    userSession,
  } = session;
  const { name, address, city, state, zipcode } = location;
  const { scouting, shootingMachineReservations } = userSession || {};
  const hasShootingMachineReservations = shootingMachineReservations?.length > 0;

  const hasAdditionalReservations = scouting || hasShootingMachineReservations;

  const sessionDescription = (() => {
    if (isOpenClub) {
      return 'Use the space as you wish. Get some work done or hit a workout. Put some shots up with the shooting machine, organize games with other members, or just come to hang out.';
    }

    if (skillSession) {
      return '60 minute, trainer led, group workout for members to level up their game. Work on handles, shooting, passing, endurance, and more in this high intensity, community driven experience.';
    }

    return '55 minutes, 15 player limit, 2 Session Officials, tiered skill levels, music, jerseys, and more. Built to help you create, compete, and connect.';
  })();

  return (
    <>
      <div className={className}>
        <div className="flex flex-wrap">
          <div className="w-full xl:w-1/6 shrink-0 grow border border-white border-opacity-30 p-4">
            <div className="font-shapiro95_super_wide text-lg mb-1">When</div>
            <div className="text-white text-opacity-80 text-sm">
              <div>{longSessionDate(date)}</div>
              <div>{hourRange(time, durationMinutes)}</div>
            </div>
          </div>
          <div className="w-full xl:w-1/6 shrink-0 grow border border-t-0 xl:border-t xl:border-l-0 border-white border-opacity-30 p-4">
            <div className="font-shapiro95_super_wide text-lg mb-1">Where</div>
            <div className="text-white text-opacity-80 text-sm">
              <div>{`Crosscourt ${name}`}</div>
              <div>{address}</div>
              <div className="mb-2">{`${city}, ${state} ${zipcode}`}</div>
              <Link onClick={() => setShowMapModal(true)}>Google Maps</Link>
            </div>
          </div>
          <div className="w-full xl:w-1/6 shrink-0 grow border border-t-0 xl:border-t xl:border-l-0 border-white border-opacity-30 p-4">
            <SessionLogo
              session={session}
              className={`${normalSession ? 'w-24 mt-1' : 'w-20'} mb-3`}
            />
            <div className="text-white text-opacity-80 text-sm">{sessionDescription}</div>
          </div>
          {skillLevel && (
            <div className="w-full xl:w-1/6 shrink-0 grow border border-t-0 xl:border-t xl:border-l-0 border-white border-opacity-30 p-4">
              <div className="flex mb-1">
                <SignalBarsSvg className="w-5 -mt-1 mr-2" />
                <span className="font-shapiro95_super_wide text-lg">{`${skillLevel.min} - ${skillLevel.max}`}</span>
              </div>
              <div className="text-white text-opacity-80 text-sm">{skillLevel.description}</div>
            </div>
          )}
          {themeDescription && (
            <div className="w-full xl:w-1/6 shrink-0 grow border border-t-0 xl:border-t xl:border-l-0 border-white border-opacity-30 p-4">
              <div className="font-shapiro95_super_wide text-lg mb-1">{themeTitle}</div>
              <div className="text-white text-opacity-80 text-sm">{themeDescription}</div>
            </div>
          )}
          {hasAdditionalReservations && (
            <div className="w-full xl:w-1/6 shrink-0 grow border border-t-0 xl:border-t xl:border-l-0 border-white border-opacity-30 p-4">
              <div className="font-shapiro95_super_wide text-lg mb-1">Additional Reservations</div>
              <div className="text-white text-opacity-80 text-sm">
                {hasShootingMachineReservations && (
                  <div>
                    <div className="mb-2">Shooting Machine Rental</div>
                    {shootingMachineReservations.map(({ id, startTime, endTime }, index) => (
                      <div
                        key={id}
                        className={`text-sm flex items-center ${
                          index + 1 < shootingMachineReservations.length ? 'mb-1' : ''
                        }`}
                      >
                        <span className="w-3 h-3 shrink-0 bg-cc-purple mr-2" />
                        {`${startTime} - ${endTime}`}
                      </div>
                    ))}
                  </div>
                )}
                {scouting && (
                  <div className="text-sm flex items-center">
                    <span className="w-3 h-3 shrink-0 bg-cc-purple mr-2" />
                    Evaluation
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <MapModal
        isOpen={showMapModal}
        closeHandler={() => setShowMapModal(false)}
        location={location}
      />
    </>
  );
};

SessionInformation.defaultProps = {
  className: '',
};

SessionInformation.propTypes = {
  session: PropTypes.shape().isRequired,
  date: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default SessionInformation;
