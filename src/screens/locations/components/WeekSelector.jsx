import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import {
  isSameDay,
  startOfWeek,
  weekRangeTitle,
  weekRange,
  dayShort,
  dayNumber,
  isThisWeek,
  isPast,
} from 'shared/utils/date';
import colors from 'shared/styles/constants';

const WeekSelectorContainer = styled.div`
  .week-handler {
    display: flex;
    padding: 0.5rem 0;

    button {
      padding: 1rem;
      font-size: 1rem;
      border: 0;
      background-color: transparent;
      cursor: pointer;
    }

    svg {
      font-size: 1.5rem;
    }
  }

  .weektitle-container {
    text-transform: uppercase;
    font-size: 0.75rem;
    font-weight: bold;
    flex: 1;
    text-align: center;
    align-self: center;
  }

  .weekdays-container {
    display: flex;
    justify-content: space-evenly;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);

    .disabled {
      color: ${colors.lightGrey};
    }
  }
`;

const DayContainer = styled.button`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: bold;
  text-align: center;
  padding: 1rem;
  border: 0;
  cursor: pointer;
  background-color: ${({ day, currentDay }) => (isSameDay(day, currentDay) ? 'black' : 'white')};
  color: ${({ day, currentDay }) => (isSameDay(day, currentDay) ? 'white' : 'black')};
`;

const WeekSelector = ({
  selectedDate,
  increaseHandler,
  decreaseHandler,
  setSelectedDateHandler,
}) => (
  <WeekSelectorContainer>
    <div className="week-handler">
      <button type="button" onClick={decreaseHandler} disabled={isThisWeek(selectedDate)}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <span className="weektitle-container">{weekRangeTitle(selectedDate)}</span>
      <button type="button" onClick={increaseHandler}>
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
    <div className="weekdays-container">
      {weekRange(startOfWeek(selectedDate)).map(day => (
        <DayContainer
          key={day}
          day={day}
          currentDay={selectedDate}
          className={`${isPast(day) ? 'day-container disabled' : 'day-container'}`}
          onClick={() => setSelectedDateHandler(day)}
          disabled={isPast(day)}
        >
          <span className="day-name">{dayShort(day)}</span>
          <span className="day-number">{dayNumber(day)}</span>
        </DayContainer>
      ))}
    </div>
  </WeekSelectorContainer>
);

WeekSelector.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  increaseHandler: PropTypes.func.isRequired,
  decreaseHandler: PropTypes.func.isRequired,
  setSelectedDateHandler: PropTypes.func.isRequired,
};

export default WeekSelector;
