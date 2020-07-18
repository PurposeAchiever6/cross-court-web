import React from 'react';
import styled from 'styled-components';

import device from 'shared/styles/mediaQueries';
import colors from 'shared/styles/constants';
import FreeSessionBanner from 'shared/components/FreeSessionBanner';

import SweatDesktop from './sections/SweatDesktop';
import ShowupDesktop from './sections/ShowupDesktop';
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
