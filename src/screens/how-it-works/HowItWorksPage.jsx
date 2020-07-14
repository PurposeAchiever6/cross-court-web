import React from 'react';
import styled from 'styled-components';

import device from 'shared/styles/mediaQueries';
import colors from 'shared/styles/constants';
import FreeSessionBanner from 'shared/components/FreeSessionBanner';

import Sweat from './sections/Sweat';
import SweatDesktop from './sections/SweatDesktop';
import Showup from './sections/Showup';
import ShowupDesktop from './sections/ShowupDesktop';
import Signup from './sections/Signup';
import SignupDesktop from './sections/SignupDesktop';
import NewToCrosscourt from './sections/NewToCrosscourt';
import TheSession from './sections/TheSession';

const Mobile = styled.div`
  @media ${device.desktop} {
    display: none;
  }
`;

const Desktop = styled.div`
  display: none;

  .desktop-container {
    height: 56.625rem;
    flex: 0 0 50%;

    &--small {
      height: 38.625rem;
    }
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .title {
    letter-spacing: 0.64px;
    font-weight: bold;
    font-size: 3.56rem;
    text-transform: uppercase;
    color: ${colors.polarPlum};
    margin-top: 0;

    &--black {
      color: ${colors.black};
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-around;
    width: 90%;
    margin-left: auto;
  }

  @media ${device.desktop} {
    display: flex;
    flex-wrap: wrap;
  }
`;

function HowItWorksPage() {
  return (
    <>
      <FreeSessionBanner />
      <Mobile>
        <Signup />
        <Showup />
        <Sweat />
      </Mobile>
      <Desktop>
        <NewToCrosscourt />
        <SignupDesktop />
        <ShowupDesktop />
        <SweatDesktop />
      </Desktop>
      <TheSession />
    </>
  );
}

export default HowItWorksPage;
