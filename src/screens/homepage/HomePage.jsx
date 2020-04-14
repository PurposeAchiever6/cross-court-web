import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import colors from 'shared/styles/constants';
import TheSession from 'shared/components/TheSession';
import Button from 'shared/components/Button';
import FreeSessionBanner from 'shared/components/FreeSessionBanner';
import PWABanner from 'shared/components/PWABanner';
import Hero from './components/Hero';
import Signup from './components/Signup';
import MobileLanding from './components/MobileLanding';
import DesktopLanding from './components/DesktopLanding';
import Memberships from './components/Memberships';
import VideoPlayer from './components/VideoPlayer';

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
    <Hero>
      <Signup />
    </Hero>
    <MobileLanding />
    <DesktopLanding />
    <TheSession />
    <div className="button-container">
      <Link to={ROUTES.HOWITWORKS}>
        <Button>Learn More</Button>
      </Link>
    </div>
    <VideoPlayer />
    <Memberships />
  </PageContainer>
);

export default HomePage;
