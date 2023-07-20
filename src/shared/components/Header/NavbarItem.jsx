import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import Link from 'shared/components/Link';

const NavbarItem = ({ name, link, enable, ...props }) => {
  const { pathname } = useLocation();
  const active = pathname === link;
  const linkClassName = 'text-xs 2xl:text-sm uppercase';

  if (!enable) {
    return null;
  }

  return (
    <Link
      to={link}
      variant="white-opacity"
      className={`${linkClassName} ${active ? 'pointer-events-none opacity-50' : ''}`}
      {...props}
    >
      {name}
    </Link>
  );
};

NavbarItem.defaultProps = {
  enable: true,
};

NavbarItem.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  enable: PropTypes.bool,
};

export default NavbarItem;
