import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import SportCharacter from 'shared/images/sport-character.png';
import ROUTES from 'shared/constants/routes';

import { getPurchaseConfirmed } from '../reducer';

import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const Title = styled.h2`
  .purchase {
    font-size: 35px;
    line-height: 35px;
    padding-left: 3px;

    @media (min-width: 992px) {
      font-size: 45px;
      line-height: 40px;
    }
  }

  .complete {
    font-size: 36px;
    line-height: 30px;

    @media (min-width: 992px) {
      font-size: 46px;
      line-height: 40px;
    }
  }
`;

const CheckoutConfirm = () => {
  const purchaseConfirmed = useSelector(getPurchaseConfirmed);
  const redirectUrl = window.localStorage.getItem('redirect');

  if (!purchaseConfirmed) {
    return <Redirect to={ROUTES.LOCATIONS} />;
  }

  return (
    <div className="sm:min-h-screen flex flex-col items-center justify-center px-4 pt-14 pb-20">
      <img className="w-48 inline-block mb-5 -mt-5" src={SportCharacter} alt="Sport Icon" />
      <Title className="font-shapiro95_super_wide uppercase mb-8 sm:mb-10">
        <span className="purchase block">Purchase</span>
        <span className="complete text-transparent text-stroke-cc-black text-stroke-width-1 block">
          Complete
        </span>
      </Title>
      <p className="max-w-md mx-auto text-center text-cc-purple text-lg mb-8 sm:mb-10">
        <span className="font-shapiro96_inclined_wide uppercase">Please note:</span> No session has
        been booked yet. Now you can use your new credit(s) to book a session.
      </p>
      {redirectUrl ? (
        <PrimaryButton
          to={redirectUrl}
          onClick={() => {
            window.localStorage.removeItem('redirect');
          }}
        >
          GO TO SESSION
        </PrimaryButton>
      ) : (
        <PrimaryButton to={ROUTES.LOCATIONS}>SEE SCHEDULE</PrimaryButton>
      )}
    </div>
  );
};

export default CheckoutConfirm;
