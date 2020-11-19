import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { isEmpty, take } from 'ramda';
import colors from 'shared/styles/constants';
import ROUTES from 'shared/constants/routes';
import ArButton from 'shared/components/ArButton';
import Session from './Session';

const SessionsListContainer = styled.div`
  margin: 2rem auto 1rem;

  h3 {
    font-size: 1.5rem;
    font-weight: 500;
  }

  .empty-container {
    background-color: ${colors.offWhite};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (min-width: 992px) {
      height: 25rem;
    }

    .container-empty-message {
      margin: 2rem 0;
      font-size: 2rem;
      color: ${colors.grey};
      text-align: center;

      p {
        font-size: 2rem;
        margin: 0;
        letter-spacing: 0.04em;
      }

      .title {
        font-weight: 500;
        margin-bottom: 2rem;
        text-transform: uppercase;
        font-size: 2.5rem;
      }
    }
  }

  .sessions {
    width: 90%;
    margin: auto;

    .sessions-container {
      display: flex;
      flex-wrap: wrap;
    }
  }

  @media (max-width: 991px) {
    margin: 0 0 1rem;
  }
`;

const SessionsList = ({ title, sessions, past, isSem }) => {
  const filteredSessions = sessions.filter((session) => session.state !== 'canceled');
  const sesionsToShow = take(3, filteredSessions);

  return (
    <SessionsListContainer className={!past ? 'upcoming-sessions' : 'past-sessions'}>
      {isEmpty(sesionsToShow) ? (
        <div className="empty-container">
          <div className="container-empty-message">
            <h3>YOU HAVE NO {title}</h3>
            {!past && !isSem && (
              <ArButton link={ROUTES.LOCATIONS} inverted={false}>
                EXPLORE SESSIONS
              </ArButton>
            )}
          </div>
        </div>
      ) : (
        <div className="sessions">
          <h3>{title}</h3>
          <div className="sessions-container">
            {sesionsToShow.map((session) => (
              <Session isSem={isSem} past={past} key={session.id} sessionInfo={session} />
            ))}
          </div>
        </div>
      )}
    </SessionsListContainer>
  );
};

SessionsList.propTypes = {
  past: PropTypes.bool,
  isSem: PropTypes.bool,
  title: PropTypes.string.isRequired,
  sessions: PropTypes.arrayOf(PropTypes.object),
};

export default SessionsList;
