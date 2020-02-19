import React, { useEffect } from 'react';
import styled from 'styled-components';
import ScrollLock from 'react-scrolllock';
import device from 'shared/styles/mediaQueries';

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

  @media ${device.mobile} {
    display: ${({ open }) => (open ? 'block' : 'none')};
  }
`;

const MobileMenu = ({ menuOpen, toggleMenu }) => {
  useEffect(() => {
    modalRoot.appendChild(element);
    return () => {
      modalRoot.removeChild(element);
    };
  }, []);

  return ReactDOM.createPortal(
    <ScrollLock isActive={menuOpen}>
      <MobileMenuContainer open={menuOpen}>
        <SidebarMenu menuToggler={toggleMenu} />
      </MobileMenuContainer>
    </ScrollLock>,
    element
  );
};

MobileMenu.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default MobileMenu;
