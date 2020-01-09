import React from 'react';
import { isEmpty } from 'ramda';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import routes from 'shared/constants/routes';

import Timer from '../components/Timer';
import WinStreak from '../components/WinStreak';
import Randomizer from '../components/Randomizer';
import Header from '../components/Header';
import { getSessionInfo } from '../reducer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const SessionStatePage = () => {
  const sessionInfo = useSelector(getSessionInfo);
  if (isEmpty(sessionInfo)) {
    return <Redirect to={routes.sem} />;
  }

  return (
    <Container>
      <Header name={sessionInfo.location.name} />
      <Timer />
      <WinStreak />
      <Randomizer />
    </Container>
  );
};

export default SessionStatePage;
