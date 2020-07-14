import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isNil } from 'ramda';

import CheckIcon from 'shared/images/check-icon.png';
import ArButton from 'shared/components/ArButton';
import ROUTES from 'shared/constants/routes';
import device from 'shared/styles/mediaQueries';
import StorageUtils from 'shared/utils/storage';

import { getPurchaseConfirmed } from '../reducer';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  img {
    margin: 3rem 0;
  }

  h1 {
    width: 28%;
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 900;
    margin-bottom: 3.75rem;
  }

  button {
    padding: 1rem 5rem;
  }

  @media ${device.mobile} {
    h1 {
      width: 80%;
    }
  }
`;

const CheckoutConfirm = () => {
  const purchaseConfirmed = useSelector(getPurchaseConfirmed);
  const sessionSaved = StorageUtils.getSavedSession();
  const sessionURL = `/session/${sessionSaved.id}/${sessionSaved.date}`;

  if (!purchaseConfirmed) {
    return <Redirect to={ROUTES.SERIES} />;
  }

  return (
    <PageContainer className="checkout-confirm">
      <img src={CheckIcon} alt="Check icon" />
      <h1>Thank you for purchasing a Series! Now click below to sign up for a session.</h1>
      {!isNil(sessionSaved.id) && !isNil(sessionSaved.date) ? (
        <ArButton className="go-to-session-button" link={sessionURL} inverted={false}>
          GO TO SESSION
        </ArButton>
      ) : (
        <ArButton className="see-schedule-button" link={ROUTES.LOCATIONS} inverted={false}>
          SEE SCHEDULE
        </ArButton>
      )}
    </PageContainer>
  );
};

export default CheckoutConfirm;
