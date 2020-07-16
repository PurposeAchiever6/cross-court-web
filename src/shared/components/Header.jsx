import React, { useState } from 'react';
import styled from 'styled-components';
import DesktopMenu from 'cheeseburger-menu';
import { Link } from 'react-router-dom';
import ROUTES from 'shared/constants/routes';
import ArButton from 'shared/components/ArButton';
import MenuSvg from 'shared/components/svg/MenuSvg';
import MenuSvgAlt from 'shared/components/svg/MenuSvgAlt';
import LogoSvg from 'shared/components/svg/LogoSvg';
import LogoSvgAlt from 'shared/components/svg/LogoSvgAlt';
import LogoSvgNavOpen from 'shared/components/svg/LogoSvgNavOpen';
import device from 'shared/styles/mediaQueries';
import SidebarMenu from './SidebarMenu';
import MobileMenu from './MobileMenu';

const Container = styled.div`
  z-index: 10;
  height: 4rem;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  overflow: hidden;

  .cheeseburger-menu-inner {
    height: 100vh !important;
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
      // .menu-button-container[data-active='true'] {
      //   background: rgba(0, 0, 0, 0.7);
      //   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      // }

      .logo-icon {
        width: 205px;
        height: 25px;
      }
    }
  }
`;

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

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
            </button>
          </div>
          <Link to={ROUTES.HOME}>
            <LogoSvg className="logo-icon" />
            <LogoSvgAlt className="logo-icon-alt" />
            <LogoSvgNavOpen className="logo-icon-nav-open" />
          </Link>
        </div>
        <ArButton className="mobile-compact" link={ROUTES.LOCATIONS} font="shapiro96_inclined_wide">
          RESERVE<span className="mobile-hide-inline"> SESSION</span>
        </ArButton>
      </div>
    </Container>
  );
}

export default Header;
