import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import { pluralize } from 'shared/utils/helpers';
import {
  isUserInFirstFreeSessionFlow,
  showHeaderMembershipPromoCodeBanner,
} from 'shared/utils/user';
import { initialLoad as getAvailableProducts } from 'screens/products/actionCreators';
import { getFeaturedRecurringProductPromoCode } from 'screens/products/reducer';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import HeaderLayout from 'shared/components/layout/HeaderLayout';
import Navbar from 'shared/components/Header/Navbar';
import Button from 'shared/components/Button';

const ALWAYS_SCROLLED = [
  ROUTES.ABOUT_YOURSELF,
  ROUTES.CAREERS,
  ROUTES.CHECKOUT,
  ROUTES.CONTENT,
  ROUTES.DASHBOARD,
  ROUTES.FORGOTPASSWORD,
  ROUTES.GOALS,
  ROUTES.NOT_FOUND,
  ROUTES.PRIVACY_POLICY,
  ROUTES.RESETPASSWORD,
  ROUTES.SIGNUP,
  ROUTES.TERMS,
];

const BLACK_BG = [
  ROUTES.CAREERS,
  ROUTES.CHECKOUT_CONFIRMED,
  ROUTES.CHECKOUT_MEMBERSHIP_CONFIRMED,
  ROUTES.CONTENT,
  ROUTES.FAQ,
  ROUTES.FAQ,
  ROUTES.FIRSTSESSIONRESERVED,
  ROUTES.GALLERY,
  ROUTES.HOME,
  ROUTES.LOCATIONS,
  ROUTES.LOCATIONSFIRST,
  ROUTES.MANAGE_MEMBERSHIP,
  ROUTES.MEMBERSHIPS,
  ROUTES.MYACCOUNT,
  ROUTES.REFERRALS,
  ROUTES.SESSIONRESERVED,
  ROUTES.SETTINGS,
  ROUTES.WHY_JOIN,
  '/first-session',
  '/session',
];

const SHOW_NAVBAR = [
  ROUTES.CAREERS,
  ROUTES.CHECKOUT_CONFIRMED,
  ROUTES.CHECKOUT_MEMBERSHIP_CONFIRMED,
  ROUTES.FAQ,
  ROUTES.FAQ,
  ROUTES.FIRSTSESSIONRESERVED,
  ROUTES.HOME,
  ROUTES.LOCATIONS,
  ROUTES.LOCATIONSFIRST,
  ROUTES.MANAGE_MEMBERSHIP,
  ROUTES.MEMBERSHIPS,
  ROUTES.MYACCOUNT,
  ROUTES.REFERRALS,
  ROUTES.SESSIONRESERVED,
  ROUTES.SETTINGS,
  ROUTES.WHY_JOIN,
  '/first-session',
  '/session',
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

const BANNER_ENABLED_ROUTES = [ROUTES.HOME, ROUTES.MEMBERSHIPS];

const Header = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(getIsAuthenticated);
  const currentUser = useSelector(getUserProfile);
  const promoCode = useSelector(getFeaturedRecurringProductPromoCode);

  const [alwaysScrolled, setAlwaysScrolled] = useState(false);
  const [showMembershipPromoBanner, setShowMembershipPromoBanner] = useState(false);

  const splitedPath = pathname
    .split(/[/_]/)
    .slice(1)
    .filter((item) => Number.isNaN(item) || !Date.parse(item));

  const showNavItems = SHOW_NAVBAR.includes(`/${splitedPath.join('/')}`);
  const blackBg = BLACK_BG.includes(`/${splitedPath.join('/')}`);

  useEffect(() => {
    dispatch(getAvailableProducts());
  }, [currentUser]);

  useEffect(() => {
    setAlwaysScrolled(ALWAYS_SCROLLED.includes(`/${splitedPath.join('/')}`));
  }, [pathname]);

  useEffect(() => {
    const showBanner =
      BANNER_ENABLED_ROUTES.includes(pathname) &&
      showHeaderMembershipPromoCodeBanner(isAuthenticated, promoCode);

    setShowMembershipPromoBanner(showBanner);
  }, [pathname, isAuthenticated, promoCode]);

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
      return 'Join';
    }

    return isUserInFirstFreeSessionFlow(currentUser)
      ? `Expires ${daysFromNow(currentUser.freeSessionExpirationDate)}`
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
