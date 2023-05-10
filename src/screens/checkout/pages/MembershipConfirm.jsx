import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ROUTES from 'shared/constants/routes';
import { getPurchaseConfirmed } from 'screens/checkout/reducer';
import bottle from 'screens/checkout/images/bottle.png';
import jersey from 'screens/checkout/images/jersey.png';
import towel from 'screens/checkout/images/towel.png';

import GradientDots from 'shared/components/GradientDots';
import Button from 'shared/components/Button';
import PageLayout from 'shared/components/layout/PageLayout';
import SectionLayout from 'shared/components/layout/SectionLayout';
import CheckmarkSvg from 'shared/components/svg/CheckmarkSvg';
import SportCharacter from 'shared/images/sport-character.png';
import EmailSvg from 'shared/components/svg/EmailSvg';
import Steps from 'shared/components/Steps';
import LineDashedSvg from 'shared/components/svg/LineDashedSvg';

const CheckoutConfirm = () => {
  const purchaseConfirmed = useSelector(getPurchaseConfirmed);

  if (!purchaseConfirmed) {
    return <Redirect to={ROUTES.LOCATIONS} />;
  }

  const steps = [
    {
      title: 'New Member Handbook',
      description: 'It includes all you need to know as a Crosscourt member.',
    },
    {
      title: 'Community Invite',
      description:
        'You’ll find a Discord link where you can engage with other members and stay up to date on all things CC.',
    },
  ];

  return (
    <PageLayout headerPadding>
      <div className="md:flex">
        <SectionLayout className="w-full md:w-1/2 bg-white text-black relative py-6 md:py-28">
          <GradientDots />
          <div className="relative">
            <div className="flex font-shapiro95_super_wide items-center text-4xl md:text-5xl mb-4">
              <CheckmarkSvg className="w-8 md:w-10 h-8 md:h-10 mr-2" />
              <h3>Success.</h3>
            </div>
            <h4 className="block font-shapiro95_super_wide text-xl md:text-2xl mb-4">
              Welcome to the CC Team!
            </h4>
            <div className="flex items-center justify-center border-2 border-cc-black p-2 text-sm mb-4">
              <EmailSvg className="mr-2" /> Check your email for:
            </div>
            <Steps steps={steps} />
            <div className="text-center bg-cream p-4 mb-4">
              <span className="block text-lg font-shapiro95_super_wide mb-1">
                Unlock free Crosscourt Water Bottle
              </span>
              <span className="block">
                Use all the credits in your account this month and receive a free custom CC water
                bottle
              </span>
            </div>
            <span className="block font-shapiro95_super_wide text-lg md:text-xl mb-4">
              Ready to go?
            </span>
            <Button to={ROUTES.LOCATIONS}>BOOK SESSION</Button>
          </div>
        </SectionLayout>
        <SectionLayout className="w-full md:w-1/2 bg-black text-white py-6 md:py-28">
          <div className="flex">
            <div className="w-4/5 pr-4">
              <span className="uppercase block font-shapiro95_super_wide text-3xl mt-3">
                Unlock
              </span>
              <span className="uppercase block font-shapiro95_super_wide text-3xl mb-4">
                CC Swag
              </span>
              <span className="block mb-4 text-sm">
                Use all your credits during your first 3 months as a new member to unlock CC swag.
              </span>
              <span className="block text-sm">
                *Must use all credits during first 3 months to receive jersey
              </span>
            </div>
            <div className="w-1/5">
              <img className="w-28" src={SportCharacter} alt="mascot" />
            </div>
          </div>
          <LineDashedSvg className="my-4" />
          <div className="flex items-center">
            <img src={bottle} alt="bottle" className="w-1/4 pr-4" />
            <div className="w-3/4">
              <span className="block opacity-60">Month 1</span>
              <span className="block font-shapiro95_super_wide text-xl">CC Water Bottle</span>
            </div>
          </div>
          <LineDashedSvg className="w-3/4 ml-auto mb-6" />
          <div className="flex items-center">
            <img src={towel} alt="bottle" className="w-1/4 pr-4" />
            <div className="w-3/4">
              <span className="block opacity-60">Month 2</span>
              <span className="block font-shapiro95_super_wide text-xl">CC Towel</span>
            </div>
          </div>
          <LineDashedSvg className="w-3/4 ml-auto mb-6" />
          <div className="flex items-center">
            <img src={jersey} alt="bottle" className="w-1/4 pr-4" />
            <div className="w-3/4">
              <span className="block opacity-60">Month 3</span>
              <span className="block font-shapiro95_super_wide text-xl">CC Jersey</span>
            </div>
          </div>
        </SectionLayout>
      </div>
    </PageLayout>
  );
};

export default CheckoutConfirm;
