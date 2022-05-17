import React from 'react';

import ROUTES from 'shared/constants/routes';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import LazyBackgroundImage from 'shared/components/LazyBackgroundImage';
import Testimonial from 'shared/components/Testimonial';
import blackTextureBgImg from 'shared/images/black-texture-bg.png';
import testimonialsPlayerBgImg from 'screens/homepage/images/testimonials-player-bg.jpeg';
import testimonialsPlayerImg from 'screens/homepage/images/testimonials-player.jpeg';

const TESTIMONIALS_DATA = [
  {
    name: 'Eric Zachary',
    rate: 5,
    description:
      'Session was perfect. 5 minute games are exactly the right length and the format makes each game feel like game 7. Really enjoyed my teammates and the refs are super cool. Can’t wait to check out my highlights.',
  },
  {
    name: 'Tristan Merrill',
    rate: 5,
    description:
      'Going from playing at LA Fitness to Crosscourt has been game changing. I used to wait around for at least 30 minutes before being picked up by a squad. Having referees saves so much time arguing over foul calls and dealing with that bs. I am all in on CC.',
  },
  {
    name: 'Darell Neely',
    rate: 5,
    description:
      'Crosscourt’s format is sick. That random player selector is brilliant. Shooting free throws for teams was such a waste of time. Left dripping in sweat and was good to get the competitive juices flowing again. ',
  },
  {
    name: 'Riley Kendrick',
    rate: 5,
    description:
      'Never going back to the park again. Stoked to be hooping consistently again. Forgot how much I missed this! I’m back!',
  },
  {
    name: 'Bri Williams',
    rate: 5,
    description:
      'The people at Crosscourt are super friendly and the hospitality is next level. Super welcoming experience and felt like a valued member from the moment I signed up for my first free session.',
  },
  {
    name: 'Tony Baker',
    rate: 5,
    description:
      'Crosscourt is special! Felt like a video game! Extremely convenient for me and works with my schedule. Love the flexibility and being a part of this awesome community of hoopers. Never running on a treadmill again!',
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
        <div className="flex flex-wrap text-white -m-4 mb-6">
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
        <div className="text-center">
          <PrimaryButton to={ROUTES.LOCATIONS}>Book Session</PrimaryButton>
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
