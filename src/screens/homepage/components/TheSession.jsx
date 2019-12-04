import React from 'react';
import styled from 'styled-components';
import Button from 'shared/components/Button';
import device from 'shared/styles/mediaQueries';
import CourtIcon from '../images/CourtIcon.png';
import MerchIcon from '../images/MerchIcon.png';
import PlayerIcon from '../images/PlayerIcon.png';
import RefereeIcon from '../images/RefereeIcon.png';
import SpeakerIcon from '../images/SpeakerIcon.png';
import TimerIcon from '../images/TimerIcon.png';

const Section = styled.section`
  padding: 10rem 5rem;
  margin-bottom: 5rem;

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

  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
  }

  .boxes {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4.5rem;
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
    padding: 0;

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

const TheSession = () => (
  <Section>
    <h2 className="title">
      THE <span className="text">SESSION</span>
    </h2>
    <div className="boxes">
      <div className="boxes__item">
        <img src={TimerIcon} className="boxes__image" alt="Timer" />
        <span className="boxes__text">1 Hour Session</span>
      </div>
      <div className="boxes__item">
        <img src={CourtIcon} className="boxes__image" alt="Timer" />
        <span className="boxes__text">Premium Facilities</span>
      </div>
      <div className="boxes__item">
        <img src={RefereeIcon} className="boxes__image" alt="Timer" />
        <span className="boxes__text">Session Officials</span>
      </div>
      <div className="boxes__item">
        <img src={PlayerIcon} className="boxes__image" alt="Timer" />
        <span className="boxes__text">15 Player Limit</span>
      </div>
      <div className="boxes__item">
        <img src={MerchIcon} className="boxes__image" alt="Timer" />
        <span className="boxes__text">Custom Merch</span>
      </div>
      <div className="boxes__item">
        <img src={SpeakerIcon} className="boxes__image" alt="Timer" />
        <span className="boxes__text">Hype Soundtracks</span>
      </div>
    </div>
    <div className="button-container">
      <Button>Learn More</Button>
    </div>
  </Section>
);

export default TheSession;
