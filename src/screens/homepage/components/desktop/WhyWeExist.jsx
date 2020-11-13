import React from 'react';
import whyWeExistMobileImg from 'screens/homepage/images/the-fundamentals.png';

const WhyWeExist = () => (
  <section className="why-we-exist section-block text-white">
    <section className="title-and-description-block shift-right">
      <p className="title-1 shapiro97_air_extd">WHY WE EXIST</p>
      <p className="title-2 dharma_gothic_cheavy">
        THE
        <br />
        FUNDAMENTALS
      </p>
      <p className="description">
        We exist to unite and ignite the world through the power of team-sport. To serve as an
        outlet for modern athlete to shed sweat and stress. To redefine group fitness by developing
        a community that knows success is only possible when achieved together. We win when we
        elevate those around us and know that a shot at greatness is always on the line.
      </p>
      <p className="bottomline shapiro97_air_extd">
        EVERYONE&apos;S
        <br />
        AN ATHLETE
      </p>
    </section>
    <img alt="Why We Exist?" className="mobile-image" src={whyWeExistMobileImg}></img>
  </section>
);

export default WhyWeExist;
