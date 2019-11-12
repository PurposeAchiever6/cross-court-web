import React from 'react';
import styled from 'styled-components';
import colors from 'shared/styles/constants';

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${colors.white};
  justify-content: center;
  align-items: center;
`;

const LandingPage = () => {
  return (
    <PageContainer>
      <h1>LandingPage</h1>
    </PageContainer>
  );
};

export default LandingPage;
