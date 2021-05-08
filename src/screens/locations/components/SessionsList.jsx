import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { isEmpty } from 'ramda';

import colors from 'shared/styles/constants';
import SessionLevel from 'shared/components/SessionLevel';
import FewSessionsLeftTriangle from 'screens/locations/images/few-sessions-left-triangle.png';
import {
  hourRange,
  urlFormattedDate,
  isSameDay,
  sortSessionsByDate,
  formatSessionTime,
  formatSessionDate,
} from 'shared/utils/date';
import { getUserProfile } from 'screens/my-account/reducer';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

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
      max-width: 48%;
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
        <div className="no-sessions-container">NO SESSIONS SCHEDULED FOR THIS DATE</div>
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
          const fewSpotsLeftText = 'JUST A FEW SPOTS LEFT';
          let button;
          if (reserved || past) {
            button = (
              <PrimaryButton to={`/session/${id}/${URLdate}`} inverted>
                SEE DETAILS
              </PrimaryButton>
            );
          } else if (full) {
            button = <PrimaryButton to={mailInfo}>JOIN WAITLIST</PrimaryButton>;
          } else {
            button = <PrimaryButton to={`/session/${id}/${URLdate}`}>RESERVE</PrimaryButton>;
          }
          return (
            <div
              className={
                'session-list-item-container' + (past ? ' past' : '') + (full ? ' full' : '')
              }
              key={id}
            >
              <div className="text-container">
                <div className="time">{hourRange(time)}</div>
                <div className="location">{location.name}</div>
                <SessionLevel level={level} />
              </div>
              <div className="status-container">
                {spotsLeft > 0 && spotsLeft <= 5 && fewSpotsLeftText && (
                  <div className="spots-left-container">
                    <img alt="" className="triangle" src={FewSessionsLeftTriangle} />
                    <div className="spots-left">{fewSpotsLeftText}</div>
                  </div>
                )}
                {button}
              </div>
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
