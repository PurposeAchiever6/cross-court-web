import React from 'react';
import styled from 'styled-components';
import colors from 'shared/styles/constants';
import Hero from './components/Hero';
import Signup from './components/Signup';
import MobileLanding from './components/MobileLanding';
import DesktopLanding from './components/DesktopLanding';
import Memberships from './components/Memberships';
import TheSession from './components/TheSession';

const PageContainer = styled.div`
  background-color: ${colors.white};
`;

const HomePage = () => (
  <PageContainer>
    <Hero>
      <Signup />
    </Hero>
    <MobileLanding />
    <DesktopLanding />
    <TheSession />
    <Memberships />
  </PageContainer>
);

export default HomePage;
