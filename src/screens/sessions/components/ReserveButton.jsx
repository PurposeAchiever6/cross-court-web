import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { isNil } from 'ramda';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import PropTypes from 'prop-types';

import { getIsAuthenticated } from 'screens/auth/reducer';
import { isPast, formatSessionTime, formatSessionDate } from 'shared/utils/date';
import { getUserProfile } from 'screens/my-account/reducer';
import { initialLoadInit } from 'screens/payments/actionCreators';
import { getSelectedCard } from 'screens/payments/reducer';
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

  const emailSessionDate = formatSessionDate(sessionDate);
  const sessionTime = formatSessionTime(session.time);
  const mailInfo = `mailto:info@crosscourt.com?subject=Join Waitlist&body=I would like to be added to the waitlist for the ${sessionTime} session on ${emailSessionDate} at ${session.location.name}. Please notify me if a spot opens up. You can reach me at ${userProfile.phoneNumber}.`;

  const isFSFFlow = isUserInFirstFreeSessionFlow(userProfile);

  useEffect(() => {
    dispatch(initialLoadInit());
  }, [dispatch]);

  if (isAuthenticated) {
    if (isNil(session.userSession)) {
      if (session.full) {
        return (
          <a href={mailInfo}>
            <PrimaryButton className="btn-alternative" disabled={disabled}>
              JOIN WAITLIST
            </PrimaryButton>
          </a>
        );
      }
      return (
        <>
          <PrimaryButton
            id="session-confirm-reservation"
            onClick={() => {
              if (!selectedCard && isFSFFlow) {
                window.localStorage.setItem('redirect', window.location.pathname);
                history.push(ROUTES.PAYMENTS);
              } else {
                if (isFSFFlow) {
                  createAndReserveFreeSessionHandler();
                } else {
                  reserveSessionAction();
                }
              }
            }}
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
    } else if (['reserved', 'confirmed'].includes(session.userSession.state)) {
      return <></>;
    }
  } else {
    return (
      <>
        <PrimaryButton
          id="session-create-profile"
          onClick={() => {
            window.localStorage.setItem('redirect', window.location.pathname);
            history.push(ROUTES.SIGNUP);
          }}
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

  return (
    <PrimaryButton inverted onClick={signupBookSessionAction} disabled={disabled}>
      CONFIRM RESERVATION
    </PrimaryButton>
  );
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
