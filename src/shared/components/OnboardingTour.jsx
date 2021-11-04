import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import 'intro.js/introjs.css';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { isOnboardingTourEnable, disableOnboardingTour } from 'shared/utils/onboardingTour';
import { Steps } from 'intro.js-react';

const OnboardingTour = ({ id, enabled, steps, initialStep, timeout, onExit }) => {
  const [show, setShow] = useState(false);

  const isAuthenticated = useSelector(getIsAuthenticated);

  const isEnabled = enabled ?? (!isAuthenticated && isOnboardingTourEnable(id));

  const exitCallback = () => {
    if (onExit) {
      onExit();
    } else {
      disableOnboardingTour(id);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, timeout);
  }, [timeout]);

  return (
    show && (
      <Steps
        enabled={isEnabled}
        steps={steps.map((step) => ({
          position: 'bottom',
          tooltipClass: 'onboarding-tour-tooltip',
          highlightClass: 'onboarding-tour-highlight',
          ...step,
        }))}
        initialStep={initialStep}
        onExit={exitCallback}
        options={{
          showButtons: false,
          showBullets: false,
          disableInteraction: false,
          exitOnOverlayClick: true,
        }}
      />
    )
  );
};

OnboardingTour.defaultProps = {
  initialStep: 0,
  timeout: 750,
  onExit: null,
  enabled: null,
};

OnboardingTour.propTypes = {
  id: PropTypes.string.isRequired,
  steps: PropTypes.arrayOf(PropTypes.shape).isRequired,
  initialStep: PropTypes.number,
  timeout: PropTypes.number,
  onExit: PropTypes.func,
  enabled: PropTypes.bool,
};

export default OnboardingTour;
