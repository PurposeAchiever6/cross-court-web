import React from 'react';
import styled from 'styled-components';

import LazyBackgroundImage from 'shared/components/LazyBackgroundImage';
import whatWeDoBgImg from 'screens/homepage/images/what-we-do.jpeg';

const Section = styled.section`
  .bg-img-position {
    background-position: right;

    @media (min-width: 992px) {
      background-position: 0px -500px;
    }
  }
`;

const WhatWeDo = () => (
  <Section>
    <LazyBackgroundImage
      img={whatWeDoBgImg}
      className="text-white min-h-screen bg-no-repeat bg-cover md:bg-fixed bg-img-position"
    >
      <div className="text-right md:pr-20 pt-20 pb-40 sm:py-20 md:py-0">
        <div className="bg-cc-black bg-opacity-70 w-4/5 max-w-sm md:max-w-md md:min-h-screen ml-auto">
          <div className="px-4 sm:px-6 py-10 sm:py-16">
            <h2 className="font-dharma_gothic_cheavy text-transparent text-stroke-cc-purple text-stroke-width-1 md:text-stroke-width-2 text-8xl md:text-9xl xl:text-10xl uppercase mb-8">
              The
              <br />
              X's and O's
            </h2>
            <h3 className="font-shapiro95_super_wide text-base md:text-lg uppercase mb-8">
              A sport fueled sweat for all skill levels
            </h3>
            <div className="text-sm md:text-base">
              <p className="mb-6">
                Our 15 player, hour-long basketball-based sessions are electric and challenging.
                Built for the modern athlete, we emphasize a seamless and sweat inducing fitness
                experience.
              </p>
              <p className="mb-6">
                Our continuous games to 11 have a 5 minute time limit to keep the session
                fast-paced, while the presence of our Experience Team ensures the vibes are always
                on point.
              </p>
              <p>We make the teams for you so sign up by yourself or get your friends involved.</p>
            </div>
          </div>
        </div>
      </div>
    </LazyBackgroundImage>
  </Section>
);

export default WhatWeDo;
