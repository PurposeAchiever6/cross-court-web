import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SportCharacter from 'shared/images/sport-character.png';
import ArButton from 'shared/components/ArButton';
import ROUTES from 'shared/constants/routes';

import { getPurchaseConfirmed } from '../reducer';

const PageContainer = styled.div``;

const CheckoutConfirm = () => {
  const purchaseConfirmed = useSelector(getPurchaseConfirmed);
  const redirectUrl = window.localStorage.getItem('redirect');

  if (!purchaseConfirmed) {
    return <Redirect to={ROUTES.LOCATIONS} />;
  }

  return (
    <PageContainer className="checkout-confirm">
      <img className="sport-character-image" src={SportCharacter} alt="Sport Icon" />
      <p>Thank you for purchasing a Series! Now click below to sign up for a session.</p>
      {redirectUrl ? (
        <ArButton
          className="ar-button go-to-session-button"
          link={redirectUrl}
          onClick={() => {
            window.localStorage.removeItem('redirect');
          }}
        >
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
