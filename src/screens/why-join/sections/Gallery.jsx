import React from 'react';

import SectionLayout from 'shared/components/layout/SectionLayout';
import ExpandedLayout from 'shared/components/layout/ExpandedLayout';

import CarouselImages from 'shared/components/CarouselImages';

import v3 from 'screens/why-join/images/gallery/3v3.jpg';
import ball from 'screens/why-join/images/gallery/ball.jpg';
import basket from 'screens/why-join/images/gallery/basket.jpg';
import basketball from 'screens/why-join/images/gallery/basketball.jpg';
import bike from 'screens/why-join/images/gallery/bike.jpg';
import clock from 'screens/why-join/images/gallery/clock.jpg';
import crosscourt from 'screens/why-join/images/gallery/crosscourt.jpg';
import enjoy from 'screens/why-join/images/gallery/enjoy.jpg';
import highFive from 'screens/why-join/images/gallery/high-five.jpg';
import join from 'screens/why-join/images/gallery/join.jpg';
import muscle from 'screens/why-join/images/gallery/muscle.jpg';
import playBasketball from 'screens/why-join/images/gallery/play-basketball.jpg';
import play from 'screens/why-join/images/gallery/play.jpg';
import randomizer from 'screens/why-join/images/gallery/randomizer.jpg';
import referee from 'screens/why-join/images/gallery/referee.jpg';
import relax from 'screens/why-join/images/gallery/relax.jpg';
import stretch from 'screens/why-join/images/gallery/stretch.jpg';
import sweat from 'screens/why-join/images/gallery/sweat.jpg';
import teamWork from 'screens/why-join/images/gallery/team-work.jpg';
import team from 'screens/why-join/images/gallery/team.jpg';

const IMAGES = [
  v3,
  ball,
  basket,
  basketball,
  bike,
  clock,
  crosscourt,
  enjoy,
  highFive,
  join,
  muscle,
  playBasketball,
  play,
  randomizer,
  referee,
  relax,
  stretch,
  sweat,
  teamWork,
  team,
];

const Gallery = () => (
  <SectionLayout className="mt-12 md:mt-20">
    <h2 className="text-white font-shapiro95_super_wide text-center text-3xl md:text-5xl my-8 md:mt-20">
      Gallery
    </h2>
    <ExpandedLayout mdBreakpoint={false} lgBreakpoint={false} xlBreakpoint={false}>
      <CarouselImages
        autoPlay
        imagesClassName="h-screen md:h-[48rem] w-full object-cover object-top"
        imageUrls={IMAGES}
      />
    </ExpandedLayout>
  </SectionLayout>
);

Gallery.propTypes = {};

export default Gallery;
