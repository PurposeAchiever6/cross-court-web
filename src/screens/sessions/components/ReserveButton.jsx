import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import PropTypes from 'prop-types';

import { getIsAuthenticated } from 'screens/auth/reducer';
import { isPast } from 'shared/utils/date';
import { getUserProfile } from 'screens/my-account/reducer';
import { initialLoadInit } from 'screens/payment-methods/actionCreators';
import { getSelectedCard } from 'screens/payment-methods/reducer';
import { isUserInFirstFreeSessionFlow } from 'shared/utils/user';
import ROUTES from 'shared/constants/routes';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import OnboardingTour from 'shared/components/OnboardingTour';
import { isOnboardingTourEnable } from 'shared/utils/onboardingTour';

import { getSessionDate } from '../reducer';

const ReserveButton = ({
  reserveSessionAction,
  session,
  signupBookSessionAction,
  createAndReserveFreeSessionHandler,
  disabled,
}) => {
  const env = runtimeEnv();

  const dispatch = useDispatch();
  const history = useHistory();

  const isAuthenticated = useSelector(getIsAuthenticated);
  const sessionDate = useSelector(getSessionDate);
  const userProfile = useSelector(getUserProfile);
  const selectedCard = useSelector(getSelectedCard);

  const isFSFFlow = isUserInFirstFreeSessionFlow(userProfile);

  useEffect(() => {
    dispatch(initialLoadInit());
  }, [dispatch]);

  const reservationHandler = () => {
    if (!selectedCard && isFSFFlow) {
      window.localStorage.setItem('redirect', window.location.pathname);
      history.push(ROUTES.PAYMENT_METHODS);
    } else {
      if (!userProfile.unlimitedCredits && userProfile.totalCredits === 0) {
        window.localStorage.setItem('redirect', window.location.pathname);
        history.push({
          pathname: ROUTES.MEMBERSHIPS,
          state: { showNoCreditsAnimation: true },
        });
      } else if (isFSFFlow) {
        createAndReserveFreeSessionHandler();
      } else {
        reserveSessionAction();
      }
    }
  };

  if (isAuthenticated) {
    if (!session?.userSession && !session?.full) {
      return (
        <>
          <PrimaryButton
            className="mb-4"
            id="session-confirm-reservation"
            onClick={reservationHandler}
            disabled={disabled || isPast(sessionDate)}
          >
            CONFIRM RESERVATION
          </PrimaryButton>
          <OnboardingTour
            id="onboarding-tour-session-confirm-reservation"
            enabled={
              isFSFFlow && isOnboardingTourEnable('onboarding-tour-session-confirm-reservation')
            }
            steps={[
              {
                element: '#session-confirm-reservation',
                intro: `You’re s’close. Tap <strong>CONFIRM RESERVATION</strong> to hold your spot. Then enter your payment info and your first session is officially booked. Don’t worry, your card won’t be charged unless you miss your session or cancel within 5 hours of your session starting ($${env.REACT_APP_FREE_SESSION_CANCELED_OUT_OF_TIME_PRICE} charge).`,
              },
            ]}
          />
        </>
      );
    }
  } else {
    return (
      <>
        <PrimaryButton
          className="mb-4"
          id="session-create-profile"
          onClick={signupBookSessionAction}
        >
          CREATE PROFILE
        </PrimaryButton>
        <OnboardingTour
          id="onboarding-tour-session-create-profile"
          steps={[
            {
              element: '#session-create-profile',
              intro:
                'Your free session credit awaits. Tap <strong>CREATE PROFILE</strong> to enter your information. Then hit <strong>NEXT</strong> to fill out a brief skill assessment survey and finish setting up your profile.',
            },
          ]}
        />
      </>
    );
  }

  return null;
};

ReserveButton.defaultProps = {
  disabled: false,
};

ReserveButton.propTypes = {
  reserveSessionAction: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
  signupBookSessionAction: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default ReserveButton;
