import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CheckedSvg from 'shared/components/CheckedSvg';
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

  .player-number {
    border-bottom: .25rem solid #9999ff;
    font-size: 2rem;
    text-align: center;
    font-family: Space Mono;
    font-weight: 500;
    line-height: 2;
    margin-bottom: 2.2rem;
    width: 3.5rem;
    max-width: 3.5rem;
  }
`;

export const ArrivedPlayersList = ({ players, checkOutPlayer }) => (
  <Container>
    <div>
      <p className="title">arrived</p>
      {players.map((player, index) => (
        <PlayerContainer key={player.id}>
          <CheckboxButton onClick={() => checkOutPlayer(player)}>
            <CheckedSvg />
          </CheckboxButton>
          <p className="player-name">{player.name}</p>
          <p className="player-number">{index + 1}</p>
        </PlayerContainer>
      ))}
    </div>
  </Container>
);

ArrivedPlayersList.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object),
  checkOutPlayer: PropTypes.func.isRequired,
};

export default ArrivedPlayersList;
