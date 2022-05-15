import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import DesktopMenu from 'cheeseburger-menu';

import ROUTES from 'shared/constants/routes';
import colors from 'shared/styles/constants';
import useScrollBlock from 'shared/hooks/useScrollBlock';
import MenuSvg from 'shared/components/svg/MenuSvg';
import LogoSvg from 'shared/components/svg/LogoSvg';
import Navbar from 'shared/components/Header/Navbar';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import OnboardingTour from 'shared/components/OnboardingTour';
import { getMonth } from 'shared/utils/date';
import { isUserInFirstFreeSessionFlow } from 'shared/utils/user';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import { isOnboardingTourEnable, disableOnboardingTour } from 'shared/utils/onboardingTour';

import SidebarMenu from './SidebarMenu';
import MobileMenu from './MobileMenu';

const SCROLL_LIMIT = 50;
const ALWAYS_SCROLLED = [
  ROUTES.LOCATIONS,
  ROUTES.LOCATIONSFIRST,
  ROUTES.FORGOTPASSWORD,
  ROUTES.RESETPASSWORD,
  ROUTES.MYACCOUNT,
  ROUTES.LOGIN,
  ROUTES.DASHBOARD,
  ROUTES.FAQ,
  ROUTES.CONTENT,
  ROUTES.PAYMENT_METHODS,
  ROUTES.RULES,
  ROUTES.SIGNUP,
  ROUTES.TERMS,
  ROUTES.RATING,
  ROUTES.CHECKOUT,
  ROUTES.PURCHASEHISTORY,
  ROUTES.MANAGE_MEMBERSHIP,
  ROUTES.FIRSTSESSIONRESERVED,
  ROUTES.PRIVACY_POLICY,
  '/session',
  '/first-session',
];
const BLACK_BG = [ROUTES.MEMBERSHIPS, ROUTES.GALLERY, ROUTES.FIRSTSESSIONRESERVED];

const Header = () => {
  const { pathname } = useLocation();

  const isAuthenticated = useSelector(getIsAuthenticated);
  const userInfo = useSelector(getUserProfile);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [blockScroll, allowScroll] = useScrollBlock();

  const changeBg = useCallback(
    () =>
      setScrolled(
        ALWAYS_SCROLLED.includes(`/${pathname.split(/[/_]/)[1]}`)
          ? true
          : window.scrollY > SCROLL_LIMIT
      ),
    [pathname]
  );

  document.addEventListener('scroll', () => {
    changeBg();
  });

  useEffect(() => {
    changeBg();
  }, [pathname, changeBg]);

  const onboardingTourId = 'onboarding-tour-header';
  const isHeaderOnboardingTourEnable =
    !isAuthenticated && pathname === ROUTES.HOME && isOnboardingTourEnable(onboardingTourId);

  const exitHeaderOnboardingTour = () => {
    disableOnboardingTour(onboardingTourId);
    allowScroll();
  };

  if (isHeaderOnboardingTourEnable) {
    blockScroll();
  }

  const daysFromNow = (input) => {
    const oneDay = 24 * 60 * 60 * 1000;
    let parts = (input || '').split('-');
    const firstDate = new Date();
    const secondDate = new Date(parts[0], parts[1] - 1, parts[2]);
    let daysLeft = Math.floor(Math.abs((secondDate - firstDate) / oneDay));

    if (daysLeft === 0) {
      daysLeft = (
        <>
          <span className="text-black">&lt; 1</span> DAY
        </>
      );
    } else if (daysLeft === 1) {
      daysLeft = (
        <>
          <span className="text-black">1</span> DAY
        </>
      );
    } else {
      daysLeft = (
        <>
          <span className="text-black">{daysLeft}</span> DAYS
        </>
      );
    }
    return daysLeft;
  };

  let buttonText;

  if (isAuthenticated) {
    if (isUserInFirstFreeSessionFlow(userInfo)) {
      buttonText = <span>EXPIRES {daysFromNow(userInfo.freeSessionExpirationDate)}</span>;
    } else {
      buttonText = <span>RESERVE</span>;
    }
  } else {
    buttonText = 'FIRST FREE';
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const showMembershipPromoBanner = pathname === ROUTES.HOME && !userInfo.activeSubscription;
  const showNavItems = pathname === ROUTES.HOME && !isAuthenticated;
  const isBlackBg = BLACK_BG.includes(pathname);
  const bgColor = isBlackBg ? 'bg-cc-black' : 'bg-white';
  const logoColor =
    menuOpen || isBlackBg ? colors.white : scrolled ? colors.brandPurple : colors.white;

  return pathname === ROUTES.DASHBOARD ? null : (
    <>
      {showMembershipPromoBanner && (
        <div className="bg-cc-black z-10 text-white h-12 md:h-8 flex justify-center items-center text-center px-4">
          Get 50% off your first month's membership through {getMonth()}
        </div>
      )}
      <header
        className={`header w-full h-16 bg-transparent transition duration-700 ${
          scrolled
            ? `${
                isBlackBg ? 'shadow-header-dark' : 'shadow-header-white'
              } ${bgColor} fixed z-50 top-0`
            : `absolute ${showMembershipPromoBanner ? 'top-12 md:top-8' : 'top-0'}`
        }`}
      >
        <MobileMenu menuOpen={menuOpen} toggleMenu={toggleMenu} />
        <DesktopMenu
          isOpen={menuOpen}
          closeCallback={toggleMenu}
          topOffset="0"
          width="50vw"
          transitionTime={1}
          className="hidden md:block"
        >
          <SidebarMenu menuToggler={toggleMenu} />
        </DesktopMenu>
        <div className="header-content flex items-center h-full justify-between pr-4">
          <div className="flex items-center h-full z-1005">
            <div className="flex h-full w-16 justify-center" data-active={menuOpen}>
              <button
                className="flex items-center justify-center"
                aria-label="Menu Button"
                type="button"
                onClick={toggleMenu}
              >
                <MenuSvg color={logoColor} />
              </button>
            </div>
            <Link to={ROUTES.HOME}>
              <LogoSvg className="w-32 md:w-52 h-6" color={logoColor} />
            </Link>
          </div>
          <div className="flex items-center z-10">
            {showNavItems && (
              <Navbar scrolled={scrolled} dark={isBlackBg} isAuthenticated={isAuthenticated} />
            )}
            <PrimaryButton
              id="header-btn"
              className="italic"
              px="4px"
              py="6px"
              fontSize="12px"
              to={isAuthenticated ? ROUTES.LOCATIONS : ROUTES.SIGNUP}
              onClick={exitHeaderOnboardingTour}
            >
              {buttonText}
            </PrimaryButton>
            <OnboardingTour
              id={onboardingTourId}
              enabled={isHeaderOnboardingTourEnable}
              steps={[
                {
                  element: '#header-btn',
                  intro:
                    'Your first Crosscourt session is on us. Tap <strong>FIRST FREE</strong> to receive your session credit.',
                },
              ]}
              onExit={exitHeaderOnboardingTour}
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
