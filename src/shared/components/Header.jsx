import React, { useState, useEffect, useCallback } from 'react';
import DesktopMenu from 'cheeseburger-menu';
import { Link } from 'react-router-dom';
import ROUTES from 'shared/constants/routes';
import MenuSvg from 'shared/components/svg/MenuSvg';
import LogoSvg from 'shared/components/svg/LogoSvg';
import SidebarMenu from './SidebarMenu';
import MobileMenu from './MobileMenu';
import colors from 'shared/styles/constants';

import { useSelector, useDispatch } from 'react-redux';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';

import { initialLoadInit } from 'screens/my-account/actionCreators';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

import { useLocation } from 'react-router-dom';

const SCROLL_LIMIT = 50;
const ALWAYS_SCROLLED = [
  ROUTES.LOCATIONS,
  ROUTES.MEMBERSHIPS,
  ROUTES.MYACCOUNT,
  ROUTES.LOGIN,
  ROUTES.SEM,
  ROUTES.DASHBOARD,
];
const BLACK_BG = [ROUTES.SEM, ROUTES.MEMBERSHIPS];

const Header = () => {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const [scrolled, setScrolled] = useState(false);

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

  useEffect(() => {
    dispatch(initialLoadInit());
  }, [dispatch]);

  const isAuthenticated = useSelector(getIsAuthenticated);

  const userInfo = useSelector(getUserProfile);
  const freeSessionNotExpired = new Date(userInfo.freeSessionExpirationDate) > new Date();
  const freeSessionNotClaimed = userInfo.freeSessionState === 'not_claimed';
  const freeSessionUsed =
    userInfo.freeSessionState === 'used' || userInfo.freeSessionState === 'claimed';
  const freeSessionExpirationDate = userInfo.freeSessionExpirationDate;
  const daysFromNow = (input) => {
    const oneDay = 24 * 60 * 60 * 1000;
    let parts = (input || '').split('-');
    const firstDate = new Date();
    const secondDate = new Date(parts[0], parts[1] - 1, parts[2]);
    let daysLeft = Math.floor(Math.abs((secondDate - firstDate) / oneDay));

    if (daysLeft === 0) {
      daysLeft = (
        <>
          <span className="days">&lt; 1</span> DAY
        </>
      );
    } else if (daysLeft === 1) {
      daysLeft = (
        <>
          <span className="days">1</span> DAY
        </>
      );
    } else {
      daysLeft = (
        <>
          <span className="days">{daysLeft}</span> DAYS
        </>
      );
    }
    return daysLeft;
  };

  const isFSFFlow = freeSessionNotExpired && freeSessionNotClaimed;
  const bannerButtonTarget = ROUTES.LOCATIONS;
  const bannerText = () => {
    let text = '';

    if (isAuthenticated) {
      if (isFSFFlow) {
        text = <span>EXPIRES {daysFromNow(freeSessionExpirationDate)}</span>;
      } else if (freeSessionUsed) {
        text = <span>RESERVE</span>;
      } else {
        text = <span>RESERVE</span>;
      }
    } else {
      text = 'FIRST FREE';
    }

    return text;
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isBlackBg = BLACK_BG.includes(pathname);
  const bgColor = isBlackBg ? 'bg-cc-black' : 'bg-white';
  const logoColor =
    menuOpen || isBlackBg ? colors.white : scrolled ? colors.brandPurple : colors.white;

  return (
    <div
      className={`header w-full fixed h-16 top-0 z-10 bg-transparent transition duration-500 ${
        scrolled ? `${!isBlackBg && 'shadow-navbar'} ${bgColor}` : ''
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
      <div className="header-content flex items-center h-full justify-between pr-3">
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
        <PrimaryButton className="fsf-button" to={bannerButtonTarget}>
          {bannerText()}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default Header;
