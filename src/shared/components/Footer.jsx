import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import runtimeEnv from '@mars/heroku-js-runtime-env';

import ROUTES from 'shared/constants/routes';
import colors from 'shared/styles/constants';
import { getUserProfile } from 'screens/my-account/reducer';
import { openContactFormForUser } from 'shared/utils/contactForm';
import InstagramSvg from './svg/InstagramSvg';

const FooterContainer = styled.footer`
  display: flex;
  background-color: ${colors.brandBlack};
  font-family: shapiro95_super_wide;
  font-size: 0.875rem;
  flex-direction: column;
  padding: 20px 32px;
  align-items: center;
  position: absolute;
  width: 100%;
  bottom: 0;
  justify-content: space-between;

  @media (min-width: 992px) {
    flex-direction: row;
    justify-content: flex-end;
    * {
      margin: 0;
      margin-left: 10px;
    }
  }

  * {
    cursor: pointer;
    color: ${colors.white};
  }

  a {
    text-decoration: none;
  }

  .instagram {
    max-width: 20px;
  }
`;

function Footer() {
  const env = runtimeEnv();
  const { pathname } = useLocation();
  const currentUser = useSelector(getUserProfile) || {};

  const INSTAGRAM_LINK = env.REACT_APP_INSTAGRAM_LINK;

  return pathname === ROUTES.DASHBOARD ? null : (
    <>
      <FooterContainer className="h-48 md:h-16">
        <Link to={ROUTES.SEM}>
          <p>JOIN THE TEAM</p>
        </Link>
        <Link to={ROUTES.FAQ}>
          <p>FAQ</p>
        </Link>
        <p onClick={() => openContactFormForUser(currentUser)}>CONTACT</p>
        <p onClick={() => openContactFormForUser(currentUser)}>PRIVATE RENTALS</p>
        <a className="instagram" href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer">
          <InstagramSvg width="100%" />
        </a>
      </FooterContainer>
      <div
        className="elfsight-app-0ed6048f-8715-4cd0-a3b0-1da4299c9136"
        style={{ position: 'fixed' }}
      />
    </>
  );
}

export default Footer;
