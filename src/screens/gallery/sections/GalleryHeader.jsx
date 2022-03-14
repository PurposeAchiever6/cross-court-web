import React from 'react';

import LazyBackgroundImage from 'shared/components/LazyBackgroundImage';
import joinTheCCTeamBgImg from 'screens/careers/images/cool-basketball-gym.jpeg';

const GalleryHeader = () => (
  <LazyBackgroundImage
    img={joinTheCCTeamBgImg}
    className="flex justify-center items-center min-h-screen bg-cc-black bg-no-repeat bg-cover bg-top"
    as="section"
  >
    <div className="text-center text-white bg-cc-black bg-opacity-60 w-full p-6">
      <h1 className="text-11xl font-dharma_gothic_cexbold text-transparent text-stroke-white block whitespace-nowrap sm:text-13xl">
        GALLERY
      </h1>
    </div>
  </LazyBackgroundImage>
);

export default GalleryHeader;
