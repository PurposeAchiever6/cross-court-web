import React from 'react';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
import { disableOnboardingTour } from 'shared/utils/onboardingTour';
import OnboardingTour from 'shared/components/OnboardingTour';

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
    font-size: 1rem;
    font-weight: bold;
    flex: 1;
    text-align: center;
    align-self: center;
  }

  .weekdays-container {
    display: flex;
    overflow-y: scroll;
    justify-content: space-between;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
`;

const DayContainer = styled.button`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  padding: 6px;
  border: 0;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  background-color: ${({ day, currentDay }) => (isSameDay(day, currentDay) ? 'black' : 'white')};
  color: ${({ day, currentDay, disabled }) =>
    disabled ? colors.lightGrey : isSameDay(day, currentDay) ? 'white' : 'black'};
  .day-number {
    text-align: center;
  }
`;

const WeekSelector = ({
  selectedDate,
  increaseHandler,
  decreaseHandler,
  setSelectedDateHandler,
}) => {
  const onboardingTourId = 'onboarding-tour-week-selector';

  const exitWeekSelectorOnboardingTour = () => {
    disableOnboardingTour(onboardingTourId);
  };

  const onNextWeekClick = () => {
    exitWeekSelectorOnboardingTour();
    increaseHandler();
  };

  return (
    <WeekSelectorContainer>
      <div className="week-handler">
        <button type="button" onClick={decreaseHandler} disabled={isThisWeek(selectedDate)}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <span className="weektitle-container">{weekRangeTitle(selectedDate)}</span>
        <button id="week-selector-next-week" type="button" onClick={onNextWeekClick}>
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
      <div className="weekdays-container px-2 md:px-6">
        {weekRange(startOfWeek(selectedDate)).map((day) => (
          <DayContainer
            key={day}
            day={day}
            currentDay={selectedDate}
            onClick={() => setSelectedDateHandler(day)}
            disabled={isPast(day)}
          >
            <span className="text-xs sm:text-base">{dayShort(day)}</span>
            <span className="text-sm sm:text-base">{dayNumber(day)}</span>
          </DayContainer>
        ))}
      </div>
      <OnboardingTour
        id={onboardingTourId}
        timeout={1000}
        steps={[
          {
            element: '#week-selector-next-week',
            intro: "Tap here to see next week's schedule.",
          },
        ]}
        onExit={exitWeekSelectorOnboardingTour}
      />
    </WeekSelectorContainer>
  );
};

WeekSelector.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  increaseHandler: PropTypes.func.isRequired,
  decreaseHandler: PropTypes.func.isRequired,
  setSelectedDateHandler: PropTypes.func.isRequired,
};

export default WeekSelector;
