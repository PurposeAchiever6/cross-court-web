import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ROUTES from 'shared/constants/routes';

import colors from 'shared/styles/constants';
import Button from 'shared/components/Button';
import device from 'shared/styles/mediaQueries';
import HeroImage from '../images/hero-mobile.webp';
import HeroDesktop from '../images/hero-desktop.webp';

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: ${colors.white};
  background-image: url(${HeroImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  .hero-title {
    font-weight: 500;
    font-size: 2.25rem;
    letter-spacing: 0.64px;
    text-transform: uppercase;
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
  }

  .hero-company {
    font-weight: bold;
  }

  .hero-text {
    font-weight: 500;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    width: 16.25rem;
    margin: 1rem 0;
  }

  .hero-find {
    margin-top: 3rem;
  }

  @media ${device.desktop} {
    background-image: url(${HeroDesktop});
    align-items: flex-start;
    padding-left: 10.875rem;

    .hero-title {
      font-size: 3.6rem;
    }

    .hero-text {
      display: block;
      width: initial;
      font-size: 1.75rem;
    }
  }
`;

function Hero() {
  return (
    <HeroSection>
      <div>
        <h1 className="hero-title">
          new to <span className="hero-company">crosscourt?</span>
        </h1>
        <p className="hero-text">Just sign up, show up and sweat.</p>
      </div>
      <div className="hero-find">
        <Link to={ROUTES.LOCATIONS}>
          <Button>See Schedule</Button>
        </Link>
      </div>
    </HeroSection>
  );
}

export default Hero;
