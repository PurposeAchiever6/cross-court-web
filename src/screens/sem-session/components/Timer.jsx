import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Button from 'shared/components/Button';
import colors from 'shared/styles/constants';

import { getTimerOn, getTimerStart } from '../reducer';
import { startTimer, pauseTimer, resumeTimer, resetTimer } from '../actionCreators';

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
  const dispatch = useDispatch();
  const timerId = useRef();
  const [timerTime, setTimerTime] = useState(0);

  const timerOn = useSelector(getTimerOn);
  const timerStart = useSelector(getTimerStart);

  const start = () => {
    dispatch(startTimer());
  };

  const pause = () => {
    dispatch(pauseTimer());
    clearInterval(timerId.current);
  };

  const resume = () => {
    dispatch(resumeTimer(Date.now() - timerTime));
  };

  const reset = () => {
    dispatch(resetTimer());
    clearInterval(timerId.current);
    setTimerTime(0);
  };

  useEffect(() => {
    if (timerStart && timerOn) {
      timerId.current = setInterval(() => {
        setTimerTime(Date.now() - timerStart);
      }, 10);
    }
  }, [timerStart, timerOn]);

  const centiseconds = `0${Math.floor(timerTime / 10) % 100}`.slice(-2);
  const seconds = `0${Math.floor(timerTime / 1000) % 60}`.slice(-2);
  const minutes = `0${Math.floor(timerTime / 60000) % 60}`.slice(-2);

  let rightButton;

  if (timerOn) {
    rightButton = (
      <Button className="pause" onClick={pause}>
        Pause Timer
      </Button>
    );
  } else if (timerTime) {
    rightButton = <Button onClick={resume}>Resume Timer</Button>;
  } else {
    rightButton = <Button onClick={start}>Start Timer</Button>;
  }

  return (
    <Container>
      <div className="time">
        <p>
          {minutes}:{seconds}:{centiseconds}
        </p>
      </div>
      <div className="buttons">
        <Button className="reset" onClick={reset}>
          Reset
        </Button>
        {rightButton}
      </div>
    </Container>
  );
};

export default Timer;
