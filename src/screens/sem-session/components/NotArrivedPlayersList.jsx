import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UncheckedSvg from 'shared/components/UncheckedSvg';
import colors from 'shared/styles/constants';
import CheckboxButton from 'shared/components/CheckboxButton';

const Container = styled.div`
  margin-bottom: 3rem;

  .title {
    text-transform: uppercase;
    color: #9999ff;
    font-size: 1rem;
    margin: 0 2rem;
  }

  .empty-list {
    height: 3rem;
    margin: 0.5rem 2rem;
    background-color: ${colors.lightGrey};
    line-height: 2.5;
    padding-left: 1rem;
  }
`;

const PlayerContainer = styled.div`
  border-bottom: .05rem solid ${colors.blackOverlay}
  display: flex;
  justify-content: space-around;
  padding: 0 2rem;
  align-items: center;
  height: 4rem;

  .player-name {
    font-weight: 500;
    font-size: 1.2rem;
    padding-left: 1rem;
    flex: 6;
  }
`;

export const NotArrivedPlayersList = ({ players, checkInPlayer }) => (
  <Container>
    {players && players.length > 0 && (
      <div>
        <p className="title">yet to arrive</p>
        {players.map(player => (
          <PlayerContainer key={player.id}>
            <CheckboxButton onClick={() => checkInPlayer(player)}>
              <UncheckedSvg />
            </CheckboxButton>
            <p className="player-name">{player.name}</p>
          </PlayerContainer>
        ))}
      </div>
    )}
  </Container>
);

NotArrivedPlayersList.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object),
  checkInPlayer: PropTypes.func.isRequired,
};

export default NotArrivedPlayersList;
