import React from 'react';

import ROUTES from 'shared/constants/routes';
import ShowupBgImg from 'screens/how-it-works/images/pick-up-basketball.jpeg';
import LazyBackgroundImage from 'shared/components/LazyBackgroundImage';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const Showup = () => (
  <section className="flex flex-wrap">
    <div className="w-full md:w-1/2 text-right px-4 md:px-10 py-10 md:py-20">
      <h2 className="font-dharma_gothic_cexbold text-10xl text-transparent text-stroke-cc-purple mb-8">
        SHOW UP
      </h2>
      <div className="font-shapiro95_super_wide mb-8">
        60 MINUTE GUIDED EXPERIENCE
        <br />
        NO BULL$HIT
      </div>
      <div className="mb-16 max-w-xl ml-auto">
        <p className="pl-10 mb-5">Each hour-long session is run by our trained Experience Team.</p>
        <p>
          Our Session Experience Manager will get you a jersey, show you where to put your things,
          and make you feel at home. Our Session Officials run each session. They enforce the rules,
          maintain order on the court, and ensure you leave drippin in sweat.
        </p>
      </div>

      <PrimaryButton to={ROUTES.LOCATIONS} inverted bg="transparent">
        Reserve Now
      </PrimaryButton>
    </div>
    <LazyBackgroundImage
      img={ShowupBgImg}
      className="w-full md:w-1/2 bg-no-repeat bg-cover bg-center"
      style={{ minHeight: '550px' }}
    />
  </section>
);

export default Showup;
