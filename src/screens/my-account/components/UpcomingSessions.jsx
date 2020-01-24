import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import AlternativeButton from 'shared/components/AlternativeButton';
import Button from 'shared/components/Button';
import device from 'shared/styles/mediaQueries';
import ROUTES from 'shared/constants/routes';
import { isEmpty, isNil } from 'ramda';
import colors from 'shared/styles/constants';
import { formatSessionTime } from 'shared/utils/date-time';
import ImageSvg from 'shared/components/svg/Image.svg';

const UpcomingSessionsContainer = styled.div`
  padding: 3rem;
  background-color: #f8f8f8;
  h3 {
    font-size: 1.75rem;
    font-weight: 500;
    margin: 0 0 2rem 0;
  }

  .sessions-container {
    display: flex;
    justify-content: flex-start;

    .container-empty-message {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      background-color: #f8f8f8;
      flex: 1;
      color: ${colors.grey};
      min-height: 25rem;
    }
    .session-item {
      display: flex;
      flex-direction: column;
      box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.15);
      margin-right: 2rem;
      min-width: 24rem;

      .no-image {
        width: 100%;
        height: 15rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${colors.polarPlum};
        background-color: ${colors.lightGrey};

        svg {
          width: 6rem;
        }
      }
      img {
        max-width: 100%;
      }

      .date {
        background-color: #f8f8f8;
        color: #bbbecd;
        font-style: italic;
        font-weight: bold;
        font-size: 18px;
        line-height: 22px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        padding: 1rem;
      }

      .details {
        display: flex;
        flex-direction: column;
        padding: 1.5rem;

        .time {
          font-family: Untitled Sans;
          font-style: normal;
          font-weight: bold;
          font-size: 18px;
          line-height: 22px;
          letter-spacing: 0.1em;
          color: #000000;
          margin-bottom: 0.5rem;
        }

        .location {
          font-size: 18px;
          line-height: 22px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 2rem;
        }

        .btn-alt {
          color: #000;
          border: 1px solid #000;
          font-weight: 500;
          font-size: 16px;
          line-height: 20px;
          width: 100%;
        }
      }
    }
  }

  @media ${device.mobile} {
    padding: 0;
    margin: 1rem auto;
    width: 90%;

    .sessions-container {
      flex-direction: column;
      justify-content: space-between;

      .session-item {
        margin-right: 0;
        margin-bottom: 1rem;
        max-width: 25rem;

        img {
          height: 100%;
          width: 100%;
          max-width: none;
        }
      }
    }
  }
`;

const UpcomingSessions = ({ sessions }) => {
  const formatDateTitle = date => format(new Date(date), 'eeee M/d');

  return (
    <UpcomingSessionsContainer>
      <h3>Upcoming Sessions</h3>
      <div className="sessions-container">
        {isEmpty(sessions) ? (
          <div className="container-empty-message">
            <h1>YOU HAVE NO UPCOMING SESSIONS</h1>
            <Link to={ROUTES.LOCATIONS}>
              <Button>Explore Sessions</Button>
            </Link>
          </div>
        ) : (
          sessions.map(session => (
            <div className="session-item" key={session.id}>
              {isNil(session.session.location.imageUrl) ? (
                <div className="no-image">
                  <ImageSvg />
                </div>
              ) : (
                <img src={session.session.location.imageUrl} alt="Session" />
              )}
              <span className="date">{formatDateTitle(session.date)}</span>
              <div className="details">
                <span className="time">{formatSessionTime(session.session.time)}</span>
                <span className="location">{session.session.location.name}</span>
                <Link
                  to={`/session/${session.session.id}/${format(
                    new Date(session.date),
                    'yyyy-MM-dd'
                  )}`}
                >
                  <AlternativeButton className="btn-alt">See Details</AlternativeButton>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* <h3>
        You have no <em>upcoming sessions</em>
      </h3>
      <Button>Explore Sessions</Button> */}
    </UpcomingSessionsContainer>
  );
};

UpcomingSessions.propTypes = {
  sessions: PropTypes.arrayOf(PropTypes.object),
};

export default UpcomingSessions;
