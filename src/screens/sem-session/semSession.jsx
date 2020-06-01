import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getSemSessionsForToday } from 'screens/my-account/reducer';

import Timer from './components/Timer';
import WinStreak from './components/WinStreak';
import Randomizer from './components/Randomizer';
import Header from './components/Header';
import PlayerListModal from './components/PlayerListModal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const SessionStatePage = () => {
  const todaySessions = useSelector(getSemSessionsForToday);
  const [showPlayersModal, setShowPlayersModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState();
  const { id, date } = useParams();

  useEffect(() => {
    if (todaySessions.length) {
      const index = todaySessions.findIndex(
        ({ date: sessionDate, session: { id: sessionId } }) =>
          id === sessionId.toString() && date === sessionDate
      );
      setSelectedSession(index);
    }
  }, [todaySessions, id, date]);

  return showPlayersModal ? (
    <PlayerListModal
      closeHandler={() => setShowPlayersModal(false)}
      selectedSession={todaySessions[selectedSession]}
    />
  ) : (
    <Container>
      {selectedSession !== undefined && (
        <Header
          todaySessions={todaySessions}
          selectedSession={selectedSession}
          goToNextSession={() => setSelectedSession(selectedSession + 1)}
          goToPreviousSession={() => setSelectedSession(selectedSession - 1)}
          showPlayersModal={() => setShowPlayersModal(true)}
        />
      )}
      <Timer />
      <WinStreak />
      <Randomizer />
    </Container>
  );
};

export default SessionStatePage;
