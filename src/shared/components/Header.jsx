import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DesktopMenu from 'cheeseburger-menu';
import { Link } from 'react-router-dom';
import ROUTES from 'shared/constants/routes';
import ArButton from 'shared/components/ArButton';
import MenuSvg from 'shared/components/svg/MenuSvg';
import MenuSvgAlt from 'shared/components/svg/MenuSvgAlt';
import MenuSvgNavOpen from 'shared/components/svg/MenuSvgNavOpen';
import LogoSvg from 'shared/components/svg/LogoSvg';
import LogoSvgAlt from 'shared/components/svg/LogoSvgAlt';
import LogoSvgNavOpen from 'shared/components/svg/LogoSvgNavOpen';
import SidebarMenu from './SidebarMenu';
import MobileMenu from './MobileMenu';

import { useSelector, useDispatch } from 'react-redux';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';

import { initialLoadInit } from 'screens/my-account/actionCreators';

const Container = styled.div`
  z-index: 10;
  height: 4rem;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;

  .cheeseburger-menu-inner {
    height: 100vh !important;
    width: 50vw;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding-right: 10px;
  }

  .header-left {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .menu-button-container {
    height: 100%;
    width: 4em;
    display: flex;
    justify-content: center;

    .menu-button {
      border: 0;
      background-color: transparent;
      font-size: 1.5rem;
      width: 100%;
      padding: 0;
    }
  }

  @media (max-width: 991px) {
    .cheeseburger-menu {
      display: none;
    }

    .header-content .button {
      width: 8rem;
      padding: 1rem 0.3rem;
      font-size: 0.8rem;
    }
  }

  @media (min-width: 992px) {
    .header-left {
      .logo-icon {
        width: 205px;
        height: 25px;
      }
    }
  }
`;

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const isAuthenticated = useSelector(getIsAuthenticated);

  const dispatch = useDispatch();
  const userInfo = useSelector(getUserProfile);
  const freeSessionNotExpired = new Date(userInfo.freeSessionExpirationDate) > new Date();
  const freeSessionNotClaimed = userInfo.freeSessionState === 'not_claimed';
  const freeSessionUsed =
    userInfo.freeSessionState === 'used' || userInfo.freeSessionState === 'claimed';
  const freeSessionExpirationDate = userInfo.freeSessionExpirationDate;
  const daysFromNow = input => {
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
  const bannerButtonTarget = isAuthenticated ? ROUTES.LOCATIONS : ROUTES.SIGNUP;
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

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  useEffect(() => {
    dispatch(initialLoadInit());
  }, [dispatch]);

  return (
    <Container className="header">
      <MobileMenu menuOpen={menuOpen} toggleMenu={toggleMenu} />
      <DesktopMenu isOpen={menuOpen} closeCallback={toggleMenu} topOffset="0" width="50vw">
        <SidebarMenu menuToggler={toggleMenu} />
      </DesktopMenu>
      <div className="header-content">
        <div className="header-left">
          <div className="menu-button-container" data-active={menuOpen}>
            <button
              className="menu-button"
              aria-label="Menu Button"
              type="button"
              onClick={toggleMenu}
            >
              <MenuSvg className="menu-bars" color={menuOpen ? '#000000' : '#FFFFFF'} />
              <MenuSvgAlt className="menu-bars-alt" color={menuOpen ? '#000000' : '#9999FF'} />
              <MenuSvgNavOpen className="menu-bars-nav-open" color={'#FFFFFF'} />
            </button>
          </div>
          <Link to={ROUTES.HOME}>
            <LogoSvg className="logo-icon" />
            <LogoSvgAlt className="logo-icon-alt" />
            <LogoSvgNavOpen className="logo-icon-nav-open" />
          </Link>
        </div>
        <ArButton className="fsf-button" link={bannerButtonTarget}>
          {bannerText()}
        </ArButton>
      </div>
    </Container>
  );
}

export default Header;
