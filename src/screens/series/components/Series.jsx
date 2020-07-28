import React from 'react';
import styled from 'styled-components';

import device, { size } from 'shared/styles/mediaQueries';
import premiumFacilityIcon from 'shared/images/premium-facility.png';
import onYourTimeIcon from 'shared/images/on-your-time.png';
import useWindowSize from 'shared/hooks/useWindowSize';

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
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }
        .text {
          font-size: 1.1rem;
        }
      }
    }
  }
  @media (max-width: 991px) {
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
  const { width: windowSize } = useWindowSize();
  const iconSize = windowSize < size.desktop ? '4rem' : '7rem';

  return (
    <SeriesContainer className="series-series-container">
      <h2>OUR SERIES</h2>
      <div className="content">
        <div className="item">
          <img className="on-your-time" src={onYourTimeIcon} />
          <div className="text-container">
            <span className="title">DON&apos;T EXPIRE</span>
            <span className="text">Purchase and use your series at your convenience.</span>
          </div>
        </div>
        <div className="item">
          <img className="premium-facility" src={premiumFacilityIcon} />
          <div className="text-container">
            <div className="title">ARE LOCATION TRANSFERABLE</div>
            <div className="text">Use your series at any of our locations.</div>
          </div>
        </div>
      </div>
    </SeriesContainer>
  );
};

export default Series;
