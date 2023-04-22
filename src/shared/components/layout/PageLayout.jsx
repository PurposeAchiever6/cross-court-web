import React from 'react';
import PropTypes from 'prop-types';

import LazyBackgroundImage from 'shared/components/LazyBackgroundImage';

const PageLayout = ({ dark, backgroundImage, noPadding, headerPadding, children }) => {
  const paddingClasses = (() => {
    if (noPadding) {
      return '';
    }

    if (headerPadding) {
      return 'pt-16';
    }

    return 'pt-24 md:pt-28 pb-24';
  })();

  return (
    <LazyBackgroundImage img={backgroundImage} className={dark ? 'bg-black text-white' : ''}>
      <div className={`max-w-screen-2xl mx-auto ${paddingClasses}`}>{children}</div>
    </LazyBackgroundImage>
  );
};

PageLayout.defaultProps = {
  dark: true,
  backgroundImage: null,
  noPadding: false,
  headerPadding: false,
};

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  dark: PropTypes.bool,
  backgroundImage: PropTypes.string,
  noPadding: PropTypes.bool,
  headerPadding: PropTypes.bool,
};

export default PageLayout;
