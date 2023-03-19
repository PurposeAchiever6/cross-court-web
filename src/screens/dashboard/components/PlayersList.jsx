import React, { useState, useEffect, useCallback } from 'react';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import { useSelector, useDispatch } from 'react-redux';
import {
  getPageLoading,
  getAvailableLocations,
  getAvailableSessions,
  getSessionsLoading,
} from 'screens/locations/reducer';
import {
  getLocations,
  getSessionsByLocation,
  setSelectedDate,
} from 'screens/locations/actionCreators';
import { isToday, formatSessionTime, formatSessionDate } from 'shared/utils/date';

import userSessionService from 'screens/user-sessions/service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import missingProfileImg from 'shared/images/missing-profile-image.png';

const LEFT = 'left';
const RIGHT = 'right';

const PlayersList = () => {
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(getLocations());
    dispatch(setSelectedDate(new Date().toLocaleDateString('en-US')));
  }, [dispatch]);

  useEffect(() => {
    if (!isSessionsLoading && !isPageLoading && availableLocations.length) {
      setSelectedLocation(availableLocations[0]);
    }
  }, [dispatch, availableLocations, isSessionsLoading, isPageLoading]);

  useEffect(() => {
    if (selectedLocation) {
      dispatch(getSessionsByLocation(selectedLocation.id));
    }
  }, [dispatch, selectedLocation]);

  useEffect(() => {
    if (availableSessions.length) {
      const sessions = availableSessions
        .filter(({ startTime, isOpenClub }) => isToday(startTime) && !isOpenClub)
        .sort((a, b) => (a.time > b.time ? 1 : -1));

      setSelectedSession(sessions[0]);
      setSessionsForThisLocation(sessions);
    }
  }, [availableSessions]);

  const getUserSessionsList = useCallback(async () => {
    const currentDate = new Date().toLocaleDateString('en-US');
    const userSessionsList = await userSessionService.getUserSessionList(selectedSession.id, {
      date: currentDate,
      checked_in: true,
    });
    setUserSessions(userSessionsList);
  }, [selectedSession]);

  useEffect(() => {
    if (selectedSession) getUserSessionsList();
  }, [selectedSession, getUserSessionsList]);

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

  const isFirstSessionSelected = sessionsForThisLocation.indexOf(selectedSession) === 0;
  const isLastSessionSelected =
    sessionsForThisLocation.indexOf(selectedSession) === sessionsForThisLocation.length - 1;

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
                onClick={() => changeSelectedSession(LEFT)}
                disabled={isFirstSessionSelected}
                className={`text-4xl px-4 ${
                  isFirstSessionSelected ? 'pointer-events-none opacity-40' : ''
                }`}
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
                onClick={() => changeSelectedSession(RIGHT)}
                disabled={isLastSessionSelected}
                className={`text-4xl px-4 ${
                  isLastSessionSelected ? 'pointer-events-none opacity-40' : ''
                }`}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </button>
            </div>
            <PrimaryButton
              inverted
              className="m-5"
              onClick={getUserSessionsList}
              disabled={!selectedSession}
            >
              Refresh
            </PrimaryButton>
            <PrimaryButton className="m-5" onClick={() => setShowList(false)}>
              Dashboard
            </PrimaryButton>
          </div>
          <div>
            <div className="flex flex-col">
              {userSessions.map((userSession, index) => (
                <div className="flex text-4xl justify-between items-center" key={userSession.id}>
                  <p className="font-shapiro96_inclined_wide w-1/5 text-center">{index + 1}</p>
                  <div className="flex justify-center w-1/5">
                    <img
                      className="w-16 h-16 object-cover rounded-full"
                      src={
                        userSession.user.imageUrl ? userSession.user.imageUrl : missingProfileImg
                      }
                      alt="Profile"
                    />
                  </div>
                  <p
                    className={`ml-12 w-2/5 ${
                      userSession.isFirstSession ? 'text-cc-purple' : 'text-cc-black'
                    }`}
                  >{`${userSession.user.firstName} ${userSession.user.lastName}`}</p>
                  <p className="uppercase font-shapiro96_inclined_wide w-1/5">
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
