import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { isEmpty } from 'ramda';

import colors from 'shared/styles/constants';
import SessionLevel from 'shared/components/SessionLevel';
import SpotsLeft from 'shared/components/SpotsLeft';
import {
  hourRange,
  urlFormattedDate,
  isSameDay,
  sortSessionsByDate,
  formatSessionTime,
  formatSessionDate,
} from 'shared/utils/date';
import { getUserProfile } from 'screens/my-account/reducer';
import ArButton from 'shared/components/ArButton';

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
      max-width: 50%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

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
        margin-bottom: 0.25rem;
      }
    }

    .btn-alternative {
      color: ${colors.black};
      border-color: ${colors.black};
      padding: 1rem 2.3rem;
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
`;

const SessionsList = ({ availableSessions, selectedDate }) => {
  const { phoneNumber } = useSelector(getUserProfile);

  const sessionList = availableSessions.filter(({ startTime }) =>
    isSameDay(startTime, selectedDate)
  );
  const sortedSessions = sortSessionsByDate(sessionList);

  if (isEmpty(sortedSessions)) {
    return (
      <SessionsListContainer>
        <div className="no-sessions-container">
          NO SESSIONS SCHEDULED FOR THIS DATE
        </div>
      </SessionsListContainer>
    );
  }

  return (
    <SessionsListContainer>
      {sortedSessions.map(
        ({ id, startTime, time, full, location, level, spotsLeft, reserved, past }) => {
          const sessionTime = formatSessionTime(time);
          const URLdate = urlFormattedDate(startTime);
          const emailSessionDate = formatSessionDate(startTime);
          const mailInfo = `mailto:ccteam@cross-court.com?subject=Join Waitlist&body=I would like to be added to the waitlist for the ${sessionTime} session on ${emailSessionDate} at ${location.name}. Please notify me if a spot opens up. You can reach me at ${phoneNumber}.`;
          let button;
          if (reserved || past) {
            button = (
              <ArButton link={`/session/${id}/${URLdate}`} inverted>
                SEE DETAILS
              </ArButton>
            );
          } else if (full) {
            button = <ArButton link={mailInfo}>JOIN WAITLIST</ArButton>;
          } else {
            button = <ArButton link={`/session/${id}/${URLdate}`}>RESERVE</ArButton>;
          }
          return (
            <div className="session-list-item-container" key={id}>
              <div className="text-container">
                <div className="time">{hourRange(time)}</div>
                <div className="location">{location.name}</div>
                <SessionLevel level={level} />
                <SpotsLeft spotsLeft={spotsLeft} />
              </div>
              {button}
            </div>
          );
        }
      )}
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
      level: PropTypes.string.isRequired,
    })
  ),
  selectedDate: PropTypes.instanceOf(Date).isRequired,
};

export default SessionsList;
