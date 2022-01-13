import React from 'react';

import ROUTES from 'shared/constants/routes';
import LazyBackgroundImage from 'shared/components/LazyBackgroundImage';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import readyBgImg from 'screens/homepage/images/ready.jpeg';

const Ready = () => (
  <LazyBackgroundImage
    as="section"
    img={readyBgImg}
    className="text-white min-h-screen bg-no-repeat bg-cover bg-center md:bg-fixed flex justify-center items-center px-4 py-32"
  >
    <div className="text-center">
      <h2 className="font-dharma_gothic_cexbold text-transparent text-stroke-white text-9xl md:text-12xl mb-14">
        READY TO SWEAT?
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-center">
        <PrimaryButton
          to={ROUTES.HOWITWORKS}
          bg="transparent"
          color="white"
          contentClasses="w-52 md:mr-8 mb-2 md:mb-0"
        >
          LEARN MORE
        </PrimaryButton>
        <PrimaryButton to={ROUTES.LOCATIONS} contentClasses="w-52">
          SEE SCHEDULE
        </PrimaryButton>
      </div>
    </div>
  </LazyBackgroundImage>
);

export default Ready;
