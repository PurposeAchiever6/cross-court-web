import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AlternativeButton from 'shared/components/AlternativeButton';
import Button from 'shared/components/Button';
import device from 'shared/styles/mediaQueries';
import colors from 'shared/styles/constants';
import { urlFormattedDate, shortSessionDate, hourRange } from 'shared/utils/date';

const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  box-shadow: 0px 2px 5px ${colors.blackOverlay};

  @media ${device.desktop} {
    max-width: 30%;
    margin-right: 3%;

    &:last-child {
      margin-right: 0;
    }
  }

  h3 {
    font-size: 1.75rem;
    font-weight: 500;
    margin: 0 0 2rem 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    display: flex;
    height: 13.5rem;
  }

  .image {
    flex: 1;
  }

  .details {
    flex: 2;
    padding-bottom: 1rem;

    * {
      padding-left: 2rem;
    }

    .date {
      margin: 0;
      background-color: ${colors.black};
      color: white;
      font-weight: 500;
      font-size: 1.7rem;
      line-height: 2;

      @media ${device.mobile} {
        font-size: 1.5rem;
      }
    }

    .first {
      background-color: ${colors.polarPlum};
    }

    .past {
      background-color: ${colors.offWhite};
      color: ${colors.grey};
    }

    .time {
      font-weight: 500;
      font-size: 1.4rem;
      margin-top: 1rem;

      @media ${device.mobile} {
        font-size: 1.2rem;
      }
    }

    .location {
      font-size: 1.4rem;
      letter-spacing: 0.1em;
      margin-top: 0.5rem;

      @media ${device.mobile} {
        font-size: 1.2rem;
      }
    }

    p {
      margin: 0;
    }

    .btn {
      margin-top: 1rem;
      outline: none;
      border: 1px solid ${colors.white};
      font-size: 0.85rem;
      font-weight: 500;
      padding: 0.7rem 2rem;
      cursor: pointer;
    }

    .btn-alt {
      margin-top: 1rem;
      border: 1px solid ${colors.black};
      color: ${colors.black};
    }
  }

  @media ${device.mobile} {
    flex-direction: row;
    height: 13.5rem;
  }
`;

const Session = ({ past, isSem, sessionInfo }) => {
  let dateClassName = 'date';
  if (past) {
    dateClassName += ' past';
  } else if (isSem && sessionInfo.inStartTime) {
    dateClassName += ' first';
  }

  return (
    <SessionContainer>
      <div className="image">
        <img src={sessionInfo.session.location.imageUrl} alt="Session" />
      </div>
      <div className="details">
        <p className={dateClassName}>{shortSessionDate(sessionInfo.date)}</p>
        <p className="time">{hourRange(sessionInfo.session.time)}</p>
        <p className="location">{sessionInfo.session.location.name}</p>
        {isSem && sessionInfo.inStartTime ? (
          <Link to={`/sem/session/${sessionInfo.session.id}/${urlFormattedDate(sessionInfo.date)}`}>
            <Button className="btn">Start Session</Button>
          </Link>
        ) : (
          <Link to={`/session/${sessionInfo.session.id}/${urlFormattedDate(sessionInfo.date)}`}>
            <AlternativeButton className="btn-alt">See Details</AlternativeButton>
          </Link>
        )}
      </div>
    </SessionContainer>
  );
};

Session.propTypes = {
  past: PropTypes.bool,
  isSem: PropTypes.bool,
  sessionInfo: PropTypes.object.isRequired,
};

export default Session;
