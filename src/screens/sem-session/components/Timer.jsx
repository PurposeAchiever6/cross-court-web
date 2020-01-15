import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Button from 'shared/components/Button';
import colors from 'shared/styles/constants';

const Container = styled.div`
  min-width: 90%;
  text-align: center;
  font-size: 3rem;
  margin: 1rem 2rem 2rem;
  box-shadow: 0px -2px 5px 0px ${colors.lightBlackOverlay};

  .buttons {
    display: flex;
  }

  button {
    width: 100%;
    padding: 1rem 2rem;
    &:hover {
      background-color: ${colors.polarPlum};
    }
  }

  .reset {
    background-color: ${colors.black};
    &:hover {
      background-color: ${colors.black};
    }
  }

  .pause {
    background-color: ${colors.lightGrey};
    color: ${colors.black};
    &:hover {
      background-color: ${colors.lightGrey};
    }
  }

  .time {
    display: flex;
    justify-content: space-between;

    * {
      flex-basis: 100%;
      text-align: center;
    }

    p {
      margin-bottom: 1rem;
    }
  }
`;

const Timer = () => {
  const timerId = useRef();
  const [timerStart, setTimerStart] = useState();
  const [timerOn, setTimerOn] = useState(false);
  const [timerTime, setTimerTime] = useState(0);

  const startTimer = () => {
    setTimerOn(true);
    setTimerStart(Date.now());
  };

  const pauseTimer = () => {
    setTimerOn(false);
    clearInterval(timerId.current);
  };

  const resumeTimer = () => {
    setTimerOn(true);
    setTimerStart(Date.now() - timerTime);
  };

  const resetTimer = () => {
    clearInterval(timerId.current);
    setTimerTime(0);
    setTimerOn(false);
  };

  useEffect(() => {
    if (timerStart) {
      timerId.current = setInterval(() => {
        setTimerTime(Date.now() - timerStart);
      }, 10);
    }
  }, [timerStart]);

  const centiseconds = `0${Math.floor(timerTime / 10) % 100}`.slice(-2);
  const seconds = `0${Math.floor(timerTime / 1000) % 60}`.slice(-2);
  const minutes = `0${Math.floor(timerTime / 60000) % 60}`.slice(-2);

  let rightButton;

  if (timerOn) {
    rightButton = (
      <Button className="pause" onClick={pauseTimer}>
        Pause Timer
      </Button>
    );
  } else if (timerTime) {
    rightButton = <Button onClick={resumeTimer}>Resume Timer</Button>;
  } else {
    rightButton = <Button onClick={startTimer}>Start Timer</Button>;
  }

  return (
    <Container>
      <div className="time">
        <p>
          {minutes}:{seconds}:{centiseconds}
        </p>
      </div>
      <div className="buttons">
        <Button className="reset" onClick={resetTimer}>
          Reset
        </Button>
        {rightButton}
      </div>
    </Container>
  );
};

export default Timer;
