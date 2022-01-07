import React from 'react';
import whoWeAreImg from 'screens/homepage/images/los-angeles-pickup-basketball.jpg';
import styled from 'styled-components';

const Section = styled.section`
  background-image: url(${whoWeAreImg});
`;

const WhoWeAre = () => (
  <Section className="text-white min-h-screen bg-no-repeat bg-cover bg-center md:bg-fixed relative">
    <div className="bg-cc-black bg-opacity-60 w-4/5 md:w-2/6 md:h-screen md:ml-16 p-4 md:p-12 top-28 md:top-0 absolute">
      <h1 className="text-8xl md:text-10xl 2xl:text-11xl dharma_gothic_cheavy z-10 mb-6">
        <span className="text-transparent text-stroke-cc-purple">THE</span>
        <br />
        <span className="bg-cc-purple px-2 text-black">CCTEAM</span>
      </h1>
      <h2 className="text-base md:text-lg 2xl:text-2xl shapiro95_super_wide uppercase mb-6">
        Everyone&apos;s an athlete
      </h2>
      <p className="text-sm md:text-base 2xl:text-lg mb-4">
        The ccteam is made up of doers that favor a team based workout, enjoy a mid-week get
        together, or shamelessly refuse to give up on their dreams of going pro.
        <br />
        <br />
        Crosscourt&apos;s the preferred destination for up and coming creatives, overworked
        professionals, former varsity standouts, and everyone else in between, to shed sweat and
        stress as equals.
      </p>
    </div>
  </Section>
);

export default WhoWeAre;
