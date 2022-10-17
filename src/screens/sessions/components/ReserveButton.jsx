/* eslint-disable no-lonely-if */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import { hasConfirmCodeOfConduct } from 'shared/utils/codeOfConduct';
import { isPast } from 'shared/utils/date';
import {
  isUserInFirstSessionFlow,
  isUserInFirstFreeSessionFlow,
  userHasCreditsForSession,
} from 'shared/utils/user';
import { isOnboardingTourEnable } from 'shared/utils/onboardingTour';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import { getSelectedCard } from 'screens/payment-methods/reducer';
import { getSessionDate } from 'screens/sessions/reducer';
import { initialLoadInit } from 'screens/payment-methods/actionCreators';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import OnboardingTour from 'shared/components/OnboardingTour';
import CodeOfConductModal from 'screens/sessions/components/modals/CodeOfConductModal';
import FirstTimersInformationModal from 'screens/sessions/components/modals/FirstTimersInformationModal';
import OpenClubNonMembersModal from 'screens/sessions/components/modals/OpenClubNonMembersModal';

import { WOMEN_SESSION_TOOLTIP } from 'shared/constants/sessions';

import Tooltip from 'shared/components/Tooltip';

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

  const [showCodeOfConductModal, setShowCodeOfConductModal] = useState(false);
  const [showFirstTimersInformationModal, setShowFirstTimersInformationModal] = useState(false);
  const [showOpenClubNonMembersModal, setShowOpenClubNonMembersModal] = useState(false);

  const isFirstSessionFlow = isUserInFirstSessionFlow(userProfile);
  const isFirstFreeSessionFlow = isUserInFirstFreeSessionFlow(userProfile);
  const userHasActiveSubscription = !!userProfile.activeSubscription;

  useEffect(() => {
    dispatch(initialLoadInit());
  }, [dispatch]);

  const reservationHandler = () => {
    if (!userHasActiveSubscription && session?.isOpenClub) {
      setShowOpenClubNonMembersModal(true);
      return;
    }

    if (!selectedCard && isFirstFreeSessionFlow) {
      window.localStorage.setItem('redirect', window.location.pathname);
      history.push(ROUTES.PAYMENT_METHODS_SELECT);
    } else {
      if (!userHasCreditsForSession(userProfile, session)) {
        window.localStorage.setItem('redirect', window.location.pathname);
        history.push({
          pathname: ROUTES.MEMBERSHIPS,
          state: { showNoCreditsAnimation: true },
        });
      } else if (isFirstSessionFlow) {
        setShowCodeOfConductModal(true);
      } else {
        hasConfirmCodeOfConduct(userProfile)
          ? reserveSessionAction()
          : setShowCodeOfConductModal(true);
      }
    }
  };

  const onConfirmCodeOfConduct = () => {
    if (isFirstSessionFlow) {
      setShowCodeOfConductModal(false);
      setShowFirstTimersInformationModal(true);
    } else {
      reserveSessionAction();
    }
  };

  const onConfirmFirstTimersInformation = () => {
    isFirstFreeSessionFlow ? createAndReserveFreeSessionHandler() : reserveSessionAction();
  };

  if (isAuthenticated) {
    if (!session?.userSession && !session?.full) {
      return (
        <>
          {session?.isOpenClub && (
            <p className="text-xs mb-6">
              Booking Open Club does not take away any of your session credits
            </p>
          )}
          <Tooltip
            variant="black"
            place="top"
            enable={session?.womenOnly}
            tooltip={WOMEN_SESSION_TOOLTIP}
          >
            <PrimaryButton
              id="session-confirm-reservation"
              onClick={reservationHandler}
              disabled={disabled || isPast(sessionDate)}
            >
              CONFIRM RESERVATION
            </PrimaryButton>
          </Tooltip>
          {session?.womenOnly && (
            <p className="text-xs md:hidden mt-8 px-8">{WOMEN_SESSION_TOOLTIP}</p>
          )}
          <OnboardingTour
            id="onboarding-tour-session-confirm-reservation"
            enabled={
              isFirstSessionFlow &&
              isOnboardingTourEnable('onboarding-tour-session-confirm-reservation')
            }
            steps={[
              {
                element: '#session-confirm-reservation',
                intro: `You’re s’close. Press <strong>CONFIRM RESERVATION</strong> to hold your spot. ${
                  isFirstFreeSessionFlow
                    ? `First you'll need to enter your payment info and then you'll be ready to book your first session! Don’t worry, your card won’t be charged unless you miss your session or cancel within 5 hours of your session starting ($${env.REACT_APP_FREE_SESSION_CANCELED_OUT_OF_TIME_PRICE} charge).`
                    : `${
                        userProfile.totalCredits === 0
                          ? 'Due to your location, you are not eligible for a free trial session, but because is your first time, you can buy a session at a discounted price.'
                          : ''
                      } `
                }`,
              },
            ]}
          />
          <CodeOfConductModal
            isOpen={showCodeOfConductModal}
            closeHandler={() => setShowCodeOfConductModal(false)}
            onConfirm={onConfirmCodeOfConduct}
            userProfile={userProfile}
          />
          <OpenClubNonMembersModal
            isOpen={showOpenClubNonMembersModal}
            closeHandler={() => setShowOpenClubNonMembersModal(false)}
          />
          <FirstTimersInformationModal
            isOpen={showFirstTimersInformationModal}
            onConfirm={onConfirmFirstTimersInformation}
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
                'Your free session credit awaits. Tap <strong>CREATE PROFILE</strong> to enter your information and set up your profile.',
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
  createAndReserveFreeSessionHandler: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default ReserveButton;
