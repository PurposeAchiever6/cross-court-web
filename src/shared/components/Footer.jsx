import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

import ROUTES from 'shared/constants/routes';
import { validateEmail } from 'shared/utils/helpers';
import { openContactFormForUser } from 'shared/utils/contactForm';
import { stayInTheLoop } from 'shared/utils/activeCampaign';
import { getUserProfile } from 'screens/my-account/reducer';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { logoutInit } from 'screens/auth/actionCreators';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import ccLogo from 'shared/images/cc-logo.png';
import LogoSvg from 'shared/components/svg/LogoSvg';
import ArrowRightSvg from 'shared/components/svg/ArrowRightSvg';

const Copyright = ({ className }) => {
  return (
    <div className={`flex mt-6 md:mt-10 justify-between items-end ${className}`}>
      <div className="flex flex-col text-2xs md:text-xs">
        <p>
          {`Copyright`} &reg; {`${new Date().getFullYear()}`} Crosscourt
        </p>
        <p>333 N. Mission Rd Los Angeles CA 90033</p>
      </div>
      <img alt="" className="w-12" src={ccLogo} />
    </div>
  );
};

const Footer = () => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const env = runtimeEnv();
  const { pathname } = useLocation();
  const currentUser = useSelector(getUserProfile) || {};
  const [email, setEmail] = useState('');
  const [showError, setShowError] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const logoutAction = () => dispatch(logoutInit());

  const INSTAGRAM_LINK = env.REACT_APP_INSTAGRAM_LINK;

  const tourMessage = (isAuthenticated) =>
    `Hi Crosscourt, \n\rI would like to visit the club on [DATE] at [TIME (ANYTIME BETWEEN 8PM-10PM M-THU, 6-8PM FRI, 10AM-NOON SAT/SUN)]. Please let me know if that works for your team. \n\rThank you${
      isAuthenticated ? `, \n\r${currentUser.firstName}` : ''
    }`;

  const addUserToKlaviyo = () => {
    if (email) {
      const isValid = validateEmail(email);
      setShowError(!isValid);
      if (isValid) {
        stayInTheLoop({ email });
        setShowError(!isValid);
        setSuccess(true);
      }
    }
  };

  return pathname === ROUTES.DASHBOARD ? null : (
    <>
      <footer className="flex flex-col md:flex-row-reverse justify-evenly md:justify-between bg-cc-black px-4 py-8 md:p-12  text-white h-164 md:h-124 border-t border-gray-400 border-opacity-20">
        <div className="md:w-1/2 flex flex-col h-full justify-evenly md:justify-between">
          <LogoSvg className="w-72" />
          {!isAuthenticated && (
            <>
              <p className="font-shapiro95_super_wide">
                {success ? "YOU'RE IN!" : 'STAY IN THE LOOP'}
              </p>
              {!success && (
                <div className="flex border border-white p-2 md:w-4/5 justify-between">
                  <input
                    type="text"
                    className="bg-cc-black w-full px-2 text-xs md:text-sm"
                    placeholder="ENTER YOUR EMAIL ADDRESS"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  <div
                    className="bg-cc-purple p-3 cursor-pointer"
                    onClick={() => addUserToKlaviyo()}
                  >
                    <ArrowRightSvg className="text-white w-6" />
                  </div>
                </div>
              )}
              {success && (
                <div className="flex">
                  <PrimaryButton
                    bg="transparent"
                    className="mr-4"
                    contentClasses="text-2xs md:text-sm"
                    onClick={() =>
                      openContactFormForUser(
                        isAuthenticated ? currentUser : { email },
                        tourMessage(isAuthenticated)
                      )
                    }
                  >
                    SCHEDULE TOUR
                  </PrimaryButton>
                  <PrimaryButton contentClasses="text-2xs md:text-sm" to={ROUTES.LOCATIONS}>
                    FIRST FREE
                  </PrimaryButton>
                </div>
              )}
            </>
          )}
          <div className="relative">
            {showError && (
              <p className="text-xs text-red-500 absolute -bottom-1 md:bottom-auto">
                Email address is not valid
              </p>
            )}
          </div>
          <Copyright className="hidden md:flex mt-8" />
        </div>
        <div className="flex flex-col justify-between text-sm md:text-base">
          <Link className="w-max hover:opacity-60 transition-opacity duration-300" to={ROUTES.FAQ}>
            FAQ
          </Link>
          <Link
            className="w-max hover:opacity-60 transition-opacity duration-300"
            to={ROUTES.CONTENT}
          >
            CONTENT
          </Link>
          <Link
            className="w-max hover:opacity-60 transition-opacity duration-300"
            to={ROUTES.HOWITWORKS}
          >
            HOW IT WORKS
          </Link>
          <Link
            className="w-max hover:opacity-60 transition-opacity duration-300"
            to={ROUTES.CAREERS}
          >
            JOIN THE TEAM
          </Link>
          <p
            className="cursor-pointer w-max hover:opacity-60 transition-opacity duration-300"
            onClick={() => openContactFormForUser(currentUser)}
          >
            CONTACT US
          </p>
          <p
            className="cursor-pointer w-max hover:opacity-60 transition-opacity duration-300"
            onClick={() => openContactFormForUser(currentUser)}
          >
            PRIVATE SESSIONS / CLUB RENTALS
          </p>
          <p
            className="cursor-pointer w-max hover:opacity-60 transition-opacity duration-300"
            onClick={() => openContactFormForUser(currentUser)}
          >
            TOUR THE CLUB
          </p>
          <Link
            className="w-max hover:opacity-60 transition-opacity duration-300"
            to={ROUTES.GALLERY}
          >
            GALLERY
          </Link>
          {isAuthenticated ? (
            <p
              className="mt-4 cursor-pointer w-max hover:opacity-60 transition-opacity duration-300"
              onClick={() => logoutAction()}
            >
              LOGOUT
            </p>
          ) : (
            <>
              <Link
                className="mt-4 w-max hover:opacity-60 transition-opacity duration-300"
                to={ROUTES.SIGNUP}
              >
                SIGN UP
              </Link>
              <Link
                className="w-max hover:opacity-60 transition-opacity duration-300"
                to={ROUTES.LOGIN}
              >
                LOGIN
              </Link>
            </>
          )}

          <a
            className="my-8 w-max hover:opacity-60 transition-opacity duration-300 h-full"
            href={INSTAGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <Link
            className="w-max hover:opacity-60 transition-opacity duration-300 text-2xs"
            to={ROUTES.TERMS}
          >
            TERMS AND CONDITIONS
          </Link>
          <Link
            className="w-max hover:opacity-60 transition-opacity duration-300 text-2xs"
            to={ROUTES.PRIVACY_POLICY}
          >
            PRIVACY POLICY
          </Link>
          <Copyright className="md:hidden" />
        </div>
      </footer>
      <div
        className="elfsight-app-0ed6048f-8715-4cd0-a3b0-1da4299c9136"
        style={{ position: 'fixed' }}
      />
    </>
  );
};

export default Footer;
