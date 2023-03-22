import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faDiscord } from '@fortawesome/free-brands-svg-icons';
import CheeseburgerMenu from 'cheeseburger-menu';
import runtimeEnv from '@mars/heroku-js-runtime-env';

import ROUTES from 'shared/constants/routes';
import { openContactFormForUser } from 'shared/utils/contactForm';
import { getUserProfile } from 'screens/my-account/reducer';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { logoutInit } from 'screens/auth/actionCreators';
import PageLayout from 'shared/components/layout/PageLayout';
import SectionLayout from 'shared/components/layout/SectionLayout';
import LineDashedSvg from 'shared/components/svg/LineDashedSvg';
import LogoSvg from 'shared/components/svg/LogoSvg';

const FOOTER_DISABLED = [ROUTES.DASHBOARD];
const LINK_CLASS = 'hover:opacity-60 transition-opacity duration-300';

const Footer = () => {
  const env = runtimeEnv();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isAuthenticated = useSelector(getIsAuthenticated);
  const currentUser = useSelector(getUserProfile) || {};

  const [contactUsOpen, setContactUsOpen] = useState(false);

  const instagramLink = env.REACT_APP_INSTAGRAM_LINK;
  const discordLink = env.REACT_APP_DISCORD_LINK;
  const ccPhoneNumber = env.REACT_APP_CC_PHONE_NUMBER;
  const ccAddress = env.REACT_APP_CC_ADDRESS;
  const windowSize = document.documentElement.clientWidth;

  const logoutAction = () => dispatch(logoutInit());
  const tourMessage =
    'Hi Crosscourt, \n\rI would like to visit the club on [DATE] at [TIME (ANYTIME BETWEEN 8PM-10PM M-THU, 6-8PM FRI, 10AM-NOON SAT/SUN)]. \n\rPlease let me know if that works for your team. \n\rThank you';

  if (FOOTER_DISABLED.includes(pathname)) {
    return null;
  }

  return (
    <>
      <PageLayout noPadding>
        <footer className="bg-cc-blue-900 relative">
          <LineDashedSvg className="text-cc-purple absolute top-0 right-0 w-full md:w-1/2" />
          <SectionLayout as="div" className="pt-20 pb-10 sm:pb-20">
            <div className="lg:flex">
              <div className="w-full mb-10 lg:mb-0">
                <LogoSvg className="w-72 mb-8" />
                <div>
                  <a
                    href={discordLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${LINK_CLASS} mr-5`}
                  >
                    <FontAwesomeIcon icon={faDiscord} size="2x" />
                  </a>
                  <a
                    href={instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={LINK_CLASS}
                  >
                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                  </a>
                </div>
              </div>
              <div className="w-full">
                <a
                  href="/crosscourt-member-handbook.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${LINK_CLASS} block sm:w-max font-shapiro95_super_wide text-2xl mb-6`}
                >
                  Download Member Handbook
                  <FontAwesomeIcon icon={faFileArrowDown} className="text-2xl ml-3" />
                </a>
                <div className="md:flex w-full text-sm">
                  <div className="w-full mb-8 md:mb-0">
                    <Link to={ROUTES.HOME} className={`${LINK_CLASS} block w-max mb-3`}>
                      Home
                    </Link>
                    <Link to={ROUTES.WHY_JOIN} className={`${LINK_CLASS} block w-max mb-3`}>
                      Why Join
                    </Link>
                    <Link to={ROUTES.MEMBERSHIPS} className={`${LINK_CLASS} block w-max mb-3`}>
                      Memberships
                    </Link>
                    {isAuthenticated ? (
                      <span
                        onClick={() => logoutAction()}
                        className={`${LINK_CLASS} block w-max cursor-pointer`}
                      >
                        Logout
                      </span>
                    ) : (
                      <Link to={ROUTES.LOGIN} className={`${LINK_CLASS} block w-max`}>
                        Login
                      </Link>
                    )}
                  </div>
                  <div className="w-full mb-8 md:mb-0">
                    <span
                      onClick={() => openContactFormForUser(currentUser)}
                      className={`${LINK_CLASS} block w-max cursor-pointer mb-3`}
                    >
                      Contact
                    </span>
                    <Link to={ROUTES.CAREERS} className={`${LINK_CLASS} block w-max mb-3`}>
                      Join the Team
                    </Link>
                    <Link to={ROUTES.CONTENT} className={`${LINK_CLASS} block w-max mb-3`}>
                      How to use Pixellot
                    </Link>
                    <span
                      onClick={() => openContactFormForUser(currentUser)}
                      className={`${LINK_CLASS} block w-max cursor-pointer mb-3`}
                    >
                      Private Rentals
                    </span>
                    <Link to={ROUTES.FAQ} className={`${LINK_CLASS} block w-max`}>
                      FAQ
                    </Link>
                  </div>
                  <div className="w-full">
                    <span
                      onClick={() => openContactFormForUser(currentUser, tourMessage)}
                      className={`${LINK_CLASS} block w-max cursor-pointer mb-3`}
                    >
                      Schedule Tour
                    </span>
                    <a
                      href={`sms:+1${ccPhoneNumber.replace(/-|\s|\(|\)/g, '')}`}
                      className={LINK_CLASS}
                    >
                      Text {ccPhoneNumber}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SectionLayout>
          <SectionLayout as="div" className="bg-black text-center text-xs py-6">
            <span className="block md:inline-block mb-1 md:mb-0">
              {`${new Date().getFullYear()}`} &reg; Crosscourt
            </span>
            <span className="hidden md:inline-block mx-2">/</span>
            <span className="block md:inline-block mb-1 md:mb-0">{ccAddress}</span>
            <span className="hidden md:inline-block mx-2">/</span>
            <Link to={ROUTES.TERMS} className="text-cc-purple hover:underline">
              Terms and conditions
            </Link>
            <span className="mx-2">/</span>
            <Link to={ROUTES.PRIVACY_POLICY} className="text-cc-purple hover:underline">
              Privacy policy
            </Link>
          </SectionLayout>
        </footer>
      </PageLayout>
      <CheeseburgerMenu
        width={windowSize < 768 ? windowSize : windowSize / 3}
        right
        isOpen={contactUsOpen}
        closeCallback={() => setContactUsOpen(false)}
      >
        <div className="hidden open-contact-us-form" onClick={() => setContactUsOpen(true)} />
        <div className="p-4 mt-10 contact-us-form">
          <div className="elfsight-app-0ed6048f-8715-4cd0-a3b0-1da4299c9136" />
        </div>
      </CheeseburgerMenu>
    </>
  );
};

export default Footer;
