import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  startOfWeek,
  subDays,
  addWeeks,
  eachDayOfInterval,
  format,
  isSameDay,
  isThisWeek,
  isPast,
  isToday,
} from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
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
  getSessionsByDateHandler,
}) => {
  const startOfWeekDate = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const endOfWeek = subDays(addWeeks(startOfWeekDate, 1), 1);
  const weekRange = eachDayOfInterval({ start: startOfWeekDate, end: endOfWeek });
  const weekTitle = ` WEEK ${format(startOfWeekDate, 'LLLL')} ${format(
    startOfWeekDate,
    'd'
  )} - ${format(endOfWeek, 'LLLL')} ${format(endOfWeek, 'd')}`;

  return (
    <WeekSelectorContainer>
      <div className="week-handler">
        <button type="button" onClick={decreaseHandler} disabled={isThisWeek(selectedDate)}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <span className="weektitle-container">{weekTitle}</span>
        <button type="button" onClick={increaseHandler}>
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
      <div className="weekdays-container">
        {weekRange.map(day => {
          const isPastToday = isPast(day) && !isToday(day);
          const clickHandler = () => getSessionsByDateHandler(day);
          const dayName = format(day, 'EEEEEE');
          const dayNumber = format(day, 'd');

          return (
            <DayContainer
              key={day}
              day={day}
              currentDay={selectedDate}
              className={`${isPastToday ? 'day-container disabled' : 'day-container'}`}
              onClick={clickHandler}
              disabled={isPastToday}
            >
              <span className="day-name">{dayName}</span>
              <span className="day-number">{dayNumber}</span>
            </DayContainer>
          );
        })}
      </div>
    </WeekSelectorContainer>
  );
};

WeekSelector.propTypes = {
  selectedDate: PropTypes.string.isRequired,
  increaseHandler: PropTypes.func.isRequired,
  decreaseHandler: PropTypes.func.isRequired,
  getSessionsByDateHandler: PropTypes.func.isRequired,
};

export default WeekSelector;
