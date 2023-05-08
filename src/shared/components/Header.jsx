import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import { pluralize } from 'shared/utils/helpers';
import { isUserInFirstFreeSessionFlow } from 'shared/utils/user';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import HeaderLayout from 'shared/components/layout/HeaderLayout';
import Navbar from 'shared/components/Header/Navbar';
import Button from 'shared/components/Button';

const ALWAYS_SCROLLED = [
  ROUTES.FORGOTPASSWORD,
  ROUTES.RESETPASSWORD,
  ROUTES.DASHBOARD,
  ROUTES.CONTENT,
  ROUTES.SIGNUP,
  ROUTES.TERMS,
  ROUTES.ABOUT_YOURSELF,
  ROUTES.GOALS,
  ROUTES.CHECKOUT,
  ROUTES.MANAGE_MEMBERSHIP,
  ROUTES.PRIVACY_POLICY,
  ROUTES.NOT_FOUND,
  ROUTES.CAREERS,
];

const BLACK_BG = [
  ROUTES.CONTENT,
  ROUTES.FAQ,
  ROUTES.FIRSTSESSIONRESERVED,
  ROUTES.GALLERY,
  ROUTES.LOCATIONS,
  ROUTES.LOCATIONSFIRST,
  ROUTES.HOME,
  ROUTES.MEMBERSHIPS,
  ROUTES.WHY_JOIN,
  ROUTES.FAQ,
  ROUTES.MYACCOUNT,
  ROUTES.SETTINGS,
  '/session',
  '/first-session',
  ROUTES.MANAGE_MEMBERSHIP,
];

const SHOW_NAVBAR = [
  ROUTES.FAQ,
  ROUTES.FIRSTSESSIONRESERVED,
  ROUTES.LOCATIONS,
  ROUTES.LOCATIONSFIRST,
  ROUTES.HOME,
  ROUTES.MEMBERSHIPS,
  ROUTES.WHY_JOIN,
  ROUTES.FAQ,
  ROUTES.MYACCOUNT,
  ROUTES.SETTINGS,
  '/session',
  '/first-session',
];

const HEADER_DISABLED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.LOGIN,
  ROUTES.ONBOARDING_INTENSITY_LEVEL,
  ROUTES.ONBOARDING_MEMBERSHIPS,
  ROUTES.ONBOARDING_PAYMENT_METHOD,
  ROUTES.ONBOARDING_PERSONAL_DETAILS,
  ROUTES.ONBOARDING_REVIEW,
  ROUTES.SIGNUP,
  ROUTES.SIGNUP_CONFIRMATION,
  ROUTES.SIGNUP_VERIFICATION,
];

const Header = () => {
  const { pathname } = useLocation();

  const isAuthenticated = useSelector(getIsAuthenticated);
  const userInfo = useSelector(getUserProfile);

  const [alwaysScrolled, setAlwaysScrolled] = useState(false);
  const [showMembershipPromoBanner, setShowMembershipPromoBanner] = useState(false);

  const showNavItems = SHOW_NAVBAR.includes(`/${pathname.split(/[/_]/)[1]}`);
  const blackBg = BLACK_BG.includes(`/${pathname.split(/[/_]/)[1]}`);

  useEffect(() => {
    setAlwaysScrolled(ALWAYS_SCROLLED.includes(`/${pathname.split(/[/_]/)[1]}`));
  }, [pathname]);

  useEffect(() => {
    setShowMembershipPromoBanner(pathname === ROUTES.HOME && !userInfo.activeSubscription);
  }, [pathname, userInfo.activeSubscription]);

  const daysFromNow = (input) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const parts = (input || '').split('-');
    const firstDate = new Date();
    const secondDate = new Date(parts[0], parts[1] - 1, parts[2]);
    const daysLeft = Math.floor(Math.abs((secondDate - firstDate) / oneDay));

    if (daysLeft === 0) {
      return '< 1 Day';
    }

    return `${daysLeft} ${pluralize('Day', daysLeft)}`;
  };

  const buttonText = (() => {
    if (!isAuthenticated) {
      return 'First Free';
    }

    return isUserInFirstFreeSessionFlow(userInfo)
      ? `Expires ${daysFromNow(userInfo.freeSessionExpirationDate)}`
      : 'Reserve';
  })();

  if (HEADER_DISABLED_ROUTES.includes(pathname)) {
    return null;
  }

  return (
    <HeaderLayout
      dark={blackBg}
      alwaysScrolled={alwaysScrolled}
      showBanner={showMembershipPromoBanner}
    >
      <div className="flex items-center">
        {showNavItems && (
          <div className="hidden lg:block w-full z-10 mr-6 xl:mr-8 2xl:mr-10">
            <Navbar isAuthenticated={isAuthenticated} />
          </div>
        )}
        <Button to={isAuthenticated ? ROUTES.LOCATIONS : ROUTES.SIGNUP} size="sm" className="z-10">
          {buttonText}
        </Button>
      </div>
    </HeaderLayout>
  );
};

export default Header;
