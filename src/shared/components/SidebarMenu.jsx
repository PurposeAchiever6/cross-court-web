import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import AlternativeButton from 'shared/components/AlternativeButton';
import CloseButton from 'shared/components/CloseButton';
import ROUTES from 'shared/constants/routes';
import { logoutInit } from 'screens/auth/actionCreators';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import colors from 'shared/styles/constants';
import SecondaryButton from 'shared/components/buttons/SecondaryButton';

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  background-color: ${colors.brandBlack};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(20px);
  padding: 0 3rem;
  position: relative;
  text-align: right;

  .list {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0;
    list-style-type: none;

    .list-item a,
    button {
      text-transform: uppercase;
      text-decoration: none;
      color: white;
      font-size: 1.5em;
      font-weight: normal;
      background-color: transparent;
      border: 0;
      padding: 0;

      &.active {
        font-weight: bold;
        color: #9999ff;

        &::before {
          content: '•';
          margin: 0 10px;
        }
      }
    }
  }

  @media (max-width: 991px) {
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
    <Nav className="sidebar-nav">
      <CloseButton className={'close-button'} onClick={menuToggler} />
      <ul className="list">
        <li className="list-item">
          <NavLink exact to={ROUTES.HOME} onClick={menuToggler}>
            HOME
          </NavLink>
        </li>
        <li className="list-item">
          <NavLink exact to={ROUTES.HOWITWORKS} onClick={menuToggler}>
            {isAuthenticated ? 'LEARN MORE' : 'FIRST TIME?'}
          </NavLink>
        </li>
        <li className="list-item">
          <NavLink exact to={ROUTES.LOCATIONS} onClick={menuToggler}>
            SCHEDULE
          </NavLink>
        </li>
        <li className="list-item">
          <NavLink exact to={ROUTES.SERIES} onClick={menuToggler}>
            SERIES
          </NavLink>
        </li>
        {isAuthenticated && (
          <li className="list-item">
            <NavLink exact to={ROUTES.MYACCOUNT} onClick={menuToggler}>
              MY ACCOUNT
            </NavLink>
          </li>
        )}
        {isAuthenticated && (
          <li className="list-item">
            <button type="button" href="#" onClick={() => logoutAction()}>
              LOGOUT
            </button>
          </li>
        )}

        <li className="list-item">
          {userProfile.isSem && (
            <NavLink exact to={ROUTES.SEMHANDBOOK} onClick={menuToggler}>
              SEM HANDBOOK
            </NavLink>
          )}
        </li>
      </ul>
      {!isAuthenticated && (
        <Link to={ROUTES.LOGIN} className="middle-level-link">
          <AlternativeButton className="button" onClick={menuToggler}>
            LOG IN
          </AlternativeButton>
        </Link>
      )}
      {!isAuthenticated && (
        <Link to={ROUTES.SIGNUP} className="middle-level-link">
          <AlternativeButton className="button" onClick={menuToggler}>
            SIGN UP
          </AlternativeButton>
        </Link>
      )}
      <Link to={ROUTES.LOCATIONS} onClick={menuToggler}>
        <SecondaryButton>BOOK SESSION</SecondaryButton>
      </Link>
    </Nav>
  );
};

SidebarMenu.propTypes = {
  menuToggler: PropTypes.func.isRequired,
};

export default SidebarMenu;
