import React from 'react';
import styled from 'styled-components';

import colors from 'shared/styles/constants';
import FreeSessionBanner from 'shared/components/FreeSessionBanner';
import PWABanner from 'shared/components/PWABanner';
import MobileLanding from './components/MobileLanding';
import DesktopLanding from './components/DesktopLanding';

const PageContainer = styled.div`
  background-color: ${colors.white};

  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 4.5rem;
    background-color: ${colors.offWhite};
  }
`;

const HomePage = () => (
  <PageContainer>
    <PWABanner />
    <FreeSessionBanner />
    <MobileLanding />
    <DesktopLanding />
  </PageContainer>
);

export default HomePage;
