import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import Loading from 'shared/components/Loading';
import Map from 'shared/components/Map/Map';
import { add, isPast, startOfWeek, getUTCDate } from 'shared/utils/date';
import { isUserInFirstFreeSessionFlow } from 'shared/utils/user';

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
  const isFSFFlow = isUserInFirstFreeSessionFlow(userInfo);

  const [showingFreeSessionCreditAdded, setShowingFreeSessionCreditAdded] = useState(true);

  const setLocationHandler = (locationId) => dispatch(getSessionsByLocation(locationId));
  const getSessionsByDateHandler = (date) => dispatch(getSessionsByDate(date));
  const setSelectedDateHandler = (date) => dispatch(setSelectedDate(date));

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
    setShowingFreeSessionCreditAdded(isFSFFlow);
  }, [isFSFFlow]);

  useEffect(() => {
    if (isFSFFlow) {
      history.push(ROUTES.LOCATIONSFIRST);
    }

    dispatch(initialLoadInit());
  }, [dispatch, history, isFSFFlow, userInfo]);

  return isPageLoading ? (
    <Loading />
  ) : (
    <>
      {isFSFFlow && (
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
