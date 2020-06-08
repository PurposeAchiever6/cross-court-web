import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import runtimeEnv from '@mars/heroku-js-runtime-env';

import ROUTES from 'shared/constants/routes';
import colors from 'shared/styles/constants';
import device from 'shared/styles/mediaQueries';
import FacebookSvg from './svg/FacebookSvg';
import LinkedInSvg from './svg/LinkedInSvg';
import TwitterSvg from './svg/TwitterSvg';
import InstagramSvg from './svg/InstagramSvg';
import AlternativeButton from './AlternativeButton';

const FooterContainer = styled.footer`
  color: ${colors.white};
  background-color: ${colors.polarPlum};
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
      width: 83%;

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

  @media ${device.mobile} {
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

  const FACEBOOK_LINK = env.REACT_APP_FACEBOOK_LINK;
  const TWITTER_LINK = env.REACT_APP_TWITTER_LINK;
  const INSTAGRAM_LINK = env.REACT_APP_INSTAGRAM_LINK;
  const LINKEDIN_LINK = env.REACT_APP_LINKEDIN_LINK;

  return (
    <FooterContainer>
      <div className="footer-content">
        <div className="first-row">
          <Link to={ROUTES.FAQ}>
            <AlternativeButton className="faq-button">FAQ</AlternativeButton>
          </Link>
          <div className="social-icons">
            <div className="icon-container">
              <a href={FACEBOOK_LINK} target="_blank" rel="noopener noreferrer">
                <FacebookSvg />
              </a>
            </div>
            <div className="icon-container">
              <a href={TWITTER_LINK} target="_blank" rel="noopener noreferrer">
                <TwitterSvg />
              </a>
            </div>
            <div className="icon-container">
              <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer">
                <InstagramSvg />
              </a>
            </div>
            <div className="icon-container">
              <a href={LINKEDIN_LINK} target="_blank" rel="noopener noreferrer">
                <LinkedInSvg />
              </a>
            </div>
          </div>
        </div>
        <span className="copyright">© 2019 Crosscourt All Rights Reserved</span>
      </div>
    </FooterContainer>
  );
}

export default Footer;
