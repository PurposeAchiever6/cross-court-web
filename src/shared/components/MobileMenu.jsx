import React, { useEffect } from 'react';
import styled from 'styled-components';

import useScrollBlock from 'shared/hooks/useScrollBlock';
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

  @media (max-width: 768px) {
    display: ${({ open }) => (open ? 'block' : 'none')};
  }
`;

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
    <MobileMenuContainer open={menuOpen}>
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
