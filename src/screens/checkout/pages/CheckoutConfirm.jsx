import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isNil } from 'ramda';

import SportCharacter from 'shared/images/sport-character.png';
import ArButton from 'shared/components/ArButton';
import ROUTES from 'shared/constants/routes';
import StorageUtils from 'shared/utils/storage';

import { getPurchaseConfirmed } from '../reducer';

const PageContainer = styled.div``;

const CheckoutConfirm = () => {
  const purchaseConfirmed = useSelector(getPurchaseConfirmed);
  const sessionSaved = StorageUtils.getSavedSession();
  const sessionURL = `/session/${sessionSaved.id}/${sessionSaved.date}`;

  if (!purchaseConfirmed) {
    return <Redirect to={ROUTES.LOCATIONS} />;
  }

  return (
    <PageContainer className="checkout-confirm">
      <img className="sport-character-image" src={SportCharacter} alt="Sport Icon" />
      <p>Thank you for purchasing a Series! Now click below to sign up for a session.</p>
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
