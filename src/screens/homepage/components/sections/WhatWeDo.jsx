import React from 'react';
import whatWeDo from 'screens/homepage/images/what-we-do.jpg';
import styled from 'styled-components';

const Section = styled.section`
  background-image: url(${whatWeDo});
  background-position: right;

  @media (min-width: 992px) {
    background-position: 0px -500px;
  }
`;

const WhatWeDo = () => (
  <Section className="section-block text-white bg-cc-black relative h-screen md:bg-fixed bg-no-repeat bg-cover">
    <div className="bg-cc-black bg-opacity-60 w-4/5 md:w-2/6 md:h-screen 2xl:ml-16 p-4 2xl:p-12 absolute right-0 md:right-10 text-right">
      <h1 className="text-8xl md:text-10xl 2xl:text-11xl dharma_gothic_cheavy text-transparent text-stroke-cc-purple mb-6">
        THE
        <br />
        X&apos;S AND O&apos;S
      </h1>
      <h2 className="text-base md:text-lg 2xl:text-2xl shapiro95_super_wide uppercase mb-6">
        A sport fueled sweat for all skill levels
      </h2>
      <p className="text-sm md:text-base 2xl:text-lg">
        Our 15 player, hour-long basketball-based sessions are electric and challenging. Built for
        the modern athlete, we emphasize a seamless and sweat inducing fitness experience.
        <br />
        <br />
        Our continuous games to 11 have a 5 minute time limit to keep the session fast-paced, while
        the presence of our Experience Team ensures the vibes are always on point.
        <br />
        <br />
        We make the teams for you so sign up by yourself or get your friends involved.
      </p>
    </div>
  </Section>
);

export default WhatWeDo;
