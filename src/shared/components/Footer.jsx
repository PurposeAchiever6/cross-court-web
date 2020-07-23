import React from 'react';
import styled from 'styled-components';
import ArButton from 'shared/components/ArButton';
import runtimeEnv from '@mars/heroku-js-runtime-env';

import ROUTES from 'shared/constants/routes';
import colors from 'shared/styles/constants';
import device from 'shared/styles/mediaQueries';
import InstagramSvg from './svg/InstagramSvg';
import PaperPlaneSvg from './svg/PaperPlaneSvg';

const FooterContainer = styled.footer`
  color: ${colors.white};
  background-color: #9999ff;
  font-family: var(--main-font-family);
  font-size: 0.875rem;
  padding: 1rem 0.5rem 0.5rem;

  .footer-content {
    display: flex;
    align-items: center;
    margin: 0 auto;
    flex-direction: row-reverse;
    justify-content: center;
    .first-row {
      display: flex;
      width: 70%;

      justify-content: flex-end;

      .social-icons {
        display: flex;
        justify-content: space-around;
        padding-left: 2rem;
        width: 20rem;

        .icon-container {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: ${colors.white};
          color: ${colors.polarPlum};
          border-radius: 3rem;
          height: 3rem;
          width: 3rem;
          a {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
          }
          .faq-button {
            padding: 0.7rem 5rem;
          }
          svg {
            height: 1.5rem;
            width: 1.5rem;
            color: ${colors.polarPlum};
          }
        }
      }
    }
  }

  @media (max-width: 991px) {
    padding: 1rem;
    height: auto;

    .footer-content {
      display: flex;
      flex-direction: column;
      margin: 0;
      width: 100%;
      padding: 0;
      .first-row {
        width: 100%;
        flex-direction: column;
        a {
          text-align: center;
          button {
            width: 100%;
          }
        }
        .social-icons {
          width: 100%;
          padding: 0;
          margin: 1rem 0;
          order: 3;
          .icon-container {
            margin: 0;
            justify-content: space-between;
          }
        }
      }
      & > a {
        margin: 1rem 0 2rem;
        order: 2;
        width: 84%;
        button {
          width: 100%;
        }
      }

      .copyright {
        margin: 0;
        order: 1;
      }
    }
  }
`;

function Footer() {
  const env = runtimeEnv();

  const INSTAGRAM_LINK = env.REACT_APP_INSTAGRAM_LINK;
  const EMAIL_LINK = env.REACT_APP_EMAIL_LINK;

  return (
    <FooterContainer className="footer">
      <section className="left-side">
        <p className="copyright title shapiro95_super_wide">
          &copy;2020 CROSSCOURT ALL RIGHTS RESERVED
        </p>
      </section>
      <section className="right-side">
        <ArButton className="faq-link" link={ROUTES.FAQ}>
          FAQ
        </ArButton>
        <a className="social" href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer">
          <InstagramSvg />
        </a>
        <a className="social" href={EMAIL_LINK} rel="noopener noreferrer">
          <PaperPlaneSvg />
        </a>
      </section>
    </FooterContainer>
  );
}

export default Footer;
