import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { equals } from 'ramda';

import ArButton from 'shared/components/ArButton';
import colors from 'shared/styles/constants';
import { urlFormattedDate, shortSessionDate, hourRange } from 'shared/utils/date';
import CheckCircle from 'shared/components/svg/CheckCircleSvg';

const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;

  @media (min-width: 992px) {
    min-width: 18rem;
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
    height: 10rem;
    object-fit: cover;
    object-position: top;
    display: flex;
    height: 13.5rem;
  }
  .reserved-check {
    height: 2rem;
    width: 2rem;
    background-color: #9999ff;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 0;
    margin-left: 1rem;

    svg {
      font-size: 0.5rem;
      color: #fff;
      padding-left: 0;
    }
  }
  .image {
    flex: 1;
  }

  .details {
    flex: 2;

    .date {
      display: flex;
      align-items: center;
      margin: 0;
      background-color: ${colors.black};
      color: white;
      font-weight: 500;
      font-size: 1.7rem;
      line-height: 2;
      padding: 0 2rem;
    }

    .first {
      background-color: #9999ff;
    }

    .past {
      background-color: ${colors.offWhite};
      color: ${colors.grey};
    }

    .time {
      font-weight: 500;
      font-size: 1.4rem;
      margin-top: 1rem;
      padding: 0 2rem;
    }

    .location {
      font-size: 1.4rem;
      letter-spacing: 0.1em;
      margin-top: 0.5rem;
      padding: 0 2rem;
    }

    p {
      margin: 0;
    }

    .buttons-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      .btn {
        outline: none;
        border: 1px solid ${colors.white};
        font-size: 0.85rem;
        font-weight: 500;
        padding: 0.7rem 2rem;
        cursor: pointer;
      }

      .confirm-btn {
        padding: 0.7rem 2rem;
      }

      .btn-alt {
        border: 1px solid ${colors.black};
        color: ${colors.black};
        padding: 0.7rem 1.5rem;
      }
    }
  }

  @media (max-width: 991px) {
    flex-direction: row;

    img {
      height: 100%;
      object-fit: cover;
      object-position: top;
      display: flex;
    }
    .location {
      font-size: 1.2rem;
    }
    .time {
      font-size: 1.2rem;
    }
    .date {
      font-size: 1.5rem;
    }
  }
`;

const Session = ({
  past,
  isSem,
  sessionInfo: {
    inStartTime,
    state,
    date,
    session: {
      id: sessionId,
      time,
      location: { name: locationName, imageUrl },
    },
  },
}) => {
  let dateClassName = 'date';
  if (past) {
    dateClassName += ' past';
  } else if (isSem && inStartTime) {
    dateClassName += ' first';
  }
  const isConfirmed = equals(state, 'confirmed');

  return (
    <SessionContainer className="session-container">
      <div className="image">
        <img src={imageUrl} alt="Session" />
      </div>
      <div className="details">
        <span className={dateClassName}>
          {shortSessionDate(date).replace('.', '').replace('/', '.')}
          {isConfirmed && !past && (
            <span className="reserved-check">
              <CheckCircle />
            </span>
          )}
        </span>
        <div className="time-location-buttons-container">
          <p className="time">{hourRange(time)}</p>
          <p className="location">{locationName}</p>
          {isSem && inStartTime ? (
            <div className="buttons-container">
              <ArButton link={`/sem/session/${sessionId}/${urlFormattedDate(date)}`}>
                START SESSION
              </ArButton>
            </div>
          ) : (
            <div className="buttons-container">
              <ArButton
                className="see-details-button"
                link={`/session/${sessionId}/${urlFormattedDate(date)}`}
                inverted={past}
              >
                SEE DETAILS
              </ArButton>
            </div>
          )}
        </div>
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
