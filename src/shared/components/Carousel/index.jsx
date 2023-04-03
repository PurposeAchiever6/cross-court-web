import React from 'react';
import { Carousel as ReactResponsiveCarousel } from 'react-responsive-carousel';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ArrowPrev from './ArrowPrev';
import ArrowNext from './ArrowNext';
import Indicator from './Indicator';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Container = styled.div`
  padding-bottom: 4rem;

  .carousel-root {
    position: relative;

    .carousel.carousel-slider {
      overflow: visible;
    }

    .carousel .slide {
      text-align: left;
    }

    .control-dots {
      position: absolute;
      bottom: -3rem;
      right: 7rem;
      width: auto;
      display: flex;
    }
  }
`;

const Carousel = ({ children, className, ...props }) => {
  const renderArrowPrev = (clickHandler) => <ArrowPrev onClick={clickHandler} />;
  const renderArrowNext = (clickHandler) => <ArrowNext onClick={clickHandler} />;
  const renderIndicator = (clickHandler, isSelected) => (
    <Indicator isSelected={isSelected} onClick={clickHandler} />
  );

  return (
    <Container className={className}>
      <ReactResponsiveCarousel
        showStatus={false}
        showThumbs={false}
        renderArrowPrev={renderArrowPrev}
        renderArrowNext={renderArrowNext}
        renderIndicator={renderIndicator}
        {...props}
      >
        {children}
      </ReactResponsiveCarousel>
    </Container>
  );
};

Carousel.defaultProps = {
  className: '',
};

Carousel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Carousel;
