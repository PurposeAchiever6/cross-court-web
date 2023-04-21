import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import toast from 'shared/utils/toast';
import { isOnboardingTourEnable } from 'shared/utils/onboardingTour';
import { hasConfirmCodeOfConduct } from 'shared/utils/codeOfConduct';
import {
  userHasCreditsForSession,
  isUserInFirstFreeSessionFlow,
  isUserInFirstSessionFlow,
} from 'shared/utils/user';
import { validateBooking } from 'screens/sessions/utils';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import { getSessionsLoadingBtns, getShowWaitlistModal } from 'screens/sessions/reducer';
import { getSelectedCard } from 'screens/payment-methods/reducer';
import { createAndReserveFreeSessionInit } from 'screens/checkout/actionCreators';
import {
  reserveSessionInit,
  signupBookSession,
  cancelSessionInit,
  joinSessionWaitlistInit,
  removeSessionWaitlistInit,
  showWaitlistModal as showWaitlistModalAction,
  closeWaitlistModal as closeWaitlistModalAction,
} from 'screens/sessions/actionCreators';
import HeaderAction from 'shared/components/HeaderAction';
import OnboardingTour from 'shared/components/OnboardingTour';
import CodeOfConductModal from 'screens/sessions/components/modals/CodeOfConductModal';
import FirstTimersInformationModal from 'screens/sessions/components/modals/FirstTimersInformationModal';
import OpenClubGoalsModal from 'screens/sessions/components/modals/OpenClubGoalsModal';
import WaitlistModal from 'screens/sessions/components/modals/WaitlistModal';
import ScoutingModal from 'screens/sessions/components/modals/ScoutingModal';
import CancelModal from 'screens/sessions/components/modals/CancelModal';

const SHOOTING_MACHINE_GOAL = 'SM';

