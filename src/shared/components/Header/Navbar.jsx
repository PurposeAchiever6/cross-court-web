import React from 'react';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import NavItem from 'shared/components/Header/NavbarItem';

const Navbar = ({ scrolled, dark, isAuthenticated }) => {
  const color = dark || !scrolled ? 'white' : 'purple';

  return (
    <nav className="flex gap-5 xl:gap-12">
      <NavItem name="Why Join?" link={ROUTES.WHY_JOIN} color={color} />
      <NavItem name="Schedule" link={ROUTES.LOCATIONS} color={color} />
      <NavItem name="Memberships / Pricing" link={ROUTES.MEMBERSHIPS} color={color} />
      <NavItem name="Content" link={ROUTES.CONTENT} color={color} />
      <NavItem name="My Account" link={ROUTES.MYACCOUNT} color={color} enable={isAuthenticated} />
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
