import React from 'react';

import ROUTES from 'shared/constants/routes';
import SignupBgImg from 'screens/how-it-works/images/pick-up-basketball-near-me.jpeg';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const Signup = () => (
  <section className="flex flex-col-reverse md:flex-row flex-wrap">
    <div
      className="w-full md:w-1/2 bg-no-repeat bg-cover bg-center md:bg-left-top"
      style={{
        minHeight: '550px',
        backgroundImage: `url('${SignupBgImg}')`,
      }}
    />
    <div className="w-full md:w-1/2 px-4 md:px-10 py-10 md:py-20 bg-cc-black text-white">
      <h2 className="font-dharma_gothic_cheavy text-9xl text-cc-black bg-cc-purple px-5 pt-2 inline-block mb-12">
        SIGN UP
      </h2>
      <div className="font-shapiro95_super_wide mb-10">WE SET IT UP, YOU LAY IT UP</div>
      <p className="mb-16 max-w-xl">
        Find a session that works for you on our schedules page, create a profile, and reserve one
        of the 15 available spots. Bring athletic gear and some fresh sneaks. Arrive at least 10
        minute early so our Session Experience Manager can check you in and get you settled.
      </p>
      <PrimaryButton to={ROUTES.LOCATIONS} inverted bg="transparent">
        Find a Session
      </PrimaryButton>
    </div>
  </section>
);

export default Signup;
