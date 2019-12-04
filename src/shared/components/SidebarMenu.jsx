import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import AlternativeButton from 'shared/components/AlternativeButton';
import CloseButton from 'shared/components/CloseButton';
import colors from 'shared/styles/constants';
import device from 'shared/styles/mediaQueries';
import routes from 'shared/constants/routes';

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
    height: 60%;
    justify-content: space-around;
    padding: 0;
    list-style-type: none;

    .list-item a {
      text-decoration: none;
      color: white;
      font-size: 1.5em;
      font-weight: normal;

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

const SidebarMenu = ({ menuToggler }) => (
  <Nav>
    <CloseButton onClick={menuToggler} />
    <ul className="list">
      <li className="list-item">
        <NavLink exact to={routes.home} onClick={menuToggler}>
          Home
        </NavLink>
      </li>
      <li className="list-item">
        <NavLink exact to={routes.howItWorks} onClick={menuToggler}>
          First Time?
        </NavLink>
      </li>
      <li className="list-item">
        <NavLink exact to={routes.locations} onClick={menuToggler}>
          Locations
        </NavLink>
      </li>
      <li className="list-item">
        <NavLink exact to={routes.schedule} onClick={menuToggler}>
          Schedule
        </NavLink>
      </li>
      <li className="list-item">
        <NavLink exact to={routes.memberships} onClick={menuToggler}>
          Memberships
        </NavLink>
      </li>
      <li className="list-item">
        <NavLink exact to={routes.login} onClick={menuToggler}>
          Log In
        </NavLink>
      </li>
      <li className="list-item">
        <NavLink exact to={routes.signup} onClick={menuToggler}>
          Sign Up
        </NavLink>
      </li>
    </ul>
    <AlternativeButton className="button">Become SEM/Referee</AlternativeButton>
  </Nav>
);

SidebarMenu.propTypes = {
  menuToggler: PropTypes.func.isRequired,
};

export default SidebarMenu;
