import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loading from 'shared/components/Loading';
import Map from 'shared/components/Map/Map';
import { add, isPast, getUTCDate } from 'shared/utils/date';

import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import LocationPicker from './components/LocationPicker';
import WeekSelector from './components/WeekSelector';
import SessionsList from './components/SessionsList';
import FreeSessionCreditAdded from './components/FreeSessionCreditAdded';
import {
  getPageLoading,
  getAvailableLocations,
  getAvailableSessions,
  getSelectedLocation,
  getSessionsLoading,
  getSelectedDate,
} from './reducer';
import {
  initialLoadInit,
  getSessionsByLocation,
  getSessionsByDate,
  setSelectedDate,
} from './actionCreators';

const LocationsPage = () => {
  const isPageLoading = useSelector(getPageLoading);
  const isSessionsLoading = useSelector(getSessionsLoading);
  const availableLocations = useSelector(getAvailableLocations);
  const availableSessions = useSelector(getAvailableSessions);
  const selectedLocation = useSelector(getSelectedLocation);
  const selectedDate = useSelector(getSelectedDate);
  const isAuthenticated = useSelector(getIsAuthenticated);

  const dispatch = useDispatch();
  const setLocationHandler = (locationId) => dispatch(getSessionsByLocation(locationId));
  const getSessionsByDateHandler = (date) => dispatch(getSessionsByDate(date));
  const setSelectedDateHandler = (date) => dispatch(setSelectedDate(date));

  const increaseCurrentWeekHandler = () => {
    const nextWeekDate = add(selectedDate, 1, 'weeks');
    setSelectedDateHandler(nextWeekDate);
    getSessionsByDateHandler(nextWeekDate);
  };

  const decreaseCurrentWeekHandler = () => {
    const pastWeekDate = add(selectedDate, -1, 'weeks');

    if (isPast(pastWeekDate)) {
      setSelectedDateHandler(getUTCDate());
      getSessionsByDateHandler(getUTCDate());
    } else {
      setSelectedDateHandler(pastWeekDate);
      getSessionsByDateHandler(pastWeekDate);
    }
  };

  /* START FSF FLOW LOGIC */
  const userInfo = useSelector(getUserProfile);
  const freeSessionNotExpired = new Date(userInfo.freeSessionExpirationDate) > new Date();
  const freeSessionNotClaimed = userInfo.freeSessionState === 'not_claimed';
  const isFSFFlow =
    isAuthenticated &&
    freeSessionNotExpired &&
    freeSessionNotClaimed &&
    window.localStorage.getItem('previousPage').indexOf('session-') === -1;
  /* END FSF FLOW LOGIC */

  useEffect(() => {
    dispatch(initialLoadInit());

    if (isFSFFlow) {
      document.body.setAttribute('data-page', 'free-session-credit-added');
    }
  }, [dispatch, isFSFFlow]);

  return isPageLoading ? (
    <Loading />
  ) : (
    <>
      {isFSFFlow && <FreeSessionCreditAdded />}
      <div className="locations pt-16 flex flex-col md:flex-row-reverse justify-center">
        <div className="w-full md:w-1/2 flex flex-col">
          <LocationPicker
            availableLocations={[{ id: null, name: 'ALL LOCATIONS' }, ...availableLocations]}
            setLocationHandler={setLocationHandler}
            selectedLocation={selectedLocation}
          />
          <WeekSelector
            availableSessions={availableSessions}
            selectedDate={selectedDate}
            increaseHandler={increaseCurrentWeekHandler}
            decreaseHandler={decreaseCurrentWeekHandler}
            setSelectedDateHandler={setSelectedDateHandler}
          />
          {isSessionsLoading ? (
            <Loading />
          ) : (
            <SessionsList availableSessions={availableSessions} selectedDate={selectedDate} />
          )}
        </div>
        <div className="w-full md:w-1/2">
          <Map
            setLocationHandler={setLocationHandler}
            selectedLocation={selectedLocation}
            locations={availableLocations}
          />
        </div>
      </div>
    </>
  );
};

export default LocationsPage;
