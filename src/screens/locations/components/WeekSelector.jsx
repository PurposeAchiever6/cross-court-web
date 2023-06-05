import React, { useEffect, useRef } from 'react';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import {
  isSameDay,
  startOfWeek,
  weekRangeTitle,
  weekRange,
  dayShort,
  dayNumber,
  isThisWeek,
  isInFutureWeek,
  isPast,
} from 'shared/utils/date';
import WeekButton from 'screens/locations/components/WeekButton';

const WeekSelector = ({
  selectedDate,
  increaseHandler,
  decreaseHandler,
  setSelectedDateHandler,
  className,
}) => {
  const horizontalScrollContainerRef = useRef(null);

  useEffect(() => {
    if (!selectedDate) {
      return;
    }

    horizontalScrollContainerRef.current.scrollLeft = 45 * selectedDate.getDay();
  }, [selectedDate]);

  return (
    <div className={className}>
      <div className="bg-cc-blue-900 text-center text-sm px-4 py-3 mb-2">
        {weekRangeTitle(selectedDate)}
      </div>
      <div className="flex md:hidden mb-2">
        <WeekButton
          icon={faAngleLeft}
          onClick={decreaseHandler}
          disabled={isThisWeek(selectedDate)}
          className="w-full mr-1"
        />
        <WeekButton
          icon={faAngleRight}
          onClick={increaseHandler}
          disabled={isInFutureWeek(selectedDate, 2)}
          className="w-full ml-1"
        />
      </div>
      <div
        className="flex overflow-x-auto md:overflow-x-visible"
        ref={horizontalScrollContainerRef}
      >
        <WeekButton
          icon={faAngleLeft}
          onClick={decreaseHandler}
          disabled={isThisWeek(selectedDate)}
          className="hidden md:block mr-1"
        />
        {weekRange(startOfWeek(selectedDate)).map((day) => (
          <button
            key={day}
            type="button"
            onClick={() => setSelectedDateHandler(day)}
            className={`w-full text-center text-sm px-4 py-2 mx-1 transition-all duration-300 sm:hover:bg-cc-blue-700 ${
              isSameDay(day, selectedDate)
                ? 'bg-white text-cc-blue-900 pointer-events-none'
                : 'bg-cc-blue-900'
            } ${isPast(day) ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <span className="block font-shapiro95_super_wide uppercase">{dayShort(day)}</span>
            <span className="block">{dayNumber(day)}</span>
          </button>
        ))}
        <WeekButton
          icon={faAngleRight}
          onClick={increaseHandler}
          disabled={isInFutureWeek(selectedDate, 2)}
          className="hidden md:block ml-1"
        />
      </div>
    </div>
  );
};

WeekSelector.defaultProps = {
  className: '',
};

WeekSelector.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  increaseHandler: PropTypes.func.isRequired,
  decreaseHandler: PropTypes.func.isRequired,
  setSelectedDateHandler: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default WeekSelector;
