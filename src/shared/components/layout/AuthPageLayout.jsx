import React from 'react';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import Link from 'shared/components/Link';
import LazyBackgroundImage from 'shared/components/LazyBackgroundImage';
import LogoSvg from 'shared/components/svg/LogoSvg';

const AuthPageLayout = ({ image, children }) => (
  <div className="md:flex">
    <LazyBackgroundImage
      img={image}
      className="md:w-1/2 md:shrink-0 bg-no-repeat bg-cover bg-top md:bg-center min-h-[50vh] md:min-h-screen"
    >
      <div className="text-white p-8 md:p-12">
        <Link variant="none" to={ROUTES.HOME}>
          <LogoSvg className="w-56 md:w-64 mb-4" />
        </Link>
        <span className="text-sm md:text-base">Trust the Progress</span>
      </div>
    </LazyBackgroundImage>
    <div className="md:w-1/2 md:shrink-0 px-4 py-4 md:px-8 md:py-8 lg:px-16 max-w-2xl mx-auto">
      <div className="relative md:flex md:items-center md:h-full">
        <div className="w-full">{children}</div>
      </div>
    </div>
  </div>
);

AuthPageLayout.propTypes = {
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AuthPageLayout;
