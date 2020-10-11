import React, { useEffect } from 'react';
import styled from 'styled-components';

import colors from 'shared/styles/constants';
import FreeSessionBannerAnimated from 'shared/components/FreeSessionBannerAnimated';
import PWABanner from 'shared/components/PWABanner';
import DesktopLanding from './components/DesktopLanding';

import { useHistory } from 'react-router-dom';

const PageContainer = styled.div``;

const HomePage = () => {
  // Handle post-login redirects:
  const history = useHistory();

  useEffect(() => {
    const redirectUrl = window.sessionStorage.getItem('redirect');

    if (redirectUrl) {
      window.sessionStorage.removeItem('redirect');
      history.push(redirectUrl);
    }
  }, []);

  return (
    <PageContainer>
      <PWABanner />
      <section class="covid-19">Click <a href="/documents/COVID_guidelinesv2.pdf" target="_blank">here</a> to see the changes we&apos;re making in response to COVID-19.</section>
      <FreeSessionBannerAnimated />
      <DesktopLanding />
    </PageContainer>
  );
}

export default HomePage;
