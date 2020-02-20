import React from 'react';
import styled from 'styled-components';

import device from 'shared/styles/mediaQueries';
import CalendarIcon from '../images/CalendarIcon.png';
import CourtIcon from '../images/CourtIcon.png';

const SeriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10rem 0;

  h2 {
    font-weight: 900;
    font-size: 46px;
    line-height: 47px;
    text-align: center;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 6.5rem;
    margin-top: 0;
  }
  .content {
    display: flex;

    .item {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      .text-container {
        display: flex;
        flex-direction: column;
        width: 50%;
        margin-left: 2.25rem;
        .title {
          font-weight: bold;
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }
        .text {
          font-size: 1.1rem;
        }
      }
    }
  }
  @media ${device.mobile} {
    padding: 2rem 0;

    h2 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    .content {
      flex-direction: column;

      .item {
        margin-bottom: 4rem;

        img {
          width: 4rem;
        }

        .text-container {
          width: 60%;
        }
      }
    }
  }
`;

const Series = () => {
  return (
    <SeriesContainer>
      <h2>All Session Are</h2>
      <div className="content">
        <div className="item">
          <img src={CalendarIcon} alt="Calendar icon" />
          <div className="text-container">
            <span className="title">Non Expiring</span>
            <span className="text">Purchase and use your series at your convenience</span>
          </div>
        </div>
        <div className="item">
          <img src={CourtIcon} alt="Court icon" />
          <div className="text-container">
            <div className="title">On Any Location</div>
            <div className="text">Your sessions are valid for any of the CrossCourt locations.</div>
          </div>
        </div>
      </div>
    </SeriesContainer>
  );
};

export default Series;
