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
    <section class="covid-19">Click <a href="/documents/COVID_guidelinesv2.pdf" target="_blank">here</a> to see the changes we&apos;re making in response to COVID-19.</section>
    <FreeSessionBanner />
    <DesktopLanding />
  </PageContainer>
);

export default HomePage;
