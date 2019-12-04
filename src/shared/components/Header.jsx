import React, { useState } from 'react';
import styled from 'styled-components';
import DesktopMenu from 'cheeseburger-menu';
import ScrollLock from 'react-scrolllock';

import Button from 'shared/components/Button';
import MenuSvg from 'shared/components/MenuSvg';
import LogoSvg from 'shared/components/LogoSvg';
import device from 'shared/styles/mediaQueries';
import SidebarMenu from './SidebarMenu';
import Modal from './Modal';

const Container = styled.div`
  z-index: 10;
  background-color: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  height: 82px;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  overflow: hidden;

  .cheeseburger-menu-inner {
    height: 100vh !important;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding-right: 1rem;
  }

  .header-left {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .menu-button-container {
    height: 100%;
    width: 5em;
    display: flex;
    justify-content: center;

    .menu-button {
      border: 0;
      background-color: transparent;
      font-size: 1.5rem;
      width: 100%;
      padding: 0;
    }
  }

  @media ${device.mobile} {
    .cheeseburger-menu {
      display: none;
    }

    .header-content .button {
      width: 8rem;
      padding: 1rem 0.3rem;
      font-size: 0.8rem;
    }
  }

  @media ${device.desktop} {
    .header-left {
      .menu-button-container[data-active='true'] {
        background: rgba(0, 0, 0, 0.7);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      }

      .logo-icon {
        padding-left: 3.5rem;
        width: 205px;
        height: 25px;
      }
    }
  }
`;

const MobileMenu = styled.div`
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

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <Container>
      <Modal>
        <ScrollLock isActive={menuOpen}>
          <MobileMenu open={menuOpen}>
            <SidebarMenu menuToggler={toggleMenu} />
          </MobileMenu>
        </ScrollLock>
      </Modal>
      <DesktopMenu isOpen={menuOpen} closeCallback={toggleMenu} topOffset="82px" width="23rem">
        <SidebarMenu menuToggler={toggleMenu} />
      </DesktopMenu>
      <div className="header-content">
        <div className="header-left">
          <div className="menu-button-container" data-active={menuOpen}>
            <button className="menu-button" type="button" onClick={toggleMenu}>
              <MenuSvg color={menuOpen ? 'white' : 'black'} />
            </button>
          </div>
          <LogoSvg className="logo-icon" />
        </div>
        <Button className="button">Reserve session</Button>
      </div>
    </Container>
  );
}

export default Header;
