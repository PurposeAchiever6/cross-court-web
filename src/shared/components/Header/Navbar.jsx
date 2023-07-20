import React from 'react';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import NavItem from 'shared/components/Header/NavbarItem';

const SHOP_URL = import.meta.env.VITE_SHOP_URL;

const Navbar = ({ isAuthenticated }) => (
  <nav className="flex gap-6 xl:gap-8 2xl:gap-10">
    <NavItem name="Home" link={ROUTES.HOME} />
    <NavItem name="Why Join?" link={ROUTES.WHY_JOIN} />
    <NavItem name="Schedule" link={ROUTES.LOCATIONS} />
    <NavItem name="Memberships" link={ROUTES.MEMBERSHIPS} />
    {SHOP_URL && (
      <NavItem name="Shop" isExternal target="_blank" rel="noreferrer" link={SHOP_URL} />
    )}
    <NavItem name="My Account" link={ROUTES.MYACCOUNT} enable={isAuthenticated} />
    <NavItem name="Login" link={ROUTES.LOGIN} enable={!isAuthenticated} />
  </nav>
);

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Navbar;
