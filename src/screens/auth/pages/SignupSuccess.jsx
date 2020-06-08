import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { getUserEmail } from 'screens/auth/reducer';
import { sendConfirmationEmailInit } from 'screens/auth/actionCreators';
import PaperPlaneIcon from 'shared/images/paper-plane-icon.png';

const PageContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    margin: 5rem 0;
  }

  h1 {
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 900;
    margin-bottom: 2rem;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.7rem;
    margin-bottom: 5rem;
    text-align: center;

    strong {
      font-weight: 600;
    }

    span {
      display: block;
    }
  }

  .send-again-container {
    text-align: center;

    strong {
      display: block;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const SignupSuccessPage = () => {
  const dispatch = useDispatch();

  const userEmail = useSelector(getUserEmail);
  const sendEmailAction = () => dispatch(sendConfirmationEmailInit());

  return (
    <PageContainer>
      <img src={PaperPlaneIcon} alt="Sent mail icon" />
      <h1>You&apos;re almost there!</h1>
      <p>
        We&apos;ve sent a confirmation e-mail to <strong>{`${userEmail}`}</strong>.{' '}
        <span>Please verify your account.</span>
      </p>
      <div className="send-again-container">
        <span>
          Didn’t get the e-mail?
          <strong onClick={sendEmailAction}>Send it again</strong>
        </span>
      </div>
    </PageContainer>
  );
};

export default SignupSuccessPage;
