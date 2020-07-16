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

const Desktop = styled.div``;

function HowItWorksPage() {
  return (
    <>
      <FreeSessionBanner />
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
