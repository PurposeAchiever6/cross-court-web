import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import CheckIcon from 'shared/images/check-icon.png';
import Button from 'shared/components/Button';
import device from 'shared/styles/constants';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  img {
    margin-top: 1rem;
  }

  h1 {
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 900;
    margin-bottom: 2rem;
    margin-top: 3.12rem;
  }

  p {
    margin-bottom: 3.62rem;
    font-size: 1.2rem;
    width: 100%;
  }

  button {
    width: 16.5rem;
  }

  @media ${device.mobile} {
    img {
      margin-bottom: 5.25rem;
      margin-top: 7.7rem;
    }
    h1 {
      margin-top: 0;
      margin-bottom: 2rem;
    }

    p {
      width: 100%;
      margin-bottom: 2.5rem;
    }
  }
`;

const PassResetSuccess = () => (
  <PageContainer>
    <img src={CheckIcon} alt="Check icon" />
    <h1>Password Reset</h1>
    <p>Your Crosscourt Password was succesfully reset</p>
    <Link to="/login">
      <Button>Go to Login</Button>
    </Link>
  </PageContainer>
);

export default PassResetSuccess;
