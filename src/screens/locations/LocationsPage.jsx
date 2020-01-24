import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { addWeeks } from 'date-fns';

import Loading from 'shared/components/Loading';
import device from 'shared/styles/mediaQueries';
import Map from 'shared/components/Map/Map';

import LocationPicker from './components/LocationPicker';
import WeekSelector from './components/WeekSelector';
import SessionsList from './components/SessionsList';
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

const PageContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;

  .map-container,
  .sessions-container {
    width: 50%;
  }

  .sessions-container {
    display: flex;
    flex-direction: column;
  }

  @media ${device.mobile} {
    flex-direction: column-reverse;

    .map-container,
    .sessions-container {
      width: 100%;
    }
  }
`;

const LocationsPage = () => {
  const isPageLoading = useSelector(getPageLoading);
  const isSessionsLoading = useSelector(getSessionsLoading);
  const availableLocations = useSelector(getAvailableLocations);
  const availableSessions = useSelector(getAvailableSessions);
  const selectedLocation = useSelector(getSelectedLocation);
  const selectedDate = useSelector(getSelectedDate);

  const dispatch = useDispatch();
  const setLocationHandler = locationId => dispatch(getSessionsByLocation(locationId));
  const getSessionsByDateHandler = date => dispatch(getSessionsByDate(date));
  const setSelectedDateHandler = date => dispatch(setSelectedDate(date));

  const increaseCurrentDayHandler = () => {
    const nextWeekDate = addWeeks(selectedDate, 1);
    getSessionsByDateHandler(nextWeekDate);
    setSelectedDateHandler(nextWeekDate);
  };

  const decreaseCurrentDayHandler = () => {
    const pastWeekDate = addWeeks(selectedDate, -1);
    getSessionsByDateHandler(pastWeekDate);
    setSelectedDateHandler(pastWeekDate);
  };

  useEffect(() => {
    dispatch(initialLoadInit());
  }, [dispatch]);

  return isPageLoading ? (
    <Loading />
  ) : (
    <PageContainer>
      <div className="sessions-container">
        <LocationPicker
          availableLocations={[{ id: null, name: 'All Locations' }, ...availableLocations]}
          setLocationHandler={setLocationHandler}
          selectedLocation={selectedLocation}
        />
        <WeekSelector
          availableSessions={availableSessions}
          selectedDate={selectedDate}
          increaseHandler={increaseCurrentDayHandler}
          decreaseHandler={decreaseCurrentDayHandler}
          getSessionsByDateHandler={getSessionsByDateHandler}
        />
        {isSessionsLoading ? (
          <Loading />
        ) : (
          <SessionsList availableSessions={availableSessions} selectedDate={selectedDate} />
        )}
      </div>
      <div className="map-container">
        <Map
          setLocationHandler={setLocationHandler}
          selectedLocation={selectedLocation}
          locations={availableLocations}
        />
      </div>
    </PageContainer>
  );
};

export default LocationsPage;
