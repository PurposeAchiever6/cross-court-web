import React from 'react';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import NavItem from 'shared/components/Header/NavbarItem';

const Navbar = ({ scrolled, dark, isAuthenticated }) => {
  const color = dark || !scrolled ? 'white' : 'purple';

  return (
    <nav className="hidden lg:flex gap-5 xl:gap-12 mr-5 xl:mr-12">
      <NavItem
        name="First Time?"
        link={ROUTES.HOWITWORKS}
        color={color}
        enable={!isAuthenticated}
      />
      <NavItem name="Schedule" link={ROUTES.LOCATIONS} color={color} />
      <NavItem name="Memberships" link={ROUTES.MEMBERSHIPS} color={color} />
      <NavItem name="My Account" link={ROUTES.MYACCOUNT} color={color} enable={isAuthenticated} />
      <NavItem name="Gallery" link={ROUTES.GALLERY} color={color} enable={isAuthenticated} />
      <NavItem name="Content" link={ROUTES.CONTENT} color={color} />
      <NavItem name="Log In" link={ROUTES.LOGIN} color={color} enable={!isAuthenticated} />
    </nav>
  );
};

Navbar.propTypes = {
  scrolled: PropTypes.bool.isRequired,
  dark: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Navbar;
