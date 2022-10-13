import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import Loading from 'shared/components/Loading';

import { isUserInFirstSessionFlow, isUserInLegalAge } from 'shared/utils/user';

import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';

import Carousel from 'shared/components/Carousel';
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

import CancelModal from 'screens/sessions/components/CancelModal';
import Sklz from 'screens/sessions/components/Sklz';
import NormalSession from 'screens/sessions/components/Session';
import SessionHeader from 'screens/sessions/components/SessionHeader';
import SessionButtons from 'screens/sessions/components/SessionButtons';
import SessionOfficials from 'screens/sessions/components/SessionOfficials';
import SklzCoaches from 'screens/sessions/components/SklzCoaches';
import LegalAgeWarning from 'screens/sessions/components/LegalAgeWarning';

import OpenClub, { SKLZ_IMAGES } from 'screens/sessions/components/open-club/Content';
import HowOpenClubWorks from 'screens/sessions/components/open-club/HowOpenClubWorks';

const Session = () => {
  const { id, date } = useParams();
  const referralCode = window.localStorage.getItem('referralCode');
  const dispatch = useDispatch();

  const isPageLoading = useSelector(getPageLoading);
  const sessionInfo = useSelector(getSessionInfo);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const userProfile = useSelector(getUserProfile);
  const shouldShowCancelModal = useSelector(getShowCancelModal);
  const isFirstSessionFlow = isUserInFirstSessionFlow(userProfile);

  const confirmSessionAction = () => dispatch(confirmSessionInit(sessionInfo.userSession.id));
  const cancelSessionAction = () => dispatch(cancelSessionInit(sessionInfo.userSession.id));
  const showCancelModalAction = () => dispatch(showCancelModal());
  const signupBookSessionAction = () => dispatch(signupBookSession(id, date));
  const reserveSessionAction = () => {
    const sessionId = sessionInfo.id;
    const redirectTo = isFirstSessionFlow ? ROUTES.FIRSTSESSIONRESERVED : ROUTES.SESSIONRESERVED;
    dispatch(reserveSessionInit({ sessionId, date, referralCode, redirectTo }));
  };
  const createAndReserveFreeSessionHandler = () => {
    const sessionId = sessionInfo.id;
    const redirectTo = ROUTES.FIRSTSESSIONRESERVED;
    dispatch(createAndReserveFreeSessionInit({ sessionId, date, referralCode, redirectTo }));
  };

  const isLegalAge = isUserInLegalAge(userProfile);
  const { isOpenClub, skillSession } = sessionInfo;
  const normalSession = !isOpenClub && !skillSession;

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

  const getContent = (sessionInfo) => {
    if (isOpenClub) {
      return <OpenClub sessionInfo={sessionInfo} />;
    }

    if (skillSession) {
      return (
        <Sklz
          sessionInfo={sessionInfo}
          isAuthenticated={isAuthenticated}
          userProfile={userProfile}
        />
      );
    }

    return (
      <NormalSession
        sessionInfo={sessionInfo}
        isAuthenticated={isAuthenticated}
        userProfile={userProfile}
      />
    );
  };

  return (
    <>
      <div className="flex flex-col">
        <SessionHeader sessionInfo={sessionInfo} />
        <div className="flex flex-col-reverse md:flex-row bg-cc-black h-full">
          <Carousel
            className="session-carousel carousel-h-full"
            imagesClassName="w-full md:w-1/2"
            imageUrls={skillSession ? SKLZ_IMAGES : sessionInfo.location.imageUrls}
          />
          <div className="flex w-full flex-col-reverse md:flex-row md:w-1/2">
            {getContent(sessionInfo)}
            <div className="w-full md:w-1/2 flex flex-col bg-white text-center justify-around items-center px-4 pb-12 md:px-4 md:py-10">
              {normalSession && <SessionOfficials sessionInfo={sessionInfo} />}
              {skillSession && <SklzCoaches sessionInfo={sessionInfo} />}

              <div className={`flex flex-col justify-evenly ${isOpenClub ? 'h-full ' : ''}`}>
                {isOpenClub && <HowOpenClubWorks />}
                <SessionButtons
                  session={sessionInfo}
                  reserveSessionAction={reserveSessionAction}
                  confirmSessionAction={confirmSessionAction}
                  showCancelModalAction={showCancelModalAction}
                  signupBookSessionAction={signupBookSessionAction}
                  createAndReserveFreeSessionHandler={createAndReserveFreeSessionHandler}
                  disabled={!isLegalAge}
                />
                {(normalSession || skillSession) && !isLegalAge && <LegalAgeWarning />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <CancelModal
        isOpen={shouldShowCancelModal}
        closeHandler={showCancelModalAction}
        cancelSessionAction={cancelSessionAction}
        sessionInfo={sessionInfo}
        unlimitedCredits={userProfile.unlimitedCredits}
      />
    </>
  );
};

export default Session;
