import React from 'react';
import PropTypes from 'prop-types';

import { hourRange, timeRange24, extraLongSessionDate } from 'shared/utils/date';
import SectionLayout from 'shared/components/layout/SectionLayout';
import Map from 'shared/components/Map/Map';
import CalendarEventLink from 'shared/components/CalendarEventLink';
import CheckmarkSvg from 'shared/components/svg/CheckmarkSvg';
import dotsBgImg from 'shared/images/backgrounds/dots.png';

const SessionInformation = ({ session }) => {
  const {
    isOpenClub,
    skillSession,
    time,
    durationMinutes,
    userSession: { date, scouting, shootingMachineReservations },
    location,
    location: {
      id: locationId,
      name: locationName,
      address: locationAdress,
      city: locationCity,
      state: locationState,
      timeZone: locationTimeZone,
      zipcode: locationZipcode,
      lateArrivalMinutes,
    },
  } = session;

  const [startTime, endTime] = timeRange24(time, durationMinutes);
  const locationLateArrivalMinutes = lateArrivalMinutes || 5;

  const calendarEventName = (() => {
    if (isOpenClub) {
      return 'Crosscourt Office Hours';
    }

    if (skillSession) {
      return 'Crosscourt SKLZ Session';
    }

    return 'Crosscourt Session';
  })();

  return (
    <SectionLayout className="relative h-full pt-10 lg:pt-16 pb-4 lg:pb-16 bg-white text-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/99 to-white" />
        <img src={dotsBgImg} alt="cc-basketball-balls" className="w-full" />
      </div>
      <div className="relative max-w-screen-sm mx-auto">
        <h1 className="font-shapiro95_super_wide text-4xl uppercase flex items-center mb-6">
          <CheckmarkSvg className="w-12 -mt-1 mr-2" />
          Booked
        </h1>
        <div className="mb-5">
          Add to my calendar
          <CalendarEventLink
            name={calendarEventName}
            startDate={date}
            endDate={date}
            startTime={startTime}
            endTime={endTime}
            location={`${locationAdress}, ${locationCity}, ${locationState}`}
            calendarProvider="Apple"
            timeZone={locationTimeZone}
            iCalFileName={`cc-session-${date}-${startTime}`}
            className="mx-2"
          >
            Apple
          </CalendarEventLink>
          <CalendarEventLink
            name={calendarEventName}
            startDate={date}
            endDate={date}
            startTime={startTime}
            endTime={endTime}
            location={`${locationAdress}, ${locationCity}, ${locationState}`}
            calendarProvider="Google"
            timeZone={locationTimeZone}
          >
            Google
          </CalendarEventLink>
        </div>
        <div className="bg-cream px-4 py-8 sm:px-8">
          <div className="lg:flex mb-6">
            <div className="font-shapiro95_super_wide text-xl uppercase lg:text-right w-28 mb-1 lg:mb-0 lg:mr-5">
              When
            </div>
            <div className="text-cc-black/95">
              <span className="block mb-1">{extraLongSessionDate(date)}</span>
              <span className="block text-xs">{hourRange(time, durationMinutes)}</span>
            </div>
          </div>
          <div className="lg:flex mb-6">
            <div className="font-shapiro95_super_wide text-xl uppercase lg:text-right w-28 mb-1 lg:mb-0 lg:mr-5">
              Where
            </div>
            <div className="text-cc-black/95">
              <span className="block mb-1">{locationName}</span>
              <span className="block text-xs mb-1">{locationAdress}</span>
              <span className="block text-xs">{`${locationCity}, ${locationState} ${locationZipcode}`}</span>
            </div>
          </div>
          {shootingMachineReservations.length > 0 && (
            <div className="border border-black bg-white p-4 mb-6">
              <div className="font-shapiro95_super_wide mb-2">Shooting Machine Rental</div>
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
            <div className="border border-black bg-white p-4 mb-6">
              <div className="font-shapiro95_super_wide mb-2">You've Requested</div>
              <div className="text-sm flex items-center">
                <span className="w-3 h-3 shrink-0 bg-cc-purple mr-2" />
                Evaluation
              </div>
            </div>
          )}
          <p className="text-cc-black/95 text-sm mb-4">
            <span className="font-shapiro95_super_wide">Please note:</span> Plan to arrive at the
            club at least 20 minutes before your session starts. Late entry beyond{' '}
            {locationLateArrivalMinutes} minutes will not be permitted at this time. Thank you.
          </p>
          <p className="text-cc-black/95 text-sm">
            <span className="font-shapiro95_super_wide">Reminder:</span> Store your belongings in a
            locker as we are not responsible for lost items. Thank you.
          </p>
        </div>
        <div className="h-[18rem] lg:h-[30rem]">
          <Map selectedLocation={locationId} locations={[location]} showLocationInfo={false} />
        </div>
      </div>
      <div className="lg:hidden absolute-center-x -bottom-3 border-t-[1rem] border-t-white border-l-[1.25rem] border-l-transparent border-r-[1.25rem] border-r-transparent" />
    </SectionLayout>
  );
};

SessionInformation.defaultProps = {};

SessionInformation.propTypes = {
  session: PropTypes.shape().isRequired,
};

export default SessionInformation;
