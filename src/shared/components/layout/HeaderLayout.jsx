import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DesktopMenu from 'cheeseburger-menu';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import MenuSvg from 'shared/components/svg/MenuSvg';
import LogoSvg from 'shared/components/svg/LogoSvg';

import HeaderPromoBanner from 'shared/components/HeaderPromoBanner';
import SidebarMenu from 'shared/components/SidebarMenu';
import MobileMenu from 'shared/components/MobileMenu';

const SCROLL_LIMIT = 50;

const HeaderLayout = ({ dark, alwaysScrolled, showBanner, children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showMembershipPromoBanner, setShowMembershipPromoBanner] = useState(showBanner);

  const textColorClass = dark || menuOpen ? 'text-white' : 'text-cc-purple';

  document.addEventListener('scroll', () => {
    setScrolled(alwaysScrolled ? true : window.scrollY > SCROLL_LIMIT);
  });

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setScrolled(alwaysScrolled);
  }, [alwaysScrolled]);

  return (
    <>
      {showMembershipPromoBanner && (
        <HeaderPromoBanner onClose={() => setShowMembershipPromoBanner(false)} />
      )}
      <header
        className={`header h-16 z-10 inset-x-0 transition-bg duration-700 ${textColorClass} ${
          dark ? 'bg-black' : 'bg-white'
        } ${
          scrolled
            ? `${
                dark ? 'shadow-header-dark' : 'shadow-header-white'
              } border-b border-b-cc-purple fixed z-50 top-0`
            : `absolute ${showMembershipPromoBanner ? 'top-16 sm:top-10' : 'top-0'}`
        }`}
      >
        <MobileMenu menuOpen={menuOpen} toggleMenu={toggleMenu} />
        <DesktopMenu
          isOpen={menuOpen}
          closeCallback={toggleMenu}
          topOffset="0"
          width={document.documentElement.clientWidth / 2}
          transitionTime={1}
          className="hidden md:block"
        >
          <SidebarMenu menuToggler={toggleMenu} />
        </DesktopMenu>
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center h-full px-4 2xl:px-0">
          <div
            className={`flex items-center h-full z-1005 ${
              showMembershipPromoBanner && menuOpen ? '-mt-56 sm:-mt-32 md:mt-0' : ''
            }`}
          >
            <button aria-label="Menu Button" type="button" onClick={toggleMenu} className="mr-4">
              <MenuSvg />
            </button>
            <Link to={ROUTES.HOME}>
              <LogoSvg className="hidden sm:block w-52 h-6" />
            </Link>
          </div>
          <div>{children}</div>
        </div>
      </header>
    </>
  );
};

HeaderLayout.defaultProps = {
  dark: true,
  alwaysScrolled: false,
  showBanner: false,
};

HeaderLayout.propTypes = {
  dark: PropTypes.bool,
  alwaysScrolled: PropTypes.bool,
  showBanner: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default HeaderLayout;
