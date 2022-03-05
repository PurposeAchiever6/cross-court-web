import React from 'react';
import ROUTES from 'shared/constants/routes';

import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import Carousel from 'shared/components/Carousel';

import frontDesk from 'screens/homepage/images/front-desk.jpeg';
import losAngelesBasketballCourt from 'screens/homepage/images/los-angeles-basketball-court.jpeg';
import pickupBasketballFacility from 'screens/homepage/images/pickup-basketball-facility.jpeg';
import pickupBasketballFacility2 from 'screens/homepage/images/pickup-basketball-facility-2.jpeg';
import pickupBasketball from 'screens/homepage/images/pickup-basketball.jpeg';
import lockers from 'screens/homepage/images/lockers.jpeg';

const MakeSportYourLifestyle = () => (
  <div className="relative">
    <Carousel
      autoPlay
      interval={5000}
      className="w-screen h-screen"
      imagesClassName="w-screen h-screen object-cover"
      imageUrls={[
        pickupBasketballFacility2,
        pickupBasketballFacility,
        losAngelesBasketballCourt,
        frontDesk,
        pickupBasketball,
        lockers,
      ]}
    />
    <div className="flex flex-col absolute w-full h-full bg-cc-black bg-opacity-60 top-0">
      <div className="absolute top-1/3 px-10 md:px-20">
        <h1 className="text-transparent text-stroke-white text-stroke-width-1 md:text-stroke-width-2 text-2xl md:text-5xl 2xl:text-6xl font-shapiro96_inclined_wide">
          MAKE SPORT <br className="block md:hidden" /> YOUR LIFESTYLE
        </h1>
        <h2 className="text-white font-shapiro95_super_wide text-lg md:text-5xl 2xl:text-6xl">
          BASKETBALL <br className="block md:hidden" /> BASED FITNESS
        </h2>
        <h3 className="text-white text-sm md:text-lg 2xl:text-2xl">
          Pickup inspired experience. 1 hour. 15 players. 2 oficials. Games to 11. Tiered skill
          levels.
        </h3>
        <div className="flex flex-col md:flex-row mt-10">
          <PrimaryButton
            contentClasses="w-52 sm:mr-8 mb-2 sm:mb-0"
            to={ROUTES.HOWITWORKS}
            bg="transparent"
            color="white"
          >
            FIRST TIME?
          </PrimaryButton>
          <PrimaryButton contentClasses="w-52" to={ROUTES.LOCATIONS}>
            BOOK SESSION
          </PrimaryButton>
        </div>
      </div>
    </div>
  </div>
);

export default MakeSportYourLifestyle;
