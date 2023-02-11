import React from 'react';
import PropTypes from 'prop-types';

import LazyBackgroundImage from 'shared/components/LazyBackgroundImage';

const SectionLayout = ({ className, backgroundImage, children }) => (
  <LazyBackgroundImage
    as="section"
    img={backgroundImage}
    className={`px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 ${className}`}
  >
    {children}
  </LazyBackgroundImage>
);

SectionLayout.defaultProps = {
  className: '',
  backgroundImage: null,
};

SectionLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  backgroundImage: PropTypes.string,
};

export default SectionLayout;
