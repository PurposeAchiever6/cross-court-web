import React, { useState, useEffect, useCallback } from 'react';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import { useSelector, useDispatch } from 'react-redux';
import {
  getPageLoading,
  getAvailableLocations,
  getAvailableSessions,
  getSessionsLoading,
  getSelectedDate,
} from 'screens/locations/reducer';
import { initialLoadInit } from 'screens/locations/actionCreators';
import { isSameDay, formatSessionTime, formatSessionDate } from 'shared/utils/date';

import userSessionService from 'screens/userSessions/service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const LEFT = 'left';
const RIGHT = 'right';

const PlayersList = () => {
  const [showList, setShowList] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [sessionsForThisLocation, setSessionsForThisLocation] = useState([]);
  const [selectedSessionIndex, setSelectedSessionIndex] = useState(0);
  const [selectedSession, setSelectedSession] = useState(null);
  const [userSessions, setUserSessions] = useState([]);

  const isPageLoading = useSelector(getPageLoading);
  const isSessionsLoading = useSelector(getSessionsLoading);
  const availableLocations = useSelector(getAvailableLocations);
  const availableSessions = useSelector(getAvailableSessions);
  const selectedDate = useSelector(getSelectedDate);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialLoadInit());
  }, [dispatch]);

  useEffect(() => {
    if (!isSessionsLoading && !isPageLoading && availableLocations.length) {
      setSelectedLocation(availableLocations[0]);
    }
  }, [dispatch, availableLocations, isSessionsLoading, isPageLoading]);

  useEffect(() => {
    if (selectedLocation) {
      const currentDate = new Date();
      let sessions = availableSessions.filter(({ startTime = currentDate }) =>
        isSameDay(startTime, selectedDate)
      );
      sessions = sessions.filter((session) => session.location.id === selectedLocation?.id);
      setSelectedSession(sessions[0]);
      setSessionsForThisLocation(sessions);
    }
  }, [selectedLocation, availableSessions, setSelectedSession, selectedDate]);

  const getUserSessionsList = useCallback(async () => {
    const userSessionsList = await userSessionService.getUserSessionList(selectedSession.id);
    setUserSessions(userSessionsList);
  }, [selectedSession]);

  useEffect(() => {
    if (selectedSession) getUserSessionsList();
  }, [selectedSession, getUserSessionsList]);

  useEffect(() => {}, [selectedSession]);

  const changeSelectedSession = (operation) => {
    let newIndex;
    if (operation === LEFT) {
      newIndex = selectedSessionIndex - 1;
      if (newIndex === -1) return;
      setSelectedSessionIndex(newIndex);
    } else {
      newIndex = selectedSessionIndex + 1;
      if (newIndex === sessionsForThisLocation.length) return;
      setSelectedSessionIndex(newIndex);
    }
    setSelectedSession(sessionsForThisLocation[newIndex]);
  };

  return (
    <>
      <PrimaryButton
        px="100px"
        inverted
        bg="transparent"
        className="absolute bottom-0 right-0 mb-7 mr-5"
        onClick={() => {
          setShowList(true);
          window.scrollTo({ top: 0 });
        }}
      >
        Roster
      </PrimaryButton>

      {showList && (
        <div className="absolute w-screen h-full bg-white z-30 p-8">
          <div className="flex items-center justify-evenly mb-20">
            <div className="flex items-center justify-center">
              <button
                type="button"
                className="text-4xl px-4"
                onClick={() => changeSelectedSession(LEFT)}
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
              <div className="flex flex-col items-center">
                <p className="text-3xl font-shapiro96_inclined_wide mx-4">
                  {selectedLocation?.name}
                </p>
                <p className="text-2xl mx-4">
                  {selectedSession && formatSessionDate(selectedSession.startTime)}
                </p>
                <p className="text-2xl mx-4">
                  {selectedSession && formatSessionTime(selectedSession.time)}
                </p>
              </div>
              <button
                type="button"
                className="text-4xl px-4"
                onClick={() => changeSelectedSession(RIGHT)}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </button>
            </div>
            <PrimaryButton inverted className="m-5" onClick={() => getUserSessionsList()}>
              Refresh
            </PrimaryButton>
            <PrimaryButton className="m-5" onClick={() => setShowList(false)}>
              Dashboard
            </PrimaryButton>
          </div>
          <div>
            <div className="flex flex-col">
              {userSessions.map((userSession, index) => (
                <div className="flex text-4xl justify-between" key={userSession.id}>
                  <p className="font-shapiro96_inclined_wide w-1/4 text-right">{index + 1}</p>
                  <p className="ml-20 w-2/4">{`${userSession.user.firstName} ${userSession.user.lastName}`}</p>
                  <p className="uppercase font-shapiro96_inclined_wide w-1/4">
                    {userSession.assignedTeam}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlayersList;