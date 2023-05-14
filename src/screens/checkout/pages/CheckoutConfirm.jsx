import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ROUTES from 'shared/constants/routes';
import { getPurchaseConfirmed, getSelectedProduct } from 'screens/checkout/reducer';
import dayPassImg from 'screens/checkout/images/day-pass.png';

import Button from 'shared/components/Button';
import PageLayout from 'shared/components/layout/PageLayout';
import SectionLayout from 'shared/components/layout/SectionLayout';
import CheckmarkSvg from 'shared/components/svg/CheckmarkSvg';
import GradientDots from 'shared/components/GradientDots';

const CheckoutConfirm = () => {
  const purchaseConfirmed = useSelector(getPurchaseConfirmed);
  const selectedProduct = useSelector(getSelectedProduct);

  if (!purchaseConfirmed) {
    return <Redirect to={ROUTES.LOCATIONS} />;
  }

  return (
    <PageLayout headerPadding>
      <div className="md:flex">
        <SectionLayout className="md:w-1/2 bg-white text-black relative py-6 md:py-28">
          <GradientDots />
          <div className="relative">
            <div className="flex font-shapiro95_super_wide items-center text-4xl md:text-5xl mb-4">
              <CheckmarkSvg className="w-8 md:w-10 h-8 md:h-10 mr-2" />
              <h3>Success.</h3>
            </div>
            <h4 className="block font-shapiro95_super_wide text-xl md:text-2xl mb-4">
              Thanks for purchasing a Crosscourt Day Pass.
            </h4>
            <p className="mb-6">
              Your Day Pass includes {selectedProduct.credits} credit that can be used for either a
              Session, SKLZ, or another experience on the schedule and includes Open Club / Office
              Hours access, which does not require a credit to book. Please note, your Day Pass
              expires in 30 days.
            </p>
            <p className="mb-4">
              Check out our schedule to book your experience and if you're available, come check out
              Open Club or Office Hours as well before or after your session. Upon arrival, one of
              our Experience Managers will get you settled in.
            </p>
            <span className="block font-shapiro95_super_wide text-lg md:text-xl mb-4">
              Ready to go?
            </span>
            <Button to={ROUTES.LOCATIONS}>BOOK SESSION</Button>
          </div>
        </SectionLayout>
        <img className="w-full md:w-1/2" src={dayPassImg} alt="day-pass" />
      </div>
    </PageLayout>
  );
};

export default CheckoutConfirm;
