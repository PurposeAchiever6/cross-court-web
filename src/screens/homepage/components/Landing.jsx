import React from 'react';
import styled from 'styled-components';
import Button from 'shared/components/Button';
import AlternativeButton from 'shared/components/AlternativeButton';
import { Link } from 'react-router-dom';
import ROUTES from 'shared/constants/routes';
import LandingBg from '../images/landing-bg.jpg';

const LandingContainer = styled.div`
  height: 100vh;
  background-image: url(${LandingBg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .text-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 26vh;
    position: relative;
    width: 32vw;
    margin-bottom: 10rem;
    span {
      font-family: Untitled Sans;
      font-style: normal;
      font-weight: 500;
      font-size: 3.5rem;
      color: #fff;
      text-transform: uppercase;
    }
    .sign {
      position: absolute;
      top: 0;
      left: 0;
    }
    .sweat {
      position: absolute;
      font-style: italic;
      bottom: 0;
      right: 0;
      font-weight: bold;
    }
  }

  .buttons-container {
    button {
      margin: 0 1rem;
    }
    .alternative-btn {
      padding: 1rem 2.5rem;
    }
  }
`;

export const Landing = () => {
  return (
    <LandingContainer>
      <div className="text-container">
        <span className="sign">Sign up</span>
        <span className="show">Show up</span>
        <span className="sweat">Sweat</span>
      </div>
      <div className="buttons-container">
        <Link to={ROUTES.LOCATIONS}>
          <AlternativeButton>Book a Session</AlternativeButton>
        </Link>
        <Link to={ROUTES.HOWITWORKS}>
          <Button>First Time?</Button>
        </Link>
      </div>
    </LandingContainer>
  );
};

export default Landing;
