import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import useScrollBlock from 'shared/hooks/useScrollBlock';
import SidebarMenu from './SidebarMenu';

const MobileMenu = ({ menuOpen, toggleMenu }) => {
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    menuOpen ? blockScroll() : allowScroll();
    return () => allowScroll();
  }, [menuOpen, blockScroll, allowScroll]);

  if (!menuOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 md:hidden z-[9999]">
      <SidebarMenu menuToggler={toggleMenu} />
    </div>
  );
};

MobileMenu.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default MobileMenu;