const SessionHeaderAction = ({ session, date }) => {
  const SESSION_CANCELED_OUT_OF_TIME_PRICE = import.meta.env
    .VITE_FREE_SESSION_CANCELED_OUT_OF_TIME_PRICE;

  const history = useHistory();
  const dispatch = useDispatch();

  const {
    id,
    normalSession,
    past,
    reserved,
    onWaitlist,
    full,
    waitlistPlacement,
    shootingMachines,
  } = session;

  const isAuthenticated = useSelector(getIsAuthenticated);
  const currentUser = useSelector(getUserProfile);
  const showWaitlistModal = useSelector(getShowWaitlistModal) === id;
  const selectedCard = useSelector(getSelectedCard);
  const loadingButton = useSelector(getSessionsLoadingBtns).includes(id);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showCodeOfConductModal, setShowCodeOfConductModal] = useState(false);
  const [showFirstTimersInformationModal, setShowFirstTimersInformationModal] = useState(false);
  const [showOpenClubGoalsModal, setShowOpenClubGoalsModal] = useState(false);
  const [showScoutingModal, setShowScoutingModal] = useState(false);
  const [openClubGoal, setOpenClubGoal] = useState(null);
  const [shootingMachineIds, setShootingMachineIds] = useState([]);
  const [scouting, setScouting] = useState(false);

  const isFirstFreeSessionFlow = isUserInFirstFreeSessionFlow(currentUser);
  const isFirstSessionFlow = isUserInFirstSessionFlow(currentUser);

  const sessionShootingMachines = shootingMachines.map((shootingMachine) => ({
    ...shootingMachine,
    inputChecked: shootingMachineIds.includes(shootingMachine.id),
  }));

  const setShowWaitlistModal = (show) => {
    show ? dispatch(showWaitlistModalAction(id)) : dispatch(closeWaitlistModalAction());
  };

  const setShootingMachine = (shootingMachineId) => {
    if (!shootingMachineId) {
      setShootingMachineIds([]);
      return;
    }

    if (shootingMachineIds.includes(shootingMachineId)) {
      const newShootingMachineIds = shootingMachineIds.filter(
        (currentShootingMachineId) => currentShootingMachineId !== shootingMachineId
      );

      if (!newShootingMachineIds.length) {
        setOpenClubGoal(null);
      }
      setShootingMachineIds(newShootingMachineIds);
    } else {
      setOpenClubGoal(SHOOTING_MACHINE_GOAL);
      setShootingMachineIds([...shootingMachineIds, shootingMachineId]);
    }
  };

  const signupForSession = () => {
    dispatch(signupBookSession(id, date));
  };

  const removeFromWaitlist = () => {
    dispatch(removeSessionWaitlistInit(id, date));
  };

  const joinWaitlist = () => {
    if (!userHasCreditsForSession(currentUser, session)) {
      return history.push({
        pathname: ROUTES.MEMBERSHIPS,
        state: { showNoCreditsAnimation: true },
      });
    }

    dispatch(joinSessionWaitlistInit(id, date));
  };

  const cancelSession = () => {
    dispatch(cancelSessionInit(session.userSession.id));
  };

  const bookSession = ({
    skipCodeOfConductModal,
    skipOpenClubGoalsModal,
    skipFirstTimersInformationModal,
    skipScoutingModal,
  } = {}) => {
    if (!selectedCard && isFirstFreeSessionFlow) {
      window.localStorage.setItem('redirect', window.location.pathname);
      history.push(ROUTES.PAYMENT_METHODS_SELECT);
      return;
    }

    if (!userHasCreditsForSession(currentUser, session)) {
      window.localStorage.setItem('redirect', window.location.pathname);
      history.push({ pathname: ROUTES.MEMBERSHIPS, state: { showNoCreditsAnimation: true } });
      return;
    }

    const { canBook, errorTitle, errorDescription } = validateBooking(session, currentUser);

    if (!canBook) {
      toast.error({ title: errorTitle, description: errorDescription });
      return;
    }

    if ((isFirstSessionFlow || !hasConfirmCodeOfConduct(currentUser)) && !skipCodeOfConductModal) {
      setShowCodeOfConductModal(true);
      return;
    }

    if (session.isOpenClub && !skipOpenClubGoalsModal) {
      setShowOpenClubGoalsModal(true);
      return;
    }

    if (normalSession && currentUser.scoutingCredits > 0 && !skipScoutingModal) {
      setShowScoutingModal(true);
      return;
    }

    if (isFirstSessionFlow && !skipFirstTimersInformationModal) {
      setShowFirstTimersInformationModal(true);
      return;
    }

    const referralCode = window.localStorage.getItem('referralCode');
    const redirectTo = isFirstSessionFlow ? ROUTES.FIRSTSESSIONRESERVED : ROUTES.SESSIONRESERVED;
    const payload = {
      sessionId: id,
      date,
      referralCode,
      redirectTo,
      goal: openClubGoal,
      shootingMachineIds,
      scouting,
    };

    isFirstFreeSessionFlow
      ? dispatch(createAndReserveFreeSessionInit(payload))
      : dispatch(reserveSessionInit(payload));
  };

  const onConfirmCodeOfConduct = () => {
    setShowCodeOfConductModal(false);
    bookSession({ skipCodeOfConductModal: true });
  };

  const onConfirmOpenClubGoal = () => {
    setShowOpenClubGoalsModal(false);
    bookSession({ skipCodeOfConductModal: true, skipOpenClubGoalsModal: true });
  };

  const onConfirmScouting = () => {
    setShowScoutingModal(false);
    bookSession({
      skipCodeOfConductModal: true,
      skipOpenClubGoalsModal: true,
      skipScoutingModal: true,
    });
  };

  const onConfirmFirstTimersInformation = () => {
    setShowFirstTimersInformationModal(false);
    bookSession({
      skipCodeOfConductModal: true,
      skipOpenClubGoalsModal: true,
      skipScoutingModal: true,
      skipFirstTimersInformationModal: true,
    });
  };

  const confirmData = (() => {
    if (past) {
      return {
        text: 'Find New',
        action: () => history.push(ROUTES.LOCATIONS),
        variant: 'purple',
      };
    }

    if (!isAuthenticated) {
      return {
        text: 'Create Profile',
        action: signupForSession,
        variant: 'purple',
        id: 'session-create-profile',
        onboardingTour: (
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
        ),
      };
    }

    if (reserved) {
      return {
        text: 'Cancel Booking',
        action: () => setShowCancelModal(true),
        variant: 'red',
      };
    }

    if (onWaitlist) {
      return {
        text: 'On Waitlist',
        action: () => setShowWaitlistModal(true),
        variant: 'purple',
      };
    }

    if (full) {
      return {
        text: 'Join Waitlist',
        action: joinWaitlist,
        variant: 'purple',
      };
    }

    return {
      text: 'Confirm Booking',
      action: bookSession,
      variant: 'purple',
      id: 'session-confirm-reservation',
      onboardingTour: (
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
                  ? `First you'll need to enter your payment info and then you'll be ready to book your first session! Don’t worry, your card won’t be charged unless you miss your session or cancel within 5 hours of your session starting ($${SESSION_CANCELED_OUT_OF_TIME_PRICE} charge).`
                  : `${
                      currentUser.totalCredits === 0
                        ? 'Due to your location, you are not eligible for a free trial session, but because is your first time, you can buy a session at a discounted price.'
                        : ''
                    } `
              }`,
            },
          ]}
        />
      ),
    };
  })();

  return (
    <>
      <HeaderAction
        confirmText={confirmData.text}
        onConfirm={confirmData.action}
        confirmVariant={confirmData.variant}
        confirmId={confirmData.id}
        confirmLoading={loadingButton}
        cancelText="Back"
        onCancel={() => history.push(ROUTES.LOCATIONS)}
      />
      {confirmData.onboardingTour}
      <CodeOfConductModal
        isOpen={showCodeOfConductModal}
        closeHandler={() => setShowCodeOfConductModal(false)}
        onConfirm={onConfirmCodeOfConduct}
        user={currentUser}
      />
      <OpenClubGoalsModal
        isOpen={showOpenClubGoalsModal}
        closeHandler={() => setShowOpenClubGoalsModal(false)}
        onConfirm={onConfirmOpenClubGoal}
        openClubGoal={openClubGoal}
        setOpenClubGoal={setOpenClubGoal}
        shootingMachines={sessionShootingMachines}
        setShootingMachineId={setShootingMachine}
      />
      <ScoutingModal
        isOpen={showScoutingModal}
        closeHandler={() => setShowScoutingModal(false)}
        scouting={scouting}
        setScouting={setScouting}
        onConfirm={onConfirmScouting}
      />
      <FirstTimersInformationModal
        isOpen={showFirstTimersInformationModal}
        onConfirm={onConfirmFirstTimersInformation}
      />
      <WaitlistModal
        isOpen={showWaitlistModal}
        closeHandler={() => setShowWaitlistModal(false)}
        waitlistPlacement={waitlistPlacement}
        removeFromWaitlist={removeFromWaitlist}
      />
      <CancelModal
        isOpen={showCancelModal}
        closeHandler={() => setShowCancelModal(false)}
        cancelSessionAction={cancelSession}
        sessionInfo={session}
        unlimitedCredits={currentUser.unlimitedCredits}
      />
    </>
  );
};

SessionHeaderAction.propTypes = {
  session: PropTypes.shape().isRequired,
  date: PropTypes.string.isRequired,
};

export default SessionHeaderAction;
