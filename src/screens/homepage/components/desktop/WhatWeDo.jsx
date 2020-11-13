import React from 'react';
import whatWeDoMobileImg from 'screens/homepage/images/xs-and-os.png';

const WhatWeDo = () => (
  <section className="what-we-do section-block text-white">
    <section className="title-and-description-block shift-right">
      <p className="title-1 shapiro97_air_extd">WHAT WE DO</p>
      <p className="title-2 dharma_gothic_cheavy">
        THE
        <br />
        X&apos;S AND O&apos;S
      </p>
      <p className="description">
        Our 15 player, hour-long basketball-based sessions are electric and challenging. Built for
        the modern athlete, we emphasize a seamless and sweat inducing fitness experience.
        <br />
        <br />
        Our continuous games to 11 have a 5 minute time limit to keep the session fast-paced, while
        the presence of our Experience Team ensures the vibes are always on point.
      </p>
      <div className="bottomline"></div>
    </section>
    <img alt="What We Do?" className="mobile-image" src={whatWeDoMobileImg}></img>
  </section>
);

export default WhatWeDo;
