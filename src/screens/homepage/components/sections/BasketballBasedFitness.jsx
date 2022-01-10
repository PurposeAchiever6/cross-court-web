import React from 'react';

import ROUTES from 'shared/constants/routes';
import playButtonWhiteIcon from 'shared/images/play-button-white.png';
import playButtonPurpleIcon from 'shared/images/play-button-purple.png';
import pickUpBasketBallBgImg from 'screens/homepage/images/pick-up-basketball-los-angeles.jpeg';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const CrosscourtIsAHighIntensity = () => (
  <section
    className="text-white min-h-screen bg-no-repeat bg-cover bg-center md:bg-fixed"
    style={{ backgroundImage: `url('${pickUpBasketBallBgImg}')` }}
  >
    <div className="bg-cc-black bg-opacity-70 w-4/5 max-w-sm md:max-w-md md:min-h-screen md:mx-20 mt-20 mb-40 sm:my-20 md:my-0">
      <div className="px-4 sm:px-6 py-10 sm:py-16">
        <h2 className="font-dharma_gothic_cheavy_italic text-transparent text-stroke-cc-purple text-stroke-width-1 md:text-stroke-width-2 uppercase text-8xl md:text-9xl xl:text-10xl md:whitespace-nowrap md:-ml-14 mb-6 md:mb-8 xl:mb-6">
          Basketball Based Fitness
        </h2>
        <div>
          <h3 className="font-shapiro95_super_wide text-base md:text-lg uppercase mb-6 md:mb-8">
            Crosscourt's the first, high intesity, basketball based fitness experience for the
            modern athlete.
          </h3>
          <p className="text-sm md:text-base mb-8 md:mb-10">
            Our guided 60 minute, 15 player sessions use a hollistic approach to fitness that
            challenge us physically, engage us socially, and recharge us mentally.
          </p>
          <PrimaryButton bg="transparent" to={ROUTES.HOWITWORKS} color="white" className="group">
            <img
              alt="play-video-icon"
              className="w-5 h-5 mr-4 inline-block group-hover:hidden"
              src={playButtonWhiteIcon}
            />
            <img
              alt="play-video-icon-on-hover"
              className="w-5 h-5 mr-4 hidden group-hover:inline-block"
              src={playButtonPurpleIcon}
            />
            <span>How it works</span>
          </PrimaryButton>
        </div>
      </div>
    </div>
  </section>
);

export default CrosscourtIsAHighIntensity;
