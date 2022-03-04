import React from 'react';
import { Carousel as ReactResponsiveCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import PropTypes from 'prop-types';

const Carousel = ({ imageUrls, className, imagesClassName }) => (
  <ReactResponsiveCarousel
    className={className}
    infiniteLoop={true}
    showArrows={true}
    showStatus={false}
    showThumbs={false}
  >
    {imageUrls.map((image, index) => (
      <img className={imagesClassName} src={image} alt="" key={index} />
    ))}
  </ReactResponsiveCarousel>
);

Carousel.defaultProps = {
  imageUrls: [],
  className: '',
  imagesClassName: '',
};

Carousel.propTypes = {
  imageUrls: PropTypes.array,
  className: PropTypes.string,
  imagesClassName: PropTypes.string,
};

export default Carousel;
