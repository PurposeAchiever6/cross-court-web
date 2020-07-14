import React from 'react';
import ArButton from 'shared/components/ArButton';
import ROUTES from 'shared/constants/routes';

const MakeSportYourLifestyle = () => (
  <section className="make-sport-your-lifestyle section-block text-white">
    <section className="title-and-buttons-block">
      <p className="title shapiro95_super_wide">
        MAKE SPORT YOUR <em className="shapiro96_inclined_wide">LIFESTYLE</em>
      </p>
      <ArButton className="first-time-button" link={ROUTES.HOWITWORKS} double inverted>
        FIRST TIME?
      </ArButton>
      <ArButton link={ROUTES.LOCATIONS} double>
        BOOK SESSION
      </ArButton>
    </section>
    <p className="crosscourt-big-title dharma_gothic_cheavy_italic">CROSSCOURT</p>
  </section>
);

export default MakeSportYourLifestyle;
