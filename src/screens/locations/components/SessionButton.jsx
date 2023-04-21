import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import { ordinalSuffix } from 'shared/utils/helpers';
import { urlFormattedDate } from 'shared/utils/date';
import {
  userHasCreditsForSession,
  userOutsideOfSessionSkillLevel,
  isUserInFirstSessionFlow,
  isUserInFirstFreeSessionFlow,
} from 'shared/utils/user';
import toast from 'shared/utils/toast';
import { isOnboardingTourEnable } from 'shared/utils/onboardingTour';
import { hasConfirmOutsideOfSkillLevelSession } from 'shared/utils/outsideOfSkillLevel';
import { hasConfirmSkillSession } from 'shared/utils/skillSessionsConfirmations';
import { hasConfirmWomenOnlySessions } from 'shared/utils/womenOnlySessionsConfirmations';
import { validateBooking } from 'screens/sessions/utils';
import {
  joinSessionWaitlistInit,
  removeSessionWaitlistInit,
  showWaitlistModal as showWaitlistModalAction,
  closeWaitlistModal as closeWaitlistModalAction,
} from 'screens/sessions/actionCreators';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import { getSessionsLoadingBtns, getShowWaitlistModal } from 'screens/sessions/reducer';
import CheckSvg from 'shared/components/svg/CheckSvg';
import Button from 'shared/components/Button';
import OnboardingTour from 'shared/components/OnboardingTour';
import WomenOnlyReservationModal from 'screens/locations/components/modals/WomenOnlyReservationModal';
import OutsideOfSkillLevelModal from 'screens/locations/components/modals/OutsideOfSkillLevelModal';
import SkillSessionReservationModal from 'screens/locations/components/modals/SkillSessionReservationModal';
import WaitlistModal from 'screens/sessions/components/modals/WaitlistModal';

