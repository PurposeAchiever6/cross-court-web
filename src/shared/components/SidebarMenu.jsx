import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import AlternativeButton from 'shared/components/AlternativeButton';
import CloseButton from 'shared/components/CloseButton';
import colors from 'shared/styles/constants';
import device from 'shared/styles/mediaQueries';
import ROUTES from 'shared/constants/routes';
import { logoutInit } from 'screens/auth/actionCreators';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 92vh;
  background: rgba(0, 0, 0, 0.7);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(20px);
  padding: 0 3rem;
  position: relative;

  .list {
    display: flex;
    flex-direction: column;
    height: 40%;
    justify-content: space-around;
    padding: 0;
    list-style-type: none;

    .list-item a,
    button {
      text-decoration: none;
      color: white;
      font-size: 1.5em;
      font-weight: normal;
      background-color: transparent;
      border: 0;
      padding: 0;

      &.active {
        font-weight: bold;
        color: ${colors.polarPlum};

        &::before {
          content: '•';
          margin: 0 10px;
        }
      }
    }
  }

  .button {
    height: 50px;
    width: 100%;
  }

  @media ${device.mobile} {
    height: 100%;
    align-items: center;

    .list {
      width: 100%;
      align-items: center;

      .list-item a.active {
        margin-right: 33px;
      }
    }
  }
`;

const SidebarMenu = ({ menuToggler }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsAuthenticated);
  const userProfile = useSelector(getUserProfile);

  const logoutAction = () => dispatch(logoutInit());

  return (
    <Nav>
      <CloseButton onClick={menuToggler} />
      <ul className="list">
        <li className="list-item">
          <NavLink exact to={ROUTES.HOME} onClick={menuToggler}>
            Home
          </NavLink>
        </li>
        <li className="list-item">
          <NavLink exact to={ROUTES.HOWITWORKS} onClick={menuToggler}>
            {isAuthenticated ? 'Learn More' : 'First Time?'}
          </NavLink>
        </li>
        <li className="list-item">
          <NavLink exact to={ROUTES.LOCATIONS} onClick={menuToggler}>
            Schedule/Locations
          </NavLink>
        </li>
        <li className="list-item">
          <NavLink exact to={ROUTES.SERIES} onClick={menuToggler}>
            Series
          </NavLink>
        </li>
        {!isAuthenticated && (
          <li className="list-item">
            <NavLink exact to={ROUTES.LOGIN} onClick={menuToggler}>
              Log In
            </NavLink>
          </li>
        )}
        {!isAuthenticated && (
          <li className="list-item">
            <NavLink exact to={ROUTES.SIGNUP} onClick={menuToggler}>
              Sign Up
            </NavLink>
          </li>
        )}
        {isAuthenticated && (
          <li className="list-item">
            <NavLink exact to={ROUTES.MYACCOUNT} onClick={menuToggler}>
              My Account
            </NavLink>
          </li>
        )}
        {isAuthenticated && (
          <li className="list-item">
            <button type="button" href="#" onClick={() => logoutAction()}>
              Logout
            </button>
          </li>
        )}
      </ul>
      {userProfile.isSem ? (
        <Link to={ROUTES.SEMHANDBOOK}>
          <AlternativeButton className="button" onClick={menuToggler}>
            SEM Handbook
          </AlternativeButton>
        </Link>
      ) : (
        <Link to={ROUTES.SEM}>
          <AlternativeButton className="button" onClick={menuToggler}>
            Join the team
          </AlternativeButton>
        </Link>
      )}
    </Nav>
  );
};

SidebarMenu.propTypes = {
  menuToggler: PropTypes.func.isRequired,
};

export default SidebarMenu;
