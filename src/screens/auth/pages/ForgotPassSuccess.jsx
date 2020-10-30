import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ROUTES from 'shared/constants/routes';
import { getUserEmail } from 'screens/auth/reducer';
import PaperPlaneIcon from 'shared/images/paper-plane-icon.png';
import device from 'shared/styles/mediaQueries';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    margin-bottom: 4rem;
  }

  h1 {
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 900;
    margin-bottom: 4.5rem;
    margin-top: 5rem;
  }

  p {
    width: 26%;
    font-size: 1rem;
    line-height: 1.5rem;
    margin-bottom: 5rem;
    text-align: center;

    strong {
      font-weight: bold;
    }

    span {
      display: block;
    }
  }

  @media (max-width: 991px) {
    p {
      width: 80%;
    }
  }
`;

const ForgotPassSuccess = () => {
  const userEmail = useSelector(getUserEmail);

  return (
    <PageContainer className="forgot-pass-success">
      <h1>CHECK YOUR EMAIL</h1>
      <img src={PaperPlaneIcon} alt="Sent mail icon" />
      <p>
        We sent an email to <strong>{userEmail}</strong> which contains an link to reset your
        password.
      </p>
      <Link to={ROUTES.LOGIN}>
        <strong>Back to Log In</strong>
      </Link>
    </PageContainer>
  );
};

export default ForgotPassSuccess;
