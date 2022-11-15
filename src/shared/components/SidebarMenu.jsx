import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CloseButton from 'shared/components/CloseButton';
import ROUTES from 'shared/constants/routes';
import { logoutInit } from 'screens/auth/actionCreators';
import { getIsAuthenticated } from 'screens/auth/reducer';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const SidebarMenu = ({ menuToggler }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsAuthenticated);
  const history = useHistory();

  const logoutAction = () => dispatch(logoutInit());

  const handleClick = (route) => {
    menuToggler();
    history.push(route);
  };

  return (
    <nav className="sidebar-nav flex flex-col h-screen justify-center bg-cc-black shadow-md px-8 relative list-none">
      <CloseButton className="close-button" onClick={menuToggler} />

      <div className="flex flex-col text-white text-lg md:text-2xl items-center md:items-end font-shapiro95_super_wide">
        <NavLink className="list-item" exact to={ROUTES.HOME} onClick={menuToggler}>
          HOME
        </NavLink>
        <NavLink className="list-item" exact to={ROUTES.HOWITWORKS} onClick={menuToggler}>
          {isAuthenticated ? 'LEARN MORE' : 'FIRST TIME?'}
        </NavLink>
        <NavLink className="list-item" exact to={ROUTES.LOCATIONS} onClick={menuToggler}>
          SCHEDULE
        </NavLink>
        <NavLink className="list-item" exact to={ROUTES.MEMBERSHIPS} onClick={menuToggler}>
          MEMBERSHIPS / PRICING
        </NavLink>
        <NavLink className="list-item" exact to={ROUTES.CONTENT} onClick={menuToggler}>
          CONTENT
        </NavLink>

        {isAuthenticated && (
          <>
            <NavLink className="list-item" exact to={ROUTES.MYACCOUNT} onClick={menuToggler}>
              MY ACCOUNT
            </NavLink>

            <Link to="#" className="list-item" type="button" onClick={() => logoutAction()}>
              LOGOUT
            </Link>
          </>
        )}

        {!isAuthenticated && (
          <>
            <Link
              to="#"
              onClick={() => handleClick(ROUTES.LOGIN)}
              className="font-shapiro95_super_wide text-4xl mt-32 hover:opacity-60 transition-opacity duration-300"
            >
              LOG IN
            </Link>

            <Link
              to="#"
              onClick={() => handleClick(ROUTES.SIGNUP)}
              className="font-shapiro95_super_wide text-4xl hover:opacity-60 transition-opacity duration-300"
            >
              SIGN UP
            </Link>
          </>
        )}
      </div>

      <PrimaryButton
        className="w-max self-center md:self-end mt-16"
        inverted
        bg="transparent"
        to={ROUTES.LOCATIONS}
        onClick={menuToggler}
      >
        BOOK SESSION
      </PrimaryButton>
    </nav>
  );
};

SidebarMenu.propTypes = {
  menuToggler: PropTypes.func.isRequired,
};

export default SidebarMenu;
