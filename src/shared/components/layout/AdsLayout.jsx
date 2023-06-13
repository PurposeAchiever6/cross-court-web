import React from 'react';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import LazyBackgroundImage from 'shared/components/LazyBackgroundImage';
import Link from 'shared/components/Link';
import Button from 'shared/components/Button';
import LogoSvg from 'shared/components/svg/LogoSvg';

const AdsLayout = ({ dark, backgroundImage, className, children }) => (
  <LazyBackgroundImage
    img={backgroundImage}
    className={`-mt-16 ${dark ? 'bg-black text-white' : ''} ${className}`}
  >
    <div className="max-w-screen-2xl mx-auto">
      <div className="flex justify-between items-center m-4 md:m-6">
        <Link className="z-10" variant="none" to={ROUTES.HOME}>
          <LogoSvg className="w-36 md:w-56 text-white" />
        </Link>
        <Button className="text-xs md:text-sm z-10" to={ROUTES.MEMBERSHIPS}>
          Join Today
        </Button>
      </div>
      {children}
      <div className="pb-8 text-sm opacity-90">
        {`${new Date().getFullYear()}`} &copy; Crosscourt
      </div>
    </div>
  </LazyBackgroundImage>
);

AdsLayout.defaultProps = {
  dark: true,
  backgroundImage: null,
  className: '',
};

AdsLayout.propTypes = {
  children: PropTypes.node.isRequired,
  dark: PropTypes.bool,
  backgroundImage: PropTypes.string,
  className: PropTypes.string,
};

export default AdsLayout;
