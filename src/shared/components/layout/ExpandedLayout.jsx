import React from 'react';
import PropTypes from 'prop-types';

import LazyBackgroundImage from 'shared/components/LazyBackgroundImage';

const ExpandedLayout = ({
  className,
  backgroundImage,
  defaultBreakpoint,
  smBreakpoint,
  mdBreakpoint,
  lgBreakpoint,
  xlBreakpoint,
  children,
}) => {
  let negativeMargin = '';

  defaultBreakpoint ? (negativeMargin += '-mx-4') : (negativeMargin += 'mx-0');
  smBreakpoint ? (negativeMargin += ' sm:-mx-6') : (negativeMargin += ' sm:mx-0');
  mdBreakpoint ? (negativeMargin += ' md:-mx-10') : (negativeMargin += ' md:mx-0');
  lgBreakpoint ? (negativeMargin += ' lg:-mx-14') : (negativeMargin += ' lg:mx-0');
  xlBreakpoint ? (negativeMargin += ' xl:-mx-20') : (negativeMargin += ' xl:mx-0');

  return (
    <LazyBackgroundImage
      as="div"
      img={backgroundImage}
      className={`${negativeMargin} ${className}`}
    >
      {children}
    </LazyBackgroundImage>
  );
};

ExpandedLayout.defaultProps = {
  className: '',
  backgroundImage: null,
  defaultBreakpoint: true,
  smBreakpoint: true,
  mdBreakpoint: true,
  lgBreakpoint: true,
  xlBreakpoint: true,
};

ExpandedLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  backgroundImage: PropTypes.string,
  defaultBreakpoint: PropTypes.bool,
  smBreakpoint: PropTypes.bool,
  mdBreakpoint: PropTypes.bool,
  lgBreakpoint: PropTypes.bool,
  xlBreakpoint: PropTypes.bool,
};

export default ExpandedLayout;
