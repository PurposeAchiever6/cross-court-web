import React from 'react';

import SectionLayout from 'shared/components/layout/SectionLayout';
import Testimonial from 'shared/components/Testimonial';
import CircleDashedSvg from 'shared/components/svg/CircleDashedSvg';
import Carousel from 'shared/components/Carousel/index';

import richardRainierImg from 'screens/homepage/images/testimonials/richard-rainier.jpeg';
import stephenAdamsImg from 'screens/homepage/images/testimonials/stephen-adams.jpeg';
import sophiaThomasImg from 'screens/homepage/images/testimonials/sophia-thomas.jpeg';

const TESTIMONIALS_DATA = [
  {
    name: 'Richard Rainier',
    image: richardRainierImg,
    description:
      "Crosscourt feels like a home away from home. I'm always connecting with other members who have similar interests and goals. It has opened a ton of doors for me and I've met some of my closest friends. The power of team sport is crazy.",
  },
  {
    name: 'Stephen Adams',
    image: stephenAdamsImg,
    description:
      "I didn't know I was looking for something that would allow me to rediscover why I fell in love with team sports in the first place. The vibes, the people, the energy, the other emotionally stimulating experiences, all of it, makes me feel amazing and puts me in the best headspace.",
  },
  {
    name: 'Sophia Thomas',
    image: sophiaThomasImg,
    description:
      "There is nothing like a Crosscourt sweat. Whether I'm at the club for a session, SKLZ, an activation, or joining other members for an off site active meetup, I'm constantly pushing myself and seeing results, not only on the court, but off the court as well.",
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
          <Testimonial
            key={index}
            name={testimonial.name}
            image={testimonial.image}
            description={testimonial.description}
          />
        ))}
      </Carousel>
    </div>
  </SectionLayout>
);

export default Testimonials;
