import React from 'react';
import styled from 'styled-components';
import Logo from 'shared/images/logo.png';
import Button from 'shared/components/Button';
import AlternativeButton from 'shared/components/AlternativeButton';

const LandingContainer = styled.div``;

const Landing = () => {
  return (
    <LandingContainer>
      <img src={Logo} alt="logo" />
      <p>Premium high-intensity team sports-based fitness experience</p>
      <Button>First Time Player</Button>
      <AlternativeButton>Schedule Session</AlternativeButton>
    </LandingContainer>
  );
};

export default Landing;
