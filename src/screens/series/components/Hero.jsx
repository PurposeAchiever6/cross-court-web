import React from 'react';
import styled from 'styled-components';
import device from 'shared/styles/mediaQueries';
import HeroDesktop from '../images/Hero-desktop-bg.jpg';
import HeroMobile from '../images/Hero-mobile-bg.jpg';
import ArrowDownSVG from '../images/ArrowDownSVG';

const HeroContainer = styled.div`
  height: 100vh;
  min-height: 600px;
  background-image: url(${HeroDesktop});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-position-y: initial;
  position: relative;

  h1 {
    font-size: 3.5rem;
    color: #fff;
    letter-spacing: 0.04rem;
    text-align: center;
  }

  .text-container {
    position: absolute;
    bottom: 3rem;
    color: #fff;
    font-size: 1.25rem;
    text-align: center;
    line-height: 26px;

    span {
      display: block;
      font-weight: 500;
    }
  }
  @media ${device.mobile} {
    background-image: url(${HeroMobile});
  }
`;

const Hero = () => (
  <HeroContainer>
    <h1>Own the Court </h1>
    <div className="text-container">
      <p>
        Find a plan that
        <span>fits your lifestyle</span>
      </p>
      <ArrowDownSVG />
    </div>
  </HeroContainer>
);

export default Hero;
