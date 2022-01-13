import React from 'react';

import LazyBackgroundImage from 'shared/components/LazyBackgroundImage';
import whoWeAreBgImg from 'screens/homepage/images/los-angeles-pickup-basketball.jpeg';

const WhoWeAre = () => (
  <LazyBackgroundImage
    as="section"
    img={whoWeAreBgImg}
    className="text-white min-h-screen bg-no-repeat bg-cover md:bg-fixed"
  >
    <div className="bg-cc-black bg-opacity-70 w-4/5 max-w-sm md:max-w-md md:min-h-screen md:mx-20 mt-20 mb-40 sm:my-20 md:my-0">
      <div className="px-4 sm:px-6 py-10 sm:py-16">
        <h2 className="font-dharma_gothic_cheavy text-8xl md:text-9xl xl:text-10xl uppercase mb-6 md:mb-4 xl:mb-2">
          <span className="text-transparent text-stroke-cc-purple text-stroke-width-1 md:text-stroke-width-2">
            The
          </span>
          <br />
          <span className="bg-cc-purple px-1 pt-2 text-cc-black leading-smaller inline-block transform -translate-y-2 md:-translate-y-4 xl:-translate-y-6">
            CCTeam
          </span>
        </h2>
        <h3 className="font-shapiro95_super_wide text-base md:text-lg uppercase mb-8">
          Everyone's an athlete
        </h3>
        <div className="text-sm md:text-base">
          <p className="mb-6">
            The ccteam is made up of doers that favor a team based workout, enjoy a mid-week get
            together, or shamelessly refuse to give up on their dreams of going pro.
          </p>
          <p>
            Crosscourt's the preferred destination for up and coming creatives, overworked
            professionals, former varsity standouts, and everyone else in between, to shed sweat and
            stress as equals.
          </p>
        </div>
      </div>
    </div>
  </LazyBackgroundImage>
);

export default WhoWeAre;
