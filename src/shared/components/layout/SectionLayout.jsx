import React from 'react';
import PropTypes from 'prop-types';

import LazyBackgroundImage from 'shared/components/LazyBackgroundImage';

const SectionLayout = ({ className, backgroundImage, as, children }) => (
  <LazyBackgroundImage
    as={as}
    img={backgroundImage}
    className={`px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 ${className}`}
  >
    {children}
  </LazyBackgroundImage>
);

SectionLayout.defaultProps = {
  className: '',
  backgroundImage: null,
  as: 'section',
};

SectionLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  backgroundImage: PropTypes.string,
  as: PropTypes.string,
};

export default SectionLayout;
