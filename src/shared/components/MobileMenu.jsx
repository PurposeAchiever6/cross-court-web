import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import Link from 'shared/components/Link';
import useScrollBlock from 'shared/hooks/useScrollBlock';
import ROUTES from 'shared/constants/routes';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { logoutInit } from 'screens/auth/actionCreators';
import Button from 'shared/components/Button';
import CrossSvg from 'shared/components/svg/CrossSvg';
import useOnClickOutside from 'shared/hooks/useOnClickOutside';

const MobileMenu = ({ menuOpen, toggleMenu }) => {
  const SHOP_URL = import.meta.env.VITE_SHOP_URL;
  const menuRef = useRef(null);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsAuthenticated);
  const history = useHistory();
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    menuOpen ? blockScroll() : allowScroll();
    return () => allowScroll();
  }, [menuOpen, blockScroll, allowScroll]);

  useOnClickOutside(menuRef, () => toggleMenu());

  if (!menuOpen) {
    return null;
  }

  const logoutAction = () => {
    dispatch(logoutInit());
    toggleMenu();
  };

  const handleClick = (route) => {
    toggleMenu();
    history.push(route);
  };

  return (
    <div className="fixed inset-0 md:hidden z-[9999]">
      <nav
        className="flex flex-col justify-center bg-cc-blue-700 shadow-md pt-32 pb-12 px-12 relative"
        ref={menuRef}
      >
        <button className="absolute top-5 left-5" onClick={toggleMenu} type="button">
          <CrossSvg className="text-white w-6" />
        </button>

        <div className="flex flex-col gap-4 text-white text-xl font-shapiro95_super_wide">
          <NavLink exact to={ROUTES.HOME} onClick={toggleMenu}>
            Home
          </NavLink>
          <hr />
          <NavLink exact to={ROUTES.WHY_JOIN} onClick={toggleMenu}>
            Why Join?
          </NavLink>
          <hr />
          <NavLink exact to={ROUTES.LOCATIONS} onClick={toggleMenu}>
            Schedule
          </NavLink>
          <hr />
          <NavLink exact to={ROUTES.MEMBERSHIPS} onClick={toggleMenu}>
            Memberships
          </NavLink>
          <hr />
          {SHOP_URL && (
            <Link
              className="hover:no-underline"
              variant="white"
              name="Shop"
              isExternal
              target="_blank"
              rel="noreferrer"
              to={SHOP_URL}
            >
              Shop
            </Link>
          )}
          <hr />

          {isAuthenticated && (
            <>
              <NavLink exact to={ROUTES.MYACCOUNT} onClick={toggleMenu}>
                My account
              </NavLink>
              <hr />
              <Link to="#" type="button" onClick={() => logoutAction()}>
                Logout
              </Link>
              <hr />
              <Button className="w-full" onClick={() => handleClick(ROUTES.LOCATIONS)}>
                Schedule
              </Button>
            </>
          )}

          {!isAuthenticated && (
            <>
              <Link variant="white" to="#" onClick={() => handleClick(ROUTES.LOGIN)}>
                Log in
              </Link>
              <hr />
              <Button className="w-full" onClick={() => handleClick(ROUTES.SIGNUP)}>
                Join
              </Button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

MobileMenu.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default MobileMenu;
