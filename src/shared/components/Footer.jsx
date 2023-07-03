import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faDiscord } from '@fortawesome/free-brands-svg-icons';
import CheeseburgerMenu from 'cheeseburger-menu';

import ROUTES from 'shared/constants/routes';
import { reducedPathname, validateEmail } from 'shared/utils/helpers';
import { openContactFormForUser } from 'shared/utils/contactForm';
import { sendMembershipHandbook } from 'screens/my-account/actionCreators';
import { getUserProfile } from 'screens/my-account/reducer';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { logoutInit } from 'screens/auth/actionCreators';
import PageLayout from 'shared/components/layout/PageLayout';
import SectionLayout from 'shared/components/layout/SectionLayout';
import LineDashedSvg from 'shared/components/svg/LineDashedSvg';
import LogoSvg from 'shared/components/svg/LogoSvg';
import Link from 'shared/components/Link';
import InputTextField from 'shared/components/InputTextField';

const FOOTER_DISABLED_ROUTES = [
  ROUTES.ADS,
  ROUTES.DASHBOARD,
  ROUTES.LOGIN,
  ROUTES.ONBOARDING_INTENSITY_LEVEL,
  ROUTES.ONBOARDING_MEMBERSHIPS,
  ROUTES.ONBOARDING_PAYMENT_METHOD,
  ROUTES.ONBOARDING_PERSONAL_DETAILS,
  ROUTES.ONBOARDING_REVIEW,
  ROUTES.SELF_CHECK_IN_SUCCESS,
  ROUTES.SELF_CHECK_IN_ERROR,
  ROUTES.SIGNUP,
  ROUTES.SIGNUP_CONFIRMATION,
  ROUTES.SIGNUP_VERIFICATION,
  '/locations/self-check-in',
  '/locations/self-check-in/confirm',
];

const Footer = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isAuthenticated = useSelector(getIsAuthenticated);
  const currentUser = useSelector(getUserProfile) || {};

  const [contactUsOpen, setContactUsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);

  const instagramLink = import.meta.env.VITE_INSTAGRAM_LINK;
  const discordLink = import.meta.env.VITE_DISCORD_LINK;
  const scheduleTourLink = import.meta.env.VITE_SCHEDULE_TOUR_LINK;
  const ccEmail = import.meta.env.VITE_CC_EMAIL;
  const ccAddress = import.meta.env.VITE_CC_ADDRESS;
  const windowSize = document.documentElement.clientWidth;

  const logoutUser = () => dispatch(logoutInit());

  const sendMembershipHandbookToUser = () => {
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
    } else {
      setEmail('');
      setEmailError(null);
      dispatch(sendMembershipHandbook({ email }));
    }
  };

  if (FOOTER_DISABLED_ROUTES.includes(reducedPathname(pathname))) {
    return null;
  }

  return (
    <>
      <PageLayout noPadding>
        <footer id="page-footer" className="bg-cc-blue-900 relative">
          <LineDashedSvg className="text-cc-purple absolute top-0 right-0 w-full md:w-1/2" />
          <SectionLayout as="div" className="pt-20 pb-10 sm:pb-20">
            <div className="lg:flex">
              <div className="w-full mb-10 lg:mb-0">
                <LogoSvg className="w-64 mb-3" />
                <Link to={`mailto:${ccEmail}`} isExternal className="text-sm inline-block mb-5">
                  {ccEmail}
                </Link>
                <div>
                  <Link
                    to={discordLink}
                    variant="white-opacity"
                    isExternal
                    target="_blank"
                    rel="noreferrer"
                    className="mr-5"
                  >
                    <FontAwesomeIcon icon={faDiscord} size="2x" />
                  </Link>
                  <Link
                    to={instagramLink}
                    variant="white-opacity"
                    isExternal
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                  </Link>
                </div>
              </div>
              <div className="w-full">
                <h4 className="font-shapiro95_super_wide text-2xl mb-2">
                  Download Member Handbook
                </h4>
                <p className="text-sm mb-2">
                  Enter your email to receive an inside look at our Member Handbook.
                </p>
                <InputTextField
                  name="email"
                  variant="expanded"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  formik={false}
                  error={emailError}
                  dark
                  rightIcon
                  icon={
                    <span
                      onClick={sendMembershipHandbookToUser}
                      className="text-cc-purple hover:text-cc-purple-700 cursor-pointer"
                    >
                      Submit
                    </span>
                  }
                  className="mb-6"
                />
                <div className="md:flex w-full text-sm">
                  <div className="w-full mb-8 md:mb-0">
                    <Link to={ROUTES.HOME} variant="white-opacity" className="block w-max mb-3">
                      Home
                    </Link>
                    <Link to={ROUTES.WHY_JOIN} variant="white-opacity" className="block w-max mb-3">
                      Why Join
                    </Link>
                    <Link
                      to={ROUTES.MEMBERSHIPS}
                      variant="white-opacity"
                      className="block w-max mb-3"
                    >
                      Memberships
                    </Link>
                    {isAuthenticated ? (
                      <Link
                        variant="white-opacity"
                        onClick={() => logoutUser()}
                        className="block w-max"
                      >
                        Logout
                      </Link>
                    ) : (
                      <Link to={ROUTES.LOGIN} variant="white-opacity" className="block w-max">
                        Login
                      </Link>
                    )}
                  </div>
                  <div className="w-full mb-8 md:mb-0">
                    <Link to={ROUTES.CAREERS} variant="white-opacity" className="block w-max mb-3">
                      Join the Team
                    </Link>
                    <Link to={ROUTES.CONTENT} variant="white-opacity" className="block w-max mb-3">
                      How to use Pixellot
                    </Link>
                    <Link
                      variant="white-opacity"
                      onClick={() => openContactFormForUser(currentUser)}
                      className="block w-max mb-3"
                    >
                      Private Rentals
                    </Link>
                    <Link to={ROUTES.FAQ} variant="white-opacity" className="block w-max">
                      FAQ
                    </Link>
                  </div>
                  <div className="w-full">
                    <Link
                      variant="white-opacity"
                      isExternal
                      target="_blank"
                      rel="noreferrer"
                      to={scheduleTourLink}
                      className="block w-max mb-3"
                    >
                      Schedule Tour
                    </Link>
                    <Link
                      variant="white-opacity"
                      onClick={() => openContactFormForUser(currentUser)}
                      className="block w-max"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SectionLayout>
          <SectionLayout as="div" className="bg-black text-center text-xs py-6">
            <span className="block md:inline-block mb-1 md:mb-0">
              {`${new Date().getFullYear()}`} &copy; Crosscourt
            </span>
            <span className="hidden md:inline-block mx-2">/</span>
            <span className="block md:inline-block mb-1 md:mb-0">{ccAddress}</span>
            <span className="hidden md:inline-block mx-2">/</span>
            <Link to={ROUTES.TERMS}>Terms and conditions</Link>
            <span className="mx-2">/</span>
            <Link to={ROUTES.PRIVACY_POLICY}>Privacy policy</Link>
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
