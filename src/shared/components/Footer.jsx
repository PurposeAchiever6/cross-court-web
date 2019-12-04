import React from 'react';
import styled from 'styled-components';

import colors from 'shared/styles/constants';
import device from 'shared/styles/mediaQueries';
import FacebookSvg from './FacebookSvg';
import LinkedInSvg from './LinkedInSvg';
import AlternativeButton from './AlternativeButton';

const FooterContainer = styled.footer`
  color: ${colors.white};
  background-color: ${colors.polarPlum};
  font-family: var(--main-font-family);
  font-size: 0.875rem;
  padding: 2.5rem 1rem;

  .footer-content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    align-items: center;
    width: 16rem;
    margin: 0 auto;
  }

  .social-icons {
    grid-column: 2;
    display: flex;
    justify-content: space-around;
    padding-left: 2rem;
  }

  .icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .faq-button {
    grid-column: 1;
  }

  .footer-par {
    grid-row: 2;
    grid-column: 1 / 3;
    justify-self: center;
  }

  @media ${device.desktop} {
    padding: 1rem;

    .footer-content {
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: 1fr;
      width: initial;
      margin: 0 2.5rem;
    }

    .footer-par {
      grid-row: 1;
      grid-column: 1 / 4;
      justify-self: flex-start;
    }

    .faq-button {
      grid-column: 4;
      width: 11rem;
      justify-self: end;
    }

    .social-icons {
      grid-column: 5;
      justify-self: center;
    }

    .icon-container {
      margin: 0 1rem;
    }
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <div className="footer-content">
        <AlternativeButton className="faq-button">FAQ</AlternativeButton>
        <div className="social-icons">
          <div className="icon-container">
            <FacebookSvg />
          </div>
          <div className="icon-container">
            <LinkedInSvg />
          </div>
        </div>
        <p className="footer-par">© 2019 CrossCourt All Rights Reserved</p>
      </div>
    </FooterContainer>
  );
}

export default Footer;
