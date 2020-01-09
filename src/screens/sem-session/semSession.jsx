import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'ramda';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import colors from 'shared/styles/constants';
import Loading from 'shared/components/Loading';
import Button from 'shared/components/Button';
import { initialLoadInit, checkInInit } from './actionCreators';
import { getPageLoading, getSessionInfo, getPlayers } from './reducer';
import ArrivedPlayersList from './components/ArrivedPlayersList';
import NotArrivedPlayersList from './components/NotArrivedPlayersList';

import ImageContainer from './components/ImageContainer';

const Container = styled.div`
  .button-container {
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
  }

  .button {
    width: 80%;
  }
`;

const SessionContainer = styled.div`
  position: relative;

  img {
    width: 100%;
    max-height: 18rem;
  }

  .title {
    font-size: 1.5rem;
    text-transform: uppercase;
    font-weight: 100;
    color: ${colors.white};
    position: absolute;
    bottom: 0;
    padding-left: 2rem;
    letter-spacing: 0.2rem;
    margin-bottom: 1rem;

    p {
      margin: 0;
    }
  }

  .bold {
    font-weight: bold;
  }

  .players-title {
    padding-left: 2rem;
    font-weight: 400;
  }
`;

const SemSession = () => {
  const dispatch = useDispatch();
  const { id, date } = useParams();
  const sessionInfo = useSelector(getSessionInfo);
  const isPageLoading = useSelector(getPageLoading);
  const players = useSelector(getPlayers);
  const [checkedInPlayers, setCheckedInPlayers] = useState([]);
  const [notCheckedInPlayers, setNotCheckedInPlayers] = useState([]);

  const checkOutPlayer = player => {
    setCheckedInPlayers(checkedInPlayers.filter(({ id }) => id !== player.id));
    setNotCheckedInPlayers([...notCheckedInPlayers, player]);
  };

  const checkInPlayer = player => {
    setCheckedInPlayers([...checkedInPlayers, player]);
    setNotCheckedInPlayers(notCheckedInPlayers.filter(({ id }) => id !== player.id));
  };

  const confirmCheckedInPlayers = () => {
    const checkInIds = checkedInPlayers.map(player => player.id);
    dispatch(checkInInit(checkInIds, notCheckedInPlayers.length));
  };

  useEffect(() => {
    dispatch(initialLoadInit(id, date));
  }, [dispatch, id, date]);

  useEffect(() => {
    setNotCheckedInPlayers(players);
  }, [players]);

  return isPageLoading ? (
    <Loading />
  ) : (
    <Container>
      <SessionContainer>
        <ImageContainer
          img="https://ak9.picdn.net/shutterstock/videos/23220619/thumb/1.jpg"
          overlayColor={colors.lightblackOverlay}
        >
          <div className="title">
            <p>{sessionInfo.location && sessionInfo.location.name}</p>
            <p className="bold">session</p>
          </div>
        </ImageContainer>
        <h2 className="players-title">Players list</h2>
      </SessionContainer>
      {!isEmpty(checkedInPlayers) && (
        <ArrivedPlayersList players={checkedInPlayers} checkOutPlayer={checkOutPlayer} />
      )}
      {!isEmpty(notCheckedInPlayers) && (
        <NotArrivedPlayersList players={notCheckedInPlayers} checkInPlayer={checkInPlayer} />
      )}
      <div className="button-container">
        <Button onClick={confirmCheckedInPlayers} className="button">
          Go to session
        </Button>
      </div>
    </Container>
  );
};

export default SemSession;
