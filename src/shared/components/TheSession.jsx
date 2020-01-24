import React from 'react';
import styled from 'styled-components';

import device from 'shared/styles/mediaQueries';
import colors from 'shared/styles/constants';
import FieldSvg from 'shared/components/svg/FieldSvg';
import MerchSvg from 'shared/components/svg/MerchSvg';
import StopwatchSvg from 'shared/components/svg/StopwatchSvg';
import WhistleSvg from 'shared/components/svg/WhistleSvg';
import PlayerSvg from 'shared/components/svg/PlayerSvg';
import SpeakerSvg from 'shared/components/svg/SpeakerSvg';

const Section = styled.section`
  padding: 4.5rem 5rem;
  background: ${colors.offWhite};

  .text {
    font-weight: bold;
  }

  .title {
    text-align: left;
    font-size: 3rem;
    margin-bottom: 5rem;
    letter-spacing: 0.2rem;
    font-weight: 500;
  }

  .boxes {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .boxes__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .boxes__text {
    width: 99%;
    text-align: center;
    font-weight: bold;
  }

  .boxes__image {
    margin-bottom: 1rem;
  }

  @media ${device.mobile} {
    padding: 4.5rem 0;

    .title {
      text-align: center;
      font-size: 2rem;
    }

    .boxes {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, 1fr);
      grid-column-gap: 15px;
      grid-row-gap: 40px;
    }
  }
`;

const TheSession = props => (
  <Section {...props}>
    <h2 className="title">
      THE <span className="text">SESSION</span>
    </h2>
    <div className="boxes">
      <div className="boxes__item">
        <div className="boxes__image">
          <StopwatchSvg />
        </div>
        <span className="boxes__text">1 Hour Session</span>
      </div>
      <div className="boxes__item">
        <div className="boxes__image">
          <FieldSvg />
        </div>
        <span className="boxes__text">Premium Facilities</span>
      </div>
      <div className="boxes__item">
        <div className="boxes__image">
          <WhistleSvg />
        </div>
        <span className="boxes__text">Session Officials</span>
      </div>
      <div className="boxes__item">
        <div className="boxes__image">
          <PlayerSvg />
        </div>
        <span className="boxes__text">15 Player Limit</span>
      </div>
      <div className="boxes__item">
        <div className="boxes__image">
          <MerchSvg />
        </div>
        <span className="boxes__text">Custom Merch</span>
      </div>
      <div className="boxes__item">
        <div className="boxes__image">
          <SpeakerSvg />
        </div>
        <span className="boxes__text">Hype Soundtracks</span>
      </div>
    </div>
  </Section>
);

export default TheSession;
