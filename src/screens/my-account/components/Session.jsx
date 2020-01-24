import React from 'react';
import PropTypes from 'prop-types';
import { format, addHours } from 'date-fns';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AlternativeButton from 'shared/components/AlternativeButton';
import Button from 'shared/components/Button';
import device from 'shared/styles/mediaQueries';
import colors from 'shared/styles/constants';

const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  box-shadow: 0px 2px 5px ${colors.blackOverlay};

  @media ${device.desktop} {
    max-width: 30%;
    margin: auto;
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
    height: 12rem;
  }
`;

const Session = ({
  past,
  isSem,
  sessionInfo: {
    date,
    inStartTime,
    session: {
      id,
      time,
      location: { name, imageUrl },
    },
  },
}) => {
  const formatDateTitle = date => format(new Date(date), 'EEE. M/d');
  const formatedTime = time =>
    `${format(new Date(time), 'p')} - ${format(addHours(new Date(time), 1), 'p')}`;
  const formatedDate = format(new Date(date), 'yyyy-MM-dd');
  let dateClassName = 'date';
  if (past) {
    dateClassName += ' past';
  } else if (isSem && inStartTime) {
    dateClassName += ' first';
  }
  return (
    <SessionContainer>
      <div className="image">
        <img src={imageUrl} alt="Session" />
      </div>
      <div className="details">
        <p className={dateClassName}>{formatDateTitle(date)}</p>
        <p className="time">{formatedTime(time)}</p>
        <p className="location">{name}</p>
        {isSem && inStartTime ? (
          <Link to={`/sem/session/${id}/${formatedDate}`}>
            <Button className="btn">Start Session</Button>
          </Link>
        ) : (
          <Link to={`/session/${id}/${formatedDate}`}>
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
