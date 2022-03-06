import React from 'react';
import { Carousel as ReactResponsiveCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import PropTypes from 'prop-types';

const Arrow = ({ prev, prevClickHandler, nextClickHandler, label }) => (
  <button
    type="button"
    onClick={prev ? prevClickHandler : nextClickHandler}
    title={label}
    className={`carousel-arrow ${prev ? 'prev' : 'next'}`}
  />
);

const Carousel = ({
  imageUrls,
  className,
  imagesClassName,
  infiniteLoop,
  showArrows,
  showStatus,
  showThumbs,
  autoPlay,
  interval,
  useKeyboardArrows,
  swipeable,
}) => (
  <ReactResponsiveCarousel
    className={className}
    infiniteLoop={infiniteLoop}
    showArrows={showArrows}
    showStatus={showStatus}
    showThumbs={showThumbs}
    autoPlay={autoPlay}
    interval={interval}
    useKeyboardArrows={useKeyboardArrows}
    swipeable={swipeable}
    renderArrowPrev={(clickHandler, _hasPrev, _label) => (
      <Arrow prev prevClickHandler={clickHandler} />
    )}
    renderArrowNext={(clickHandler, _hasNext, _label) => <Arrow nextClickHandler={clickHandler} />}
  >
    {imageUrls.map((image, index) => (
      <img className={imagesClassName} src={image} alt={`carousel-${index}`} key={index} />
    ))}
  </ReactResponsiveCarousel>
);

Arrow.propTypes = {
  prev: PropTypes.bool,
  prevClickHandler: PropTypes.func,
  nextClickHandler: PropTypes.func,
};

Arrow.defaultProps = {
  prev: false,
  prevClickHandler: null,
  nextClickHandler: null,
};

Carousel.defaultProps = {
  imageUrls: [],
  className: '',
  imagesClassName: '',
  infiniteLoop: true,
  showArrows: true,
  showStatus: false,
  showThumbs: false,
  autoPlay: false,
  interval: 3000,
  useKeyboardArrows: false,
  swipeable: true,
};

Carousel.propTypes = {
  imageUrls: PropTypes.array,
  className: PropTypes.string,
  imagesClassName: PropTypes.string,
  infiniteLoop: PropTypes.bool,
  showArrows: PropTypes.bool,
  showStatus: PropTypes.bool,
  showThumbs: PropTypes.bool,
  autoPlay: PropTypes.bool,
  interval: PropTypes.number,
  useKeyboardArrows: PropTypes.bool,
  swipeable: PropTypes.bool,
};

export default Carousel;
