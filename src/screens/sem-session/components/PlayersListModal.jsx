import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty, partition } from 'ramda';
import styled from 'styled-components';
import Loading from 'shared/components/Loading';
import Button from 'shared/components/Button';
import AlternativeButton from 'shared/components/AlternativeButton';
import LeftArrowSvg from 'shared/components/svg/LeftArrowSvg';

import { initialLoadInit, checkInInit } from '../actionCreators';
import { getPageLoading, getPlayers } from '../reducer';
import ArrivedPlayersList from './ArrivedPlayersList';
import NotArrivedPlayersList from './NotArrivedPlayersList';

const Container = styled.div`
  .header {
    display: flex;

    .players-title {
      padding-left: 2rem;
      font-weight: 400;
    }
  }

  .button-container {
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
  }

  .button {
    width: 80%;
  }
`;

const PlayersListModal = ({
  closeHandler,
  selectedSession: {
    date,
    session: { id },
  },
}) => {
  const dispatch = useDispatch();
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
    const notCheckInIds = notCheckedInPlayers.map(player => player.id);
    dispatch(checkInInit(checkInIds, notCheckInIds));
    closeHandler();
  };

  useEffect(() => {
    dispatch(initialLoadInit(id, date));
  }, [dispatch, id, date]);

  useEffect(() => {
    const [alreadyCheckedIn, notCheckedIn] = partition(player => player.checkedIn, players);
    setCheckedInPlayers(alreadyCheckedIn);
    setNotCheckedInPlayers(notCheckedIn);
  }, [players]);

  return isPageLoading ? (
    <Loading />
  ) : (
    <Container>
      <div className="header">
        <AlternativeButton onClick={closeHandler}>
          <LeftArrowSvg />
        </AlternativeButton>
        <h2 className="players-title">Players list</h2>
      </div>
      {!isEmpty(checkedInPlayers) && (
        <ArrivedPlayersList players={checkedInPlayers} checkOutPlayer={checkOutPlayer} />
      )}
      {!isEmpty(notCheckedInPlayers) && (
        <NotArrivedPlayersList players={notCheckedInPlayers} checkInPlayer={checkInPlayer} />
      )}
      <div className="button-container">
        <Button onClick={confirmCheckedInPlayers} className="button">
          Save & Close
        </Button>
      </div>
    </Container>
  );
};

PlayersListModal.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  selectedSession: PropTypes.shape({
    date: PropTypes.string.isRequired,
    session: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default PlayersListModal;
