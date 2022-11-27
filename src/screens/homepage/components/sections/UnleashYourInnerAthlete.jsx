import React from 'react';

import ROUTES from 'shared/constants/routes';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import Carousel from 'shared/components/Carousel';

import unleashYourInnerAthleteImg from 'screens/homepage/images/unleash-your-inner-athlete.jpeg';
import playBasketballImg from 'screens/homepage/images/play-basketball.jpeg';
import basketballSweatImg from 'screens/homepage/images/basketball-sweat.jpeg';
import basketballSkillSessionsImg from 'screens/homepage/images/basketball-skill-sessions.jpeg';
import basketballWarmUpAreaImg from 'screens/homepage/images/basketball-warm-up-area.jpeg';

const UnleashYourInnerAthlete = () => (
  <div className="relative">
    <Carousel
      useKeyboardArrows
      autoPlay
      swipeable
      interval={5000}
      className="w-screen h-screen"
      imagesClassName="w-screen h-screen object-cover object-top"
      arrowsClassName="hidden md:block"
      imageUrls={[
        unleashYourInnerAthleteImg,
        playBasketballImg,
        basketballSweatImg,
        basketballSkillSessionsImg,
        basketballWarmUpAreaImg,
      ]}
    />
    <div className="absolute inset-0 bg-cc-black bg-opacity-50">
      <div className="absolute top-1/2 px-4 md:px-40 transform -translate-y-1/2">
        <h1 className="text-white font-shapiro95_super_wide text-3xl md:text-4xl xl:text-5xl xl:whitespace-nowrap uppercase">
          Unleash Your Inner Athlete
        </h1>
        <h3 className="text-white md:text-xl 2xl:text-2xl max-w-screen-xl mb-10">
          A basketball focused lifestyle club built around an electric, convenient, and curated
          pickup inspired experience
        </h3>
        <div className="inline-block">
          <PrimaryButton
            to={ROUTES.HOWITWORKS}
            bg="transparent"
            color="white"
            className="block md:inline-block md:mr-8 mb-2 md:mb-0"
            contentClasses="w-52"
          >
            FIRST TIME?
          </PrimaryButton>
          <PrimaryButton
            to={ROUTES.LOCATIONS}
            className="block md:inline-block"
            contentClasses="w-52"
          >
            BOOK SESSION
          </PrimaryButton>
        </div>
      </div>
    </div>
  </div>
);

export default UnleashYourInnerAthlete;
