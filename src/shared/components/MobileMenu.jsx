import React, { useEffect, useRef } from 'react';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import styled from 'styled-components';

import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import SidebarMenu from './SidebarMenu';

const modalRoot = document.querySelector('#modal-root');
const element = document.createElement('div');

const MobileMenuContainer = styled.div`
  display: none;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;

  @media (max-width: 991px) {
    display: ${({ open }) => (open ? 'block' : 'none')};
  }
`;

const MobileMenu = ({ menuOpen, toggleMenu }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    modalRoot.appendChild(element);
    return () => {
      modalRoot.removeChild(element);
    };
  }, []);

  useEffect(() => {
    menuOpen ? disableBodyScroll(menuRef.current) : enableBodyScroll(menuRef.current);
    return () => clearAllBodyScrollLocks();
  }, [menuOpen]);

  return ReactDOM.createPortal(
    <MobileMenuContainer open={menuOpen} ref={menuRef}>
      <SidebarMenu menuToggler={toggleMenu} />
    </MobileMenuContainer>,
    element
  );
};

MobileMenu.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default MobileMenu;
