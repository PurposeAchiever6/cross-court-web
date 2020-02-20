import React, { useState } from 'react';
import { isEmpty } from 'ramda';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ROUTES from 'shared/constants/routes';
import colors from 'shared/styles/constants';
import NewModal from 'shared/components/NewModal';
import Button from 'shared/components/Button';

import Timer from '../components/Timer';
import WinStreak from '../components/WinStreak';
import Randomizer from '../components/Randomizer';
import Header from '../components/Header';
import EndSessionModal from '../components/EndSessionModal';
import { getSessionInfo } from '../reducer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .end-session-btn {
    background-color: ${colors.black};
    color: ${colors.white};
    margin: 2rem 0 1rem;
    width: 80%;
  }
`;

const SessionStatePage = () => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const sessionInfo = useSelector(getSessionInfo);
  if (isEmpty(sessionInfo)) {
    return <Redirect to={ROUTES.SEM} />;
  }

  const endSession = () => {
    setShowModal(false);
    history.push(ROUTES.MYACCOUNT);
  };

  return (
    <Container>
      <Header name={sessionInfo.location.name} />
      <Timer />
      <WinStreak />
      <Randomizer />
      <Button className="end-session-btn" onClick={() => setShowModal(true)}>
        End Session
      </Button>
      <NewModal shouldClose closeHandler={() => setShowModal(false)} isOpen={showModal}>
        <EndSessionModal closeHandler={() => setShowModal(false)} endSession={endSession} />
      </NewModal>
    </Container>
  );
};

export default SessionStatePage;
