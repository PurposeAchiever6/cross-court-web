import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import { SIGNUP_STATE_COMPLETED } from 'screens/onboarding/constants';
import { completeOnboardingInit } from 'screens/onboarding/actionCreators';
import { getUserProfile } from 'screens/my-account/reducer';
import PageLayout from 'shared/components/layout/PageLayout';
import SectionLayout from 'shared/components/layout/SectionLayout';
import Link from 'shared/components/Link';
import LogoSvg from 'shared/components/svg/LogoSvg';
import gradientEffectBgImg from 'shared/images/backgrounds/gradient-effect-top-right.png';

const OnboardingLayout = ({ disableLink, children }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector(getUserProfile);

  const completeOnboarding = () => {
    dispatch(completeOnboardingInit());
  };

  if (currentUser.signupState === SIGNUP_STATE_COMPLETED) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <PageLayout noPadding>
      <SectionLayout className="pt-12 pb-32 md:pt-24 md:pb-24">
        <img
          src={gradientEffectBgImg}
          alt="cc-basketball-balls"
          className="absolute top-0 inset-x-0 w-full"
        />
        <div className="max-w-screen-lg mx-auto relative">
          <div className="text-center md:text-left mb-5 md:mb-8">
            {disableLink ? (
              <LogoSvg className="inline-block w-56" />
            ) : (
              <Link variant="none" onClick={completeOnboarding}>
                <LogoSvg className="inline-block w-56" />
              </Link>
            )}
          </div>
          <div className="flex">{children}</div>
          <div className="text-xs mt-6">{`${new Date().getFullYear()}`} &reg; Crosscourt</div>
        </div>
      </SectionLayout>
    </PageLayout>
  );
};

OnboardingLayout.defaultProps = {
  disableLink: false,
};

OnboardingLayout.propTypes = {
  disableLink: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default OnboardingLayout;
