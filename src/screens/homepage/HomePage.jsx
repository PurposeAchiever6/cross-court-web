import React from 'react';
import styled from 'styled-components';

import colors from 'shared/styles/constants';
import TheSession from 'shared/components/TheSession';
import Button from 'shared/components/Button';
import Hero from './components/Hero';
import Signup from './components/Signup';
import MobileLanding from './components/MobileLanding';
import DesktopLanding from './components/DesktopLanding';
import Memberships from './components/Memberships';

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
    <Hero>
      <Signup />
    </Hero>
    <MobileLanding />
    <DesktopLanding />
    <TheSession />
    <div className="button-container">
      <Button>Learn More</Button>
    </div>
    <Memberships />
  </PageContainer>
);

export default HomePage;