const SessionButton = ({ session, showingFreeSessionCreditAdded, className }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    id,
    startTime,
    comingSoon,
    reserved,
    past,
    full,
    onWaitlist,
    waitlistPlacement,
    womenOnly,
    isOpenClub,
    skillSession,
    skillLevel,
  } = session;

  const isAuthenticated = useSelector(getIsAuthenticated);
  const currentUser = useSelector(getUserProfile);
  const loading = useSelector(getSessionsLoadingBtns).includes(id);
  const showWaitlistModal = useSelector(getShowWaitlistModal) === id;

  const [onboardingTourEnable, setOnboardingTourEnable] = useState(true);
  const [showWomenOnlyReservationlModal, setShowWomenOnlyReservationlModal] = useState(false);
  const [showOutsideSkillLevelModal, setShowOutsideSkillLevelModal] = useState(false);
  const [showSkillSessionReservationModal, setShowSkillSessionReservationModal] = useState(false);

  const URLdate = urlFormattedDate(startTime);
  const onboardingTourId = 'onboarding-tour-sessions-list';
  const isFirstSessionFreeFlow = isUserInFirstFreeSessionFlow(currentUser);
  const isFirstSessionFlow = isUserInFirstSessionFlow(currentUser);
  const isOnboardingTourEnabled =
    onboardingTourEnable &&
    isOnboardingTourEnable(onboardingTourId) &&
    !showingFreeSessionCreditAdded &&
    (!isAuthenticated || isFirstSessionFlow);

  const setShowWaitlistModal = (show) => {
    show ? dispatch(showWaitlistModalAction(id)) : dispatch(closeWaitlistModalAction());
  };

  const removeFromWaitlist = () => {
    dispatch(removeSessionWaitlistInit(id, startTime));
  };

  const joinWaitlist = () => {
    if (!isAuthenticated) {
      return history.push(ROUTES.LOGIN);
    }

    if (!userHasCreditsForSession(currentUser, session)) {
      return history.push({
        pathname: ROUTES.MEMBERSHIPS,
        state: { showNoCreditsAnimation: true },
      });
    }

    dispatch(joinSessionWaitlistInit(id, startTime));
  };

  const goToSessionDetails = () => history.push(`/session/${id}/${URLdate}`);

  const bookSession = ({
    skipWomenOnlyReservationModal,
    skipOutsideSkillLevelModal,
    skipSkillSessionReservationModal,
  } = {}) => {
    const shouldShowWomenOnlyReservationModal =
      !skipWomenOnlyReservationModal &&
      womenOnly &&
      currentUser.gender === 'male' &&
      !hasConfirmWomenOnlySessions(currentUser);

    const shouldShowOutsideSkillLevelModal =
      !skipOutsideSkillLevelModal &&
      !isOpenClub &&
      !skillSession &&
      userOutsideOfSessionSkillLevel(currentUser, session) &&
      !hasConfirmOutsideOfSkillLevelSession(currentUser);

    const shouldShowSkillSessionReservationModal =
      !skipSkillSessionReservationModal && skillSession && !hasConfirmSkillSession(currentUser);

    setOnboardingTourEnable(false);

    const { canBook, errorTitle, errorDescription } = validateBooking(session, currentUser);

    if (!canBook) {
      toast.error({ title: errorTitle, description: errorDescription });
      return;
    }

    if (shouldShowWomenOnlyReservationModal) {
      setShowWomenOnlyReservationlModal(true);
    } else if (shouldShowOutsideSkillLevelModal) {
      setShowWomenOnlyReservationlModal(false);
      setShowOutsideSkillLevelModal(true);
    } else if (shouldShowSkillSessionReservationModal) {
      setShowWomenOnlyReservationlModal(false);
      setShowOutsideSkillLevelModal(false);
      setShowSkillSessionReservationModal(true);
    } else {
      goToSessionDetails();
    }
  };

  const buttonData = (() => {
    if (reserved) {
      return {
        text: 'View Details',
        variant: 'outline-purple',
        additionalInfo: (
          <div className="flex justify-center items-center">
            <CheckSvg className="w-4 text-success mr-2" />
            Booked
          </div>
        ),
        onClick: goToSessionDetails,
      };
    }

    if (onWaitlist) {
      return {
        text: 'On Waitlist',
        variant: 'outline-purple',
        additionalInfo: `${ordinalSuffix(waitlistPlacement)} in line`,
        onClick: () => setShowWaitlistModal(true),
      };
    }

    if (full) {
      return { text: 'Join Waitlist', variant: 'outline-purple', onClick: joinWaitlist };
    }

    return {
      text: 'Book',
      variant: 'purple',
      onClick: bookSession,
      showOnboardingTour: true,
      id: 'sessions-list-reserve-btn',
    };
  })();

  if (comingSoon || past) {
    return null;
  }

  return (
    <>
      <div>
        <Button
          id={buttonData.id}
          variant={buttonData.variant}
          onClick={buttonData.onClick}
          loading={loading}
          className={className}
        >
          {buttonData.text}
        </Button>
        {buttonData.additionalInfo && (
          <div className="bg-cc-blue-500 text-center text-xs py-2">{buttonData.additionalInfo}</div>
        )}
        {buttonData.showOnboardingTour && (
          <OnboardingTour
            id={onboardingTourId}
            timeout={1000}
            enabled={isOnboardingTourEnabled}
            steps={[
              {
                element: '#sessions-list-session-level-info',
                intro:
                  'Each session is assigned a skill level range. Refer to this module when looking for a session that fits your playstyle',
              },
              {
                element: '#sessions-list-reserve-btn',
                intro: isAuthenticated
                  ? `Tap <strong>BOOK</strong> to see the session details and reserve your first ${
                      isFirstSessionFreeFlow ? 'free' : ''
                    } session.`
                  : 'Tap <strong>BOOK</strong> to see the session details. Then create a profile to receive your free session credit and finish booking.',
              },
            ]}
          />
        )}
      </div>
      <WaitlistModal
        isOpen={showWaitlistModal}
        closeHandler={() => setShowWaitlistModal(false)}
        waitlistPlacement={waitlistPlacement}
        removeFromWaitlist={removeFromWaitlist}
      />
      <WomenOnlyReservationModal
        isOpen={showWomenOnlyReservationlModal}
        closeHandler={() => setShowWomenOnlyReservationlModal(false)}
        onConfirm={() => bookSession({ skipWomenOnlyReservationModal: true })}
        userProfile={currentUser}
      />
      <OutsideOfSkillLevelModal
        isOpen={showOutsideSkillLevelModal}
        closeHandler={() => setShowOutsideSkillLevelModal(false)}
        onConfirm={() =>
          bookSession({ skipWomenOnlyReservationModal: true, skipOutsideSkillLevelModal: true })
        }
        userProfile={currentUser}
        level={skillLevel?.name}
      />
      <SkillSessionReservationModal
        isOpen={showSkillSessionReservationModal}
        closeHandler={() => setShowSkillSessionReservationModal(false)}
        onConfirm={() =>
          bookSession({
            skipWomenOnlyReservationModal: true,
            skipOutsideSkillLevelModal: true,
            skipSkillSessionReservationModal: true,
          })
        }
        userProfile={currentUser}
      />
    </>
  );
};

SessionButton.defaultProps = {
  showingFreeSessionCreditAdded: false,
  className: '',
};

SessionButton.propTypes = {
  session: PropTypes.shape().isRequired,
  showingFreeSessionCreditAdded: PropTypes.bool,
  className: PropTypes.string,
};

export default SessionButton;
