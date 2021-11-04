import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { getUserEmail } from 'screens/auth/reducer';
import { sendConfirmationEmailInit } from 'screens/auth/actionCreators';
import envelopeOpenIcon from 'shared/images/envelope-open.png';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

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
    <PageContainer className="signup-success">
      <img className="envelope-open" src={envelopeOpenIcon} alt="Sent mail icon" />
      <h1>SO CLOSE!</h1>
      <div className="text-center max-w-xl">
        <p className="text-xl leading-7 mb-10">
          We&apos;ve sent an email to {`${userEmail}`}.
          <br />
          <span>
            Please verify your account to complete registration and redeem your free session credit.
          </span>
        </p>
        <p className="bg-black text-white p-3 text-xs mb-12">
          Please note: you do not have any session booked at this point. After verifying your email,
          you will be redirected back to the schedules page to complete your reservation. Feel free
          to message us if you have any question.
        </p>
      </div>
      <div className="send-again-container mb-20">
        <span className="didnt-get-email">Didn&apos;t get the email?</span>
        <PrimaryButton onClick={sendEmailAction} w="100%">
          SEND IT AGAIN
        </PrimaryButton>
      </div>
    </PageContainer>
  );
};

export default SignupSuccessPage;
