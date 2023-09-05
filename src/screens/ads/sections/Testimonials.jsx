import React from 'react';
import PropTypes from 'prop-types';

import SectionLayout from 'shared/components/layout/SectionLayout';
import Testimonial from 'shared/components/Testimonial';
import Carousel from 'shared/components/Carousel/index';
import thomasTredenickImg from 'screens/ads/images/testimonials/thomas-tredenick.png';
import jamesHardwickImg from 'screens/ads/images/testimonials/james-hardwick.png';
import michaelBrookImg from 'screens/ads/images/testimonials/michael-brook.png';

const TESTIMONIALS_DATA = [
  {
    name: 'Thomas Tredenick',
    image: thomasTredenickImg,
    description:
      '"Highly recommend this for folks looking for a good pickup basketball experience. Games are quick since you don\'t spend time arguing over calls or wondering who has next. The staff is awesome and all the players were there to have fun and play ball."',
  },
  {
    name: 'James Hardwick',
    image: jamesHardwickImg,
    description:
      '"Been using for quite a few months and I can say the games, refs, staff and facility are top notch. Best basketball experience I\'ve had since moving to Los Angeles."',
  },
  {
    name: 'Michael Brook',
    image: michaelBrookImg,
    description:
      '"Love crosscourt, they’ve curated the perfect recreational basketball experience. Great staff, community of hoopers and execution. Become a staple in my week, and can even go back and watch my highlights. 10x better and more efficient than going to LA Fitness"',
  },
];

const Testimonials = ({ className }) => (
  <SectionLayout className={className}>
    <div className="hidden md:block">
      <div className="flex items-start gap-6">
        {TESTIMONIALS_DATA.map((testimonial, index) => (
          <Testimonial
            key={index}
            name={testimonial.name}
            image={testimonial.image}
            description={testimonial.description}
            className="w-full"
          />
        ))}
      </div>
    </div>
    <div className="md:hidden">
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

Testimonials.defaultProps = {
  className: '',
};

Testimonials.propTypes = {
  className: PropTypes.string,
};

export default Testimonials;
