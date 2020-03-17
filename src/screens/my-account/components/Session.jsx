import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { equals } from 'ramda';

import AlternativeButton from 'shared/components/AlternativeButton';
import Button from 'shared/components/Button';
import device from 'shared/styles/mediaQueries';
import colors from 'shared/styles/constants';
import { urlFormattedDate, shortSessionDate, hourRange } from 'shared/utils/date';
import CheckCircle from 'shared/components/svg/CheckCircleSvg';
import { confirmSessionInit } from 'screens/sessions/actionCreators';

const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  box-shadow: 0px 2px 5px ${colors.blackOverlay};

  @media ${device.desktop} {
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
    background-color: #aaaff3;
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
    padding-bottom: 1rem;

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

  @media ${device.mobile} {
    flex-direction: row;
    height: 13.5rem;

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
    id,
    inStartTime,
    state,
    date,
    inConfirmationTime,
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
  const dispatch = useDispatch();

  const confirmSessionAction = () => dispatch(confirmSessionInit(id));

  const isReserved = equals(state, 'reserved');
  const isConfirmed = equals(state, 'confirmed');

  return (
    <SessionContainer>
      <div className="image">
        <img src={imageUrl} alt="Session" />
      </div>
      <div className="details">
        <span className={dateClassName}>
          {shortSessionDate(date)}
          {isConfirmed && !past && (
            <span className="reserved-check">
              <CheckCircle />
            </span>
          )}
        </span>
        <p className="time">{hourRange(time)}</p>
        <p className="location">{locationName}</p>
        {isSem && inStartTime ? (
          <Link to={`/sem/session/${sessionId}/${urlFormattedDate(date)}`}>
            <Button className="btn">Start Session</Button>
          </Link>
        ) : (
          <div className="buttons-container">
            {isReserved && inConfirmationTime ? (
              <Button className="confirm-btn" onClick={confirmSessionAction}>
                Confirm
              </Button>
            ) : (
              <Link to={`/session/${sessionId}/${urlFormattedDate(date)}`}>
                <AlternativeButton className="btn-alt">See Details</AlternativeButton>
              </Link>
            )}
          </div>
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
