import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';

import { pluralize } from 'shared/utils/helpers';
import { sessionInformation, sessionRestrictions } from 'shared/utils/sessions';
import LockSvg from 'shared/components/svg/LockSvg';
import PageLayout from 'shared/components/layout/PageLayout';
import SectionLayout from 'shared/components/layout/SectionLayout';
import UserCreditsLeft from 'screens/sessions/components/UserCreditsLeft';
import SessionInformation from 'screens/sessions/components/SessionInformation';
import SessionRoster from 'screens/sessions/components/SessionRoster';
import SessionOfficials from 'screens/sessions/components/SessionOfficials';

// TODO fix all this file. To avoid creating a PR too big, I will leave it for the next commit
// where I will create a `header layout component` and `header action component` with cancel and
// confirm buttons. In this case, book session or cancel reservation if already booked.

import ROUTES from 'shared/constants/routes';
import Loading from 'shared/components/Loading';
import { isUserInFirstSessionFlow } from 'shared/utils/user';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import CarouselImages from 'shared/components/CarouselImages';
import { resetLoading, removeSessionFromStorage } from 'shared/actions/actionCreators';
import { createAndReserveFreeSessionInit } from 'screens/checkout/actionCreators';
import {
  initialLoadInit,
  reserveSessionInit,
  cancelSessionInit,
  confirmSessionInit,
  showCancelModal,
  initialLoadAuthInit,
  signupBookSession,
} from 'screens/sessions/actionCreators';
import { getPageLoading, getSessionInfo, getShowCancelModal } from 'screens/sessions/reducer';

import CancelModal from 'screens/sessions/components/modals/CancelModal';
import AddGuestModal from 'screens/sessions/components/modals/AddGuestModal';
import Sklz from 'screens/sessions/components/Sklz';
import NormalSession from 'screens/sessions/components/Session';
import SessionHeader from 'screens/sessions/components/SessionHeader';
import SessionButtons from 'screens/sessions/components/SessionButtons';
import SklzCoaches from 'screens/sessions/components/SklzCoaches';

import OpenClub, { SKLZ_IMAGES } from 'screens/sessions/components/open-club/Content';
import HowOpenClubWorks from 'screens/sessions/components/open-club/HowOpenClubWorks';

const Session = () => {
  const { id, date } = useParams();
  const dispatch = useDispatch();

  const isPageLoading = useSelector(getPageLoading);
  const sessionInfo = useSelector(getSessionInfo);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const userProfile = useSelector(getUserProfile);
  const shouldShowCancelModal = useSelector(getShowCancelModal);
  const isFirstSessionFlow = isUserInFirstSessionFlow(userProfile);
  const referralCode = window.localStorage.getItem('referralCode');

  const { spotsLeft, maxCapacity, themeTitle } = sessionInfo;

  const [showAddGuestModal, setShowAddGuestModal] = useState(false);

  const confirmSessionAction = () => dispatch(confirmSessionInit(sessionInfo.userSession.id));
  const cancelSessionAction = () => dispatch(cancelSessionInit(sessionInfo.userSession.id));
  const showCancelModalAction = () => dispatch(showCancelModal());
  const signupBookSessionAction = () => dispatch(signupBookSession(id, date));
  const reserveSessionAction = (payload = {}) => {
    const sessionId = sessionInfo.id;
    const redirectTo = isFirstSessionFlow ? ROUTES.FIRSTSESSIONRESERVED : ROUTES.SESSIONRESERVED;
    dispatch(reserveSessionInit({ sessionId, date, referralCode, redirectTo, ...payload }));
  };
  const createAndReserveFreeSessionHandler = (payload = {}) => {
    const sessionId = sessionInfo.id;
    const redirectTo = ROUTES.FIRSTSESSIONRESERVED;
    dispatch(
      createAndReserveFreeSessionInit({
        sessionId,
        date,
        referralCode,
        redirectTo,
        ...payload,
      })
    );
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(removeSessionFromStorage());
      dispatch(initialLoadAuthInit(id, date));
    } else {
      dispatch(initialLoadInit(id, date));
    }

    return () => {
      dispatch(resetLoading());
    };
  }, [dispatch, id, date, isAuthenticated]);

  if (!id) {
    return <Redirect to={ROUTES.HOME} />;
  }

  if (isPageLoading) {
    return <Loading />;
  }

  return (
    <>
      <PageLayout>
        <SectionLayout>
          <div className="sm:flex sm:justify-between sm:items-center mb-5 sm:mb-8">
            <h1 className="font-shapiro95_super_wide text-3xl sm:text-4xl mb-3 sm:mb-0">
              Session Details
            </h1>
            <UserCreditsLeft session={sessionInfo} className="sm:text-right" />
          </div>
          <div className="sm:flex sm:justify-between sm:items-center mb-6">
            <div>
              {themeTitle && (
                <div className="mb-5 sm:mb-0">
                  <h3 className="font-shapiro95_super_wide text-lg sm:text-xl">Cross-Court</h3>
                  <div className="text-white text-opacity-80 mt-1">{themeTitle}</div>
                </div>
              )}
            </div>
            <div>
              {sessionRestrictions(sessionInfo).map((restriction, index) => (
                <div key={index} className="flex items-center text-sm mb-1">
                  <LockSvg className="shrink-0 w-4 mr-2" />
                  {restriction}
                </div>
              ))}
            </div>
          </div>
          <SessionInformation session={sessionInfo} date={date} className="mb-4" />
          <div className="flex flex-wrap justify-center -mr-2 text-xs md:text-sm">
            {sessionInformation(sessionInfo).map((information, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 shrink-0 grow pr-2 pb-2"
              >
                <div className="bg-cc-blue-500 h-full flex justify-center items-center text-center p-3">
                  {information}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h3 className="font-shapiro95_super_wide text-xl mb-1">
              Roster {maxCapacity ? `${maxCapacity - spotsLeft}/${maxCapacity}` : ''}
            </h3>
            {spotsLeft && (
              <div className="font-shapiro95_super_wide text-cc-purple text-sm mb-3">
                {`${spotsLeft} ${pluralize('spot', spotsLeft)} left${spotsLeft <= 5 ? '!' : ''}`}
              </div>
            )}
            <SessionRoster session={sessionInfo} date={date} showExpanded className="mb-12" />
            <SessionOfficials session={sessionInfo} />
          </div>
        </SectionLayout>
      </PageLayout>
      <CancelModal
        isOpen={shouldShowCancelModal}
        closeHandler={showCancelModalAction}
        cancelSessionAction={cancelSessionAction}
        sessionInfo={sessionInfo}
        unlimitedCredits={userProfile.unlimitedCredits}
      />
      <AddGuestModal
        userSessionId={sessionInfo?.userSession?.id}
        showAddGuestModal={showAddGuestModal}
        setShowAddGuestModal={setShowAddGuestModal}
      />
    </>
  );
};

export default Session;
