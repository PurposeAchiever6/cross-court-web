import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SportCharacter from 'shared/images/sport-character.png';
import ROUTES from 'shared/constants/routes';

import { getPurchaseConfirmed } from '../reducer';

import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const CheckoutConfirm = () => {
  const purchaseConfirmed = useSelector(getPurchaseConfirmed);
  const redirectUrl = window.localStorage.getItem('redirect');

  if (!purchaseConfirmed) {
    return <Redirect to={ROUTES.LOCATIONS} />;
  }

  return (
    <div className="checkout-confirm">
      <img className="sport-character-image" src={SportCharacter} alt="Sport Icon" />
      <p>Thank you for purchasing a Series! Now click below to sign up for a session.</p>
      {redirectUrl ? (
        <PrimaryButton
          className="go-to-session-button"
          to={redirectUrl}
          onClick={() => {
            window.localStorage.removeItem('redirect');
          }}
        >
          GO TO SESSION
        </PrimaryButton>
      ) : (
        <PrimaryButton className="see-schedule-button" to={ROUTES.LOCATIONS}>
          SEE SCHEDULE
        </PrimaryButton>
      )}
    </div>
  );
};

export default CheckoutConfirm;
