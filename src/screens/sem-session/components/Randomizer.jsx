import React, { useState } from 'react';
import styled from 'styled-components';
import colors from 'shared/styles/constants';
import Button from 'shared/components/Button';
import { PLAYERS_PER_TEAM, MAX_MISSING_PLAYERS } from 'shared/constants/gameConstants';

const Container = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 2rem;

  .text {
    text-transform: uppercase;
    font-size: 1rem;
    margin: 0 1.2rem;
  }

  .light-text {
    font-size: 1rem;
    margin: 0 1.2rem;
    color: ${colors.grey};
    margin-top: 1rem;
  }

  .title {
    color: ${colors.polarPlum};
  }

  .subtitle {
    color: ${colors.black};
    margin-top: 1rem;
    font-weight: 500;
  }

  .missing-players {
    display: flex;
    width: 70%;
    height: 3rem;
    justify-content: space-between;
    margin: 1.2rem;

    .number {
      border: 1px solid ${colors.black};
      font-size: 1.8rem;
      padding-left: 0.5rem;
      line-height: 1.5;
      flex: 5 3 7rem;
      margin-right: 0.5rem;
    }

    .first {
      margin-right: 0.5rem;
    }

    .players-btn {
      width: 100%;
      border: 1px solid ${colors.black};
      background-color: ${colors.white};
      flex: 2 1 3rem;

      button {
        font-size: 1.8rem;
        text-align: center;
        width: 100%;
        background-color: ${colors.white};
        outline: none;
        border: none;
      }
    }

    p {
      margin: 0;
      line-height: 2rem;
      padding-bottom: 0.5rem;
    }
  }

  .randomize-btn {
    margin-left: 1.2rem;
    width: 70%;
  }

  .result {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .result-item {
    background-color: ${colors.white};
    font-family: Space Mono;
    font-size: 4rem;
    width: 9rem;
    min-width: 9rem;
    height: 8rem;
    outline: none;
    line-height: 1.2;
    box-shadow: 0px 0px 5px 0px ${colors.lightBlackOverlay};
    margin: 1rem;

    p {
      text-align: center;
      margin: 0;
      height: 8rem;
      line-height: 8rem;
    }
  }
`;

const Randomizer = () => {
  const [missingPlayers, setMissingPlayers] = useState(0);
  const [playersThatStay, setPlayersThatStay] = useState([]);
  const addMissingPlayer = () => {
    setMissingPlayers(Math.min(missingPlayers + 1, MAX_MISSING_PLAYERS));
  };

  const substractMissingPlayer = () => {
    setMissingPlayers(Math.max(missingPlayers - 1, 0));
  };

  const randomize = () => {
    const result = [];
    while (result.length < missingPlayers) {
      const randomNumber = Math.floor(Math.random() * PLAYERS_PER_TEAM) + 1;
      if (result.indexOf(randomNumber) === -1) result.push(randomNumber);
    }
    setPlayersThatStay(result);
  };

  return (
    <Container>
      <p className="text title">random</p>
      <p className="text subtitle">players missing</p>
      <div className="missing-players">
        <div className="number">
          <span>{missingPlayers}</span>
        </div>
        <div className="players-btn first">
          <button type="button" onClick={substractMissingPlayer}>
            -
          </button>
        </div>
        <div className="players-btn">
          <button type="button" onClick={addMissingPlayer}>
            +
          </button>
        </div>
      </div>
      <Button className="randomize-btn" onClick={randomize}>
        Randomize
      </Button>
      <div>
        <p className="text subtitle">result</p>
        {playersThatStay.length ? (
          <div>
            <p className="text">Players that stay in court</p>
            <div className="result">
              {playersThatStay.map(index => (
                <div className="result-item" key={`stay-${index}`}>
                  <p>{`#${index}`}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <p className="light-text">Players that stay in court appear here</p>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Randomizer;
