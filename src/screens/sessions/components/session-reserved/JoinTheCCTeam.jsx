import React from 'react';

import ROUTES from 'shared/constants/routes';
import theSessionOfficialBgImg from 'screens/sessions/images/first-session-reserved/join-the-cc-team-bg-image.jpeg';
import SectionLayout from 'shared/components/layout/SectionLayout';
import Button from 'shared/components/Button';
import CheckmarkList from 'shared/components/CheckmarkList';

const JoinTheCCTeam = () => {
  const promoCode = import.meta.env.VITE_FIRST_TIMER_PROMO_CODE;
  const percentageDiscount = import.meta.env.VITE_FIRST_TIMER_PROMO_CODE_PERCENTAGE_DISCOUNT;

  return (
    <SectionLayout
      backgroundImage={theSessionOfficialBgImg}
      className="bg-no-repeat bg-cover bg-center h-full py-10 lg:py-16"
    >
      <div className="bg-black/80 text-white max-w-screen-sm mx-auto px-4 py-8 lg:px-10 lg:py-10">
        <h1 className="text-center text-cc-purple uppercase border-b border-cc-purple pb-4 mb-8">
          <span className="block font-shapiro95_super_wide text-xl">Join The</span>
          <span className="block font-dharma_gothic_cexbold text-8xl tracking-wide -mt-2">
            CCTeam
          </span>
        </h1>
        <div className="font-shapiro95_super_wide text-center uppercase border-b border-cc-purple pb-6 mb-10">
          <span className="block text-5xl mb-2">{percentageDiscount}% off</span>
          <span className="block text-xl">Your first month</span>
        </div>
        <CheckmarkList
          list={[
            {
              title: 'Connect',
              subtitle:
                'Our members rediscover their connection to sports, discover new connections to people, and reveal how sport connects to their purpose.',
            },
            {
              title: 'Create',
              subtitle:
                'Whether it’s creating a new move or a new moment we cultivate the creative spirit through sport.',
            },
            {
              title: 'Compete',
              subtitle:
                'We believe in creating an environment where competition isn’t about playing against each other but playing for each other.',
            },
          ]}
          className="mb-8"
        />
        <div className="text-center mb-8">
          <Button to={ROUTES.MEMBERSHIPS}>Join Now</Button>
        </div>
        <div className="text-center text-sm px-5">
          Use code <span className="font-shapiro95_super_wide">{promoCode}</span> at checkout. This
          offer expires after your first session.
        </div>
      </div>
    </SectionLayout>
  );
};

export default JoinTheCCTeam;
