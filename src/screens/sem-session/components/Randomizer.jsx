import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import colors from 'shared/styles/constants';
import Button from 'shared/components/Button';
import { PLAYERS_PER_TEAM, MAX_MISSING_PLAYERS } from 'shared/constants/gameConstants';
import { getPlayersMissing } from '../reducer';

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

    * {
      flex: 0 0 auto;
    }

    .number {
      border: 1px solid ${colors.black};
      font-size: 1.8rem;
      padding-left: 0.5rem;
      line-height: 1.5;
      flex: 1;
      margin-right: 0.5rem;
    }

    p {
      margin: 0;
      line-height: 2rem;
      padding-bottom: 0.5rem;
    }
  }

  .players-btn {
    height: 3rem;
    font-size: 1.8rem;
    border: 1px solid ${colors.black};
    background-color: ${colors.white};
    flex: 1;
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
  const playersMissing = useSelector(getPlayersMissing);
  const [missingPlayers, setMissingPlayers] = useState(0);
  const [playersThatStay, setPlayersThatStay] = useState([]);
  const addMissingPlayer = () => {
    setMissingPlayers(Math.min(missingPlayers + 1, MAX_MISSING_PLAYERS));
  };

  const substractMissingPlayer = () => {
    setMissingPlayers(Math.max(missingPlayers - 1, 0));
  };

  useEffect(() => {
    setMissingPlayers(parseInt(playersMissing, 10));
  }, [playersMissing]);

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
          <p>{missingPlayers}</p>
        </div>
        <div>
          <button className="players-btn" type="button" onClick={substractMissingPlayer}>
            <p>-</p>
          </button>
        </div>
        <div>
          <button className="players-btn" type="button" onClick={addMissingPlayer}>
            <p>+</p>
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
