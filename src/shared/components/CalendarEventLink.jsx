import React, { useEffect } from 'react';
import { atcb_init as atcbInit } from 'add-to-calendar-button';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import 'add-to-calendar-button/assets/css/atcb.css';

const Container = styled.div`
  .atcb-icon,
  .atcb-checkmark {
    display: none !important;
  }

  .atcb-button-wrapper {
    all: unset !important;
  }

  .atcb-button {
    all: unset !important;

    &:hover {
      all: unset !important;
    }
  }
`;

const CalendarEventLink = ({
  name,
  description,
  startDate,
  endDate,
  startTime,
  endTime,
  location,
  calendarProvider,
  timeZone,
  iCalFileName,
  className,
  children,
}) => {
  useEffect(() => {
    atcbInit();
  }, []);

  const atcbString = `{
    "name": "${name}",
    "description": "${description}",
    "startDate": "${startDate}",
    "endDate": "${endDate}",
    "startTime": "${startTime}",
    "endTime": "${endTime}",
    "location": "${location}",
    "label": "${children}",
    "options": ["${calendarProvider}"],
    "timeZone": "${timeZone}",
    "iCalFileName": "${iCalFileName}",
    "hideIconButton": true,
    "hideCheckmark": true
}`;

  return (
    <Container className={`text-cc-purple inline-block cursor-pointer ${className}`}>
      <div className="atcb">{atcbString}</div>
    </Container>
  );
};

CalendarEventLink.defaultProps = {
  description: '',
  location: '',
  className: '',
};

CalendarEventLink.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  location: PropTypes.string,
  calendarProvider: PropTypes.oneOf(['Google', 'Apple']).isRequired,
  timeZone: PropTypes.string.isRequired,
  iCalFileName: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
};

export default CalendarEventLink;
