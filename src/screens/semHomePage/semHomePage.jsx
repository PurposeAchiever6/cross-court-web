import React from 'react';
import styled from 'styled-components';

import colors from 'shared/styles/constants';
import DesktopLanding from './components/DesktopLanding';
import YourBenefits from './components/desktop/YourBenefits';
import AnyQuestions from './components/desktop/AnyQuestions';
import Join from './components/desktop/Join';

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

const SemHomePage = () => (
  <PageContainer>
    <Join />
    <DesktopLanding />
    <YourBenefits />
    <AnyQuestions />
  </PageContainer>
);

export default SemHomePage;
