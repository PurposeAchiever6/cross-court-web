import React from 'react';
import PropTypes from 'prop-types';

import LazyBackgroundImage from 'shared/components/LazyBackgroundImage';

const PageLayout = ({ dark, backgroundImage, children }) => (
  <LazyBackgroundImage img={backgroundImage} className={dark ? 'bg-black text-white' : ''}>
    <div className="max-w-screen-2xl mx-auto pt-14 md:pt-28 pb-24">{children}</div>
  </LazyBackgroundImage>
);

PageLayout.defaultProps = {
  dark: true,
  backgroundImage: null,
};

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  dark: PropTypes.bool,
  backgroundImage: PropTypes.string,
};

export default PageLayout;
