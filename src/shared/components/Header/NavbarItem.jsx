import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const NavbarItemLink = styled(Link)`
  &.active {
    pointer-events: none;
  }

  &::after {
    display: block;
    content: '';
    background-color: currentColor;
    height: 2px;
    width: 0px;
    margin-top: 1px;
  }

  &.active::after,
  &:hover::after {
    width: 100%;
    transition: width 0.3s;
  }
`;

const NavbarItem = ({ name, link, enable, color }) => {
  const { pathname } = useLocation();

  const active = pathname === link;

  let classes = 'text-sm uppercase transition duration-300';

  if (active) classes += ' active';

  switch (color) {
    case 'purple':
      classes += ' text-cc-purple';
      break;
    case 'white':
      classes += ' text-white';
      break;
    default:
      break;
  }

  if (!enable) {
    return null;
  }

  return (
    <NavbarItemLink to={link} className={classes}>
      {name}
    </NavbarItemLink>
  );
};

NavbarItem.defaultProps = {
  enable: true,
  color: 'white',
};

NavbarItem.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  enable: PropTypes.bool,
  color: PropTypes.string,
};

export default NavbarItem;
