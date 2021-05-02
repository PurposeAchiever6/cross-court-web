import React from 'react';
import ArButton from 'shared/components/ArButton';
import ROUTES from 'shared/constants/routes';

const Ready = () => (
  <section className="ready section-block text-white">
    <p className="title dharma_gothic_cheavy_italic">READY TO SWEAT?</p>
    <section className="buttons-block">
      <ArButton link={ROUTES.LOCATIONS} double>
        SEE SCHEDULE
      </ArButton>
      <ArButton link={ROUTES.HOWITWORKS} double inverted>
        LEARN MORE
      </ArButton>
    </section>
  </section>
);

export default Ready;
