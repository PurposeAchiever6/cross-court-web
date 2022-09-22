import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import Loading from 'shared/components/Loading';
import Map from 'shared/components/Map/Map';
import { add, isPast, startOfWeek, getUTCDate } from 'shared/utils/date';
import { isUserInFirstSessionFlow, isUserInFirstFreeSessionFlow } from 'shared/utils/user';

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
  const history = useHistory();
  const dispatch = useDispatch();

  const isPageLoading = useSelector(getPageLoading);
  const isSessionsLoading = useSelector(getSessionsLoading);
  const availableLocations = useSelector(getAvailableLocations);
  const availableSessions = useSelector(getAvailableSessions);
  const selectedLocation = useSelector(getSelectedLocation);
  const selectedDate = useSelector(getSelectedDate);
  const userInfo = useSelector(getUserProfile);
  const isFirstSessionFlow = isUserInFirstSessionFlow(userInfo);
  const isFirstFreeSessionFlow = isUserInFirstFreeSessionFlow(userInfo);

  const [showingFreeSessionCreditAdded, setShowingFreeSessionCreditAdded] = useState(true);

  const getSessionsByDateHandler = (date) => dispatch(getSessionsByDate(date));
  const setSelectedDateHandler = (date) => dispatch(setSelectedDate(date));
  const setLocationHandler = useCallback(
    (locationId) => dispatch(getSessionsByLocation(locationId)),
    [dispatch]
  );

  const increaseCurrentWeekHandler = () => {
    const nextWeekDate = startOfWeek(add(selectedDate, 1, 'weeks'));
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

  useEffect(() => {
    if (availableLocations.length > 0 && !selectedLocation) {
      setLocationHandler(availableLocations[0].id);
    }
  }, [availableLocations, selectedLocation, setLocationHandler]);

  useEffect(() => {
    setShowingFreeSessionCreditAdded(isFirstFreeSessionFlow);
  }, [isFirstFreeSessionFlow]);

  useEffect(() => {
    if (isFirstSessionFlow) {
      history.push(ROUTES.LOCATIONSFIRST);
    }
  }, [history, isFirstSessionFlow]);

  useEffect(() => {
    dispatch(initialLoadInit());
  }, [dispatch]);

  return isPageLoading ? (
    <Loading />
  ) : (
    <>
      {isFirstFreeSessionFlow && (
        <FreeSessionCreditAdded onFinishAnimation={() => setShowingFreeSessionCreditAdded(false)} />
      )}
      <div className="locations flex flex-col md:flex-row-reverse justify-center">
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
            <SessionsList
              availableSessions={availableSessions}
              selectedDate={selectedDate}
              showingFreeSessionCreditAdded={showingFreeSessionCreditAdded}
            />
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
