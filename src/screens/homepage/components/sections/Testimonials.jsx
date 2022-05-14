import React from 'react';

import blackTextureBgImg from 'shared/images/black-texture-bg.png';
import LazyBackgroundImage from 'shared/components/LazyBackgroundImage';
import Testimonial from 'shared/components/Testimonial';
import testimonialsPlayerBgImg from 'screens/homepage/images/testimonials-player-bg.jpeg';
import testimonialsPlayerImg from 'screens/homepage/images/testimonials-player.jpeg';

const TESTIMONIALS_DATA = [
  {
    name: 'Matt McGinley',
    rate: 5,
    description:
      'I attended Crosscourt before covid. good runs. I appreciate the positivity from the staff. It creates good vibes for the runs. The new club is off the charts dope.',
  },
  {
    name: 'Jon Kaker',
    rate: 5,
    description: 'It is so organized that it puts LA Fitness pickup runs to shame.',
  },
  {
    name: 'Filip Matic',
    rate: 5,
    description:
      'Awesome. We gotta keep this rolling. This concept has unlimited potential. Thanks for all the effort of putting this together.',
  },
  {
    name: 'Demetrius Foster-Phenix',
    rate: 5,
    description:
      'Dope experience. Got to meet really cool guys and network. Of course the sessions are fun & competitive. Facility is very nice. I will be a regular.',
  },
  {
    name: 'Kevin Simms',
    rate: 5,
    description:
      'This place is amazing. Good quality courts. The staff and refs are fantastic, definitely taking care of the players and making sure the games are good and competitive. I highly recommend you coming out to this place.',
  },
  {
    name: 'Antonio Calavano',
    rate: 5,
    description:
      "Best place I've been to! Y'all are crushing it. Can't wait to come back & use the unlimited membership",
  },
];

const Testimonials = () => (
  <LazyBackgroundImage
    as="section"
    img={blackTextureBgImg}
    className="bg-no-repeat bg-cover bg-center"
  >
    <div className="lg:flex lg:pt-10 lg:pb-32">
      <div className="px-4 lg:px-20 py-16 lg:py-20 w-full">
        <h2 className="font-shapiro95_super_wide text-4xl lg:text-6xl mb-10 lg:mb-14">
          <span className="text-transparent text-stroke-cc-purple text-stroke-width-1 block">
            WHAT OUR
          </span>
          <span className="text-cc-purple block">PLAYERS SAY</span>
        </h2>
        <div className="flex flex-wrap text-white -m-4">
          {TESTIMONIALS_DATA.map((testimonial, index) => (
            <div key={index} className="w-full md:w-1/2 p-4">
              <Testimonial
                name={testimonial.name}
                rate={testimonial.rate}
                description={testimonial.description}
              />
            </div>
          ))}
        </div>
      </div>
      <LazyBackgroundImage
        img={testimonialsPlayerBgImg}
        className="bg-no-repeat bg-cover bg-center text-right lg:py-32 lg:pl-4 lg:w-2/5"
      >
        <img alt="testimonials-player" src={testimonialsPlayerImg} className="inline-block" />
      </LazyBackgroundImage>
    </div>
  </LazyBackgroundImage>
);

export default Testimonials;
