import React from 'react';
import styled from 'styled-components';

import colors from 'shared/styles/constants';
import FreeSessionBanner from 'shared/components/FreeSessionBanner';
import PWABanner from 'shared/components/PWABanner';
import DesktopLanding from './components/DesktopLanding';

const PageContainer = styled.div``;

const HomePage = () => (
  <PageContainer>
    <PWABanner />
    <FreeSessionBanner />
    <DesktopLanding />
  </PageContainer>
);

export default HomePage;
