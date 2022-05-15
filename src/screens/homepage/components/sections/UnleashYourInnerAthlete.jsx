import React from 'react';

import ROUTES from 'shared/constants/routes';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import Carousel from 'shared/components/Carousel';

import unleashYourInnerAthleteImg from 'screens/homepage/images/unleash-your-inner-athlete.jpeg';
import pickupBasketballFacilityImg from 'screens/homepage/images/pickup-basketball-facility.jpeg';
import pickupBasketballFacility2Img from 'screens/homepage/images/pickup-basketball-facility-2.jpeg';
import losAngelesBasketballCourtImg from 'screens/homepage/images/los-angeles-basketball-court.jpeg';
import frontDeskImg from 'screens/homepage/images/front-desk.jpeg';
import pickupBasketballImg from 'screens/homepage/images/pickup-basketball.jpeg';

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
        pickupBasketballFacilityImg,
        pickupBasketballFacility2Img,
        losAngelesBasketballCourtImg,
        frontDeskImg,
        pickupBasketballImg,
      ]}
    />
    <div className="absolute inset-0 bg-cc-black bg-opacity-50">
      <div className="absolute top-1/3 px-4 md:px-40">
        <h1 className="text-white font-shapiro95_super_wide text-3xl md:text-5xl 2xl:text-6xl mb-1">
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
