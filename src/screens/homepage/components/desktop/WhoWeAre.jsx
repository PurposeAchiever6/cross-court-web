import React from 'react';
import whoWeAreMobileImg from 'screens/homepage/images/who-we-are.png';

const WhoWeAre = () => (
  <section className="who-we-are section-block text-black">
    <section className="title-and-description-block shift-left">
      <p className="title-1 shapiro97_air_extd">WHO WE ARE</p>
      <p className="title-2 dharma_gothic_cheavy">THE<br />CC TEAM</p>
      <p className="description">
        The #ccteam is made up of doers that favor a team based workout enjoy a mid-week get
        together, or shamelessly refuse to give up on their dreams of going pro.
        <br />
        <br />
        Crosscourt&apos;s the preferred destination for up and coming creatives, overworked
        professionals, former varsity standouts, and everyone else in between, to shed sweat and
        stress as equals.
      </p>
      <p className="bottomline shapiro96_inclined_wide">NOTHIN BUT VIBE</p>
    </section>
    <img className="mobile-image" src={whoWeAreMobileImg}></img>
  </section>
);

export default WhoWeAre;
