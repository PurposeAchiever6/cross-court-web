import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import Button from 'shared/components/Button';
import device from 'shared/styles/mediaQueries';
import CourtIcon from '../images/CourtIcon.png';
import MerchIcon from '../images/MerchIcon.png';
import PlayerIcon from '../images/PlayerIcon.png';
import RefereeIcon from '../images/RefereeIcon.png';
import SpeakerIcon from '../images/SpeakerIcon.png';
import TimerIcon from '../images/TimerIcon.png';

const PageContainer = styled.div`
  padding: 10rem 5rem;
  h1 {
    text-align: left;
    font-size: 3rem;
    margin-bottom: 5rem;
    letter-spacing: 0.2rem;
    span {
      font-weight: 700;
    }
  }
  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
  }
  .boxes-container {
    display: flex;
    justify-content: space-between;

    margin-bottom: 4.5rem;
    .box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        margin-bottom: 1rem;
      }
      span {
        font-weight: 700;
        width: 99%;
        text-align: center;
      }
    }
  }

  @media ${device.mobile} {
    padding: 0;

    .boxes-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, 1fr);
      grid-column-gap: 15px;
      grid-row-gap: 40px;
    }
  }
`;
const TheSession = () => {
  return (
    <PageContainer>
      <h1>
        THE <span>SESSION</span>
      </h1>
      <div className="boxes-container">
        <div className="box">
          <img src={TimerIcon} alt="Timer" />
          <span>1 Hour Session</span>
        </div>
        <div className="box">
          <img src={CourtIcon} alt="Timer" />
          <span>Premium Facilities</span>
        </div>
        <div className="box">
          <img src={RefereeIcon} alt="Timer" />
          <span>Session Officials</span>
        </div>
        <div className="box">
          <img src={PlayerIcon} alt="Timer" />
          <span>15 Player Limit</span>
        </div>
        <div className="box">
          <img src={MerchIcon} alt="Timer" />
          <span>Custom Merch</span>
        </div>
        <div className="box">
          <img src={SpeakerIcon} alt="Timer" />
          <span>Hype Soundtracks</span>
        </div>
      </div>
      <div className="button-container">
        <Link to={ROUTES.HOWITWORKS}>
          <Button>Learn More</Button>
        </Link>
      </div>
    </PageContainer>
  );
};

export default TheSession;
