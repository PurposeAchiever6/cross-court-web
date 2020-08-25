import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from 'shared/components/Button';
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
  justify-content: center;
  height: 100vh;
  background-color: #9999ff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(20px);
  padding: 0 3rem;
  position: relative;
  text-align: right;

  .list {
    display: flex;
    flex-direction: column;
    // height: 40%;
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
            SCHEDULE/LOCATIONS
          </NavLink>
        </li>
        <li className="list-item">
          <NavLink exact to={ROUTES.SERIES} onClick={menuToggler}>
            SERIES
          </NavLink>
        </li>
        {/* {!isAuthenticated && (
          <li className="list-item">
            <NavLink exact to={ROUTES.LOGIN} onClick={menuToggler}>
              LOG IN
            </NavLink>
          </li>
        )}
        {!isAuthenticated && (
          <li className="list-item">
            <NavLink exact to={ROUTES.SIGNUP} onClick={menuToggler}>
              SIGN UP
            </NavLink>
          </li>
        )} */}
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
          {userProfile.isSem ? (
            <NavLink exact to={ROUTES.SEMHANDBOOK} onClick={menuToggler}>
              SEM HANDBOOK
            </NavLink>
          ) : (
            <NavLink exact to={ROUTES.SEM} onClick={menuToggler}>
              JOIN THE TEAM
            </NavLink>
          )}
        </li>

        {/* {!isAuthenticated && (
          <li className="list-item">
            <NavLink exact to={ROUTES.LOGIN} onClick={menuToggler}>
              LOG IN
            </NavLink>
          </li>
        )}
        {!isAuthenticated && (
          <li className="list-item">
            <NavLink exact to={ROUTES.SIGNUP} onClick={menuToggler}>
              SIGN UP
            </NavLink>
          </li>
        )}
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
        )} */}
      </ul>
      {/* {userProfile.isSem ? (
        <Link to={ROUTES.SEMHANDBOOK} className="sem-handbook">
          <AlternativeButton className="button" onClick={menuToggler}>
            SEM HANDBOOK
          </AlternativeButton>
        </Link>
      ) : (
        <Link to={ROUTES.SEM} className="join-the-team">
          <AlternativeButton className="button" onClick={menuToggler}>
            JOIN THE #CCTEAM
          </AlternativeButton>
        </Link>
      )} */}
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
      {/* 
      {isAuthenticated && (
        <Link to={ROUTES.MYACCOUNT} className="middle-level-link">
          <AlternativeButton className="button" onClick={menuToggler}>
            MY ACCOUNT
          </AlternativeButton>
        </Link>
      )}
      {isAuthenticated && (
        <a className="middle-level-link" href="#" onClick={(e) => {
            e.preventDefault();
            menuToggler();
            logoutAction();
          }}>
          <AlternativeButton className="button">
            LOGOUT
          </AlternativeButton>
        </a>
      )} */}
      {/* <a className="email shapiro95_super_wide" href="mailto:ccteam@cross-court.com">
        CCTEAM@CROSS-COURT.COM
      </a> */}
      <Link to={ROUTES.LOCATIONS}>
        <Button className="ar-button shapiro96_inclined_wide" onClick={menuToggler}>
          <div className="ar-button-inner">RESERVE SESSION</div>
        </Button>
      </Link>
    </Nav>
  );
};

SidebarMenu.propTypes = {
  menuToggler: PropTypes.func.isRequired,
};

export default SidebarMenu;
