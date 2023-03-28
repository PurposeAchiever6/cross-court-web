import React from 'react';

import SectionLayout from 'shared/components/layout/SectionLayout';
import Testimonial from 'shared/components/Testimonial';
import CircleDashedSvg from 'shared/components/svg/CircleDashedSvg';
import Carousel from 'shared/components/Carousel/index';

const TESTIMONIALS_DATA = [
  {
    name: 'Eric Zachary',
    description:
      'Session was perfect. 5 minute games are exactly the right length and the format makes each game feel like game 7. Really enjoyed my teammates and the refs are super cool. Can’t wait to check out my highlights.',
  },
  {
    name: 'Tristan Merrill',
    description:
      'Going from playing at LA Fitness to Crosscourt has been game changing. I used to wait around for at least 30 minutes before being picked up by a squad. Having referees saves so much time arguing over foul calls and dealing with that bs. I am all in on CC.',
  },
  {
    name: 'Darell Neely',
    description:
      'Crosscourt’s format is sick. That random player selector is brilliant. Shooting free throws for teams was such a waste of time. Left dripping in sweat and was good to get the competitive juices flowing again. ',
  },
  {
    name: 'Riley Kendrick',
    description:
      'Never going back to the park again. Stoked to be hooping consistently again. Forgot how much I missed this! I’m back!',
  },
  {
    name: 'Bri Williams',
    description:
      'The people at Crosscourt are super friendly and the hospitality is next level. Super welcoming experience and felt like a valued member from the moment I signed up for my first free session.',
  },
  {
    name: 'Tony Baker',
    description:
      'Crosscourt is special! Felt like a video game! Extremely convenient for me and works with my schedule. Love the flexibility and being a part of this awesome community of hoopers. Never running on a treadmill again!',
  },
];

const Testimonials = () => (
  <SectionLayout className="relative bg-cc-blue-900 pt-12 md:pt-32 pb-10 md:pb-48 mb-12 md:mb-0">
    <CircleDashedSvg className="absolute-center w-[17rem] h-[17rem] mt-0 md:mt-12 text-cc-purple" />
    <CircleDashedSvg className="absolute-center w-[24rem] h-[24rem] mt-0 md:mt-12 text-cc-purple text-opacity-50" />
    <CircleDashedSvg className="absolute-center w-[32rem] h-[32rem] mt-0 md:mt-12 text-cc-purple text-opacity-25" />
    <div className="relative max-w-screen-sm mx-auto">
      <h2 className="text-center md:text-left font-shapiro95_super_wide text-3xl sm:text-4xl mb-6 sm:mb-10">
        Helping our members elevate{' '}
        <span className="text-cc-purple">personally and professionally.</span>
      </h2>
      <Carousel>
        {TESTIMONIALS_DATA.map((testimonial, index) => (
          <Testimonial key={index} name={testimonial.name} description={testimonial.description} />
        ))}
      </Carousel>
    </div>
  </SectionLayout>
);

export default Testimonials;
