import React from 'react';

import LazyBackgroundImage from 'shared/components/LazyBackgroundImage';
import theFundamentalsBgImg from 'screens/homepage/images/the-fundamentals.jpeg';

const WhyWeExist = () => (
  <LazyBackgroundImage
    as="section"
    img={theFundamentalsBgImg}
    className="text-white min-h-screen bg-no-repeat bg-cover bg-center md:bg-fixed"
  >
    <div className="text-right md:pr-20 pt-20 pb-40 sm:py-20 md:py-0">
      <div className="bg-cc-black bg-opacity-70 w-4/5 max-w-sm md:max-w-md md:min-h-screen ml-auto">
        <div className="px-4 sm:px-6 py-10 sm:py-16">
          <h2 className="font-dharma_gothic_cheavy text-transparent text-stroke-cc-purple text-stroke-width-1 md:text-stroke-width-2 text-8xl md:text-9xl xl:text-10xl uppercase mb-8">
            The
            <br />
            Fundamentals
          </h2>
          <h3 className="font-shapiro95_super_wide text-base md:text-lg uppercase mb-8">
            Redefining group fitness through basketball
          </h3>
          <div className="text-sm md:text-base">
            <p className="mb-6">
              We exist to unite and ignite the world through the power of team-sport. To serve as an
              outlet for modern athlete to shed sweat and stress.
            </p>
            <p>
              To redefine group fitness by developing a community that knows success is only
              possible when achieved together. We win when we elevate those around us and know that
              a shot at greatness is always on the line.
            </p>
          </div>
        </div>
      </div>
    </div>
  </LazyBackgroundImage>
);

export default WhyWeExist;
