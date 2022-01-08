import React from 'react';

import ROUTES from 'shared/constants/routes';
import SweatBgImg from 'screens/how-it-works/images/basketball-court.jpeg';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const Sweat = () => (
  <section className="flex flex-col-reverse md:flex-row flex-wrap">
    <div
      className="w-full md:w-1/2 bg-no-repeat bg-cover bg-center"
      style={{
        minHeight: '550px',
        backgroundImage: `url('${SweatBgImg}')`,
      }}
    />
    <div className="w-full md:w-1/2 px-4 md:px-10 py-10 md:py-20 bg-cc-black text-white">
      <h2 className="font-dharma_gothic_cheavy_italic text-9xl text-cc-black bg-cc-purple pl-4 pr-3 pt-1 inline-block mb-12">
        SWEAT.
      </h2>
      <div className="font-shapiro95_super_wide mb-10">
        SPORTS SHOULDN'T BE
        <br />
        MORE WORK THAN WORKOUT
      </div>
      <div className="mb-16 max-w-xl">
        <p className="pr-10 mb-6">
          Whether you're looking to sweat for 60 minutes or get a little competitive, we've got you
          covered. The average player burns around 1000 calories in a session.
        </p>
        <p>
          Our high intensity sessions are fast paced and non stop. Games are to 5 minutes or first
          to 11 by 2's and 3's, whichever comes first. Winner stays, but only for a max of 3 games
          in a row. See our FAQ page for more info on the CC rules and format.
        </p>
      </div>
      <PrimaryButton to={ROUTES.LOCATIONS} inverted bg="transparent">
        Let's Go
      </PrimaryButton>
    </div>
  </section>
);

export default Sweat;
