import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { isEmpty } from 'ramda';
import colors from 'shared/styles/constants';
import Button from 'shared/components/Button';
import AlternativeButton from 'shared/components/AlternativeButton';
import device from 'shared/styles/mediaQueries';
import { hourRange, urlFormattedDate, isSameDay, sortSessionsByDate } from 'shared/utils/date';

const SessionsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  padding: 0 1rem;

  .session-list-item-container {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding: 2rem 1.25rem;
    display: flex;
    justify-content: space-between;
    width: 100%;

    .text-container {
      display: flex;
      flex-direction: column;

      .time {
        font-size: 0.9em;
        font-weight: 600;
        letter-spacing: 0.1rem;
        margin-bottom: 0.25rem;
      }

      .location {
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.1rem;
      }
    }

    .btn-alternative {
      color: ${colors.black};
      border-color: ${colors.black};
    }
  }

  .no-sessions-container {
    font-size: 3.5rem;
    color: ${colors.grey};
    text-align: center;
    flex: 1;
    justify-content: center;
    align-items: center;
    display: flex;

    em {
      font-weight: 600;
    }
  }

  @media ${device.mobile} {
    .session-list-item-container {
      height: 50vh;
    }
  }
`;

const SessionsList = ({ availableSessions, selectedDate }) => {
  const sessionList = availableSessions.filter(({ startTime }) =>
    isSameDay(startTime, selectedDate)
  );
  const sortedSessions = sortSessionsByDate(sessionList);

  if (isEmpty(sortedSessions)) {
    return (
      <SessionsListContainer>
        <div className="no-sessions-container">
          <span>
            <em>NO SESSIONS SCHEDULED</em> FOR THIS DATE
          </span>
        </div>
      </SessionsListContainer>
    );
  }

  return (
    <SessionsListContainer>
      {sortedSessions.map(({ id, startTime, time, isFull, location }) => (
        <div className="session-list-item-container" key={id}>
          <div className="text-container">
            <div className="time">{hourRange(time)}</div>
            <div className="location">{location.name}</div>
          </div>
          {isFull ? (
            <a href="mailto:info@crosscourt.com">
              <AlternativeButton className="btn-alternative">Join Waitlist</AlternativeButton>
            </a>
          ) : (
            <Link to={`/session/${id}/${urlFormattedDate(startTime)}`}>
              <Button>Reserve</Button>
            </Link>
          )}
        </div>
      ))}
    </SessionsListContainer>
  );
};

SessionsList.propTypes = {
  availableSessions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      startTime: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      location: PropTypes.object.isRequired,
    })
  ),
  selectedDate: PropTypes.instanceOf(Date).isRequired,
};

export default SessionsList;
