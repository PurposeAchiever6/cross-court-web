import React, { useEffect } from 'react';

import useScrollBlock from 'shared/hooks/useScrollBlock';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import SidebarMenu from './SidebarMenu';

const modalRoot = document.querySelector('#modal-root');
const element = document.createElement('div');

const MobileMenu = ({ menuOpen, toggleMenu }) => {
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    modalRoot.appendChild(element);
    return () => {
      modalRoot.removeChild(element);
    };
  }, []);

  useEffect(() => {
    menuOpen ? blockScroll() : allowScroll();
  }, [menuOpen, blockScroll, allowScroll]);

  return ReactDOM.createPortal(
    <div className={`fixed inset-0 md:hidden ${menuOpen ? 'block' : 'hidden'}`}>
      <SidebarMenu menuToggler={toggleMenu} />
    </div>,
    element
  );
};

MobileMenu.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default MobileMenu;
