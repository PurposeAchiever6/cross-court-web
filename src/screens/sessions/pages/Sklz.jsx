import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { isNil } from 'ramda';

import ROUTES from 'shared/constants/routes';
import Loading from 'shared/components/Loading';

import { isUserInFirstSessionFlow, isUserInLegalAge } from 'shared/utils/user';

import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';

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
import SessionButtons from 'screens/sessions/components/SessionButtons';
import SessionHeader from 'screens/sessions/components/SessionHeader';
import SessionInfo from 'screens/sessions/components/SessionInfo';
import LegalAgeWarning from 'screens/sessions/components/LegalAgeWarning';

import SklzCoaches from 'screens/sessions/components/SklzCoaches';
import Carousel from 'shared/components/Carousel';
import { getSessionsMessageContainerText } from 'screens/sessions/utils';

import sklz from 'shared/images/sklz/sklz.jpg';
import goTeam from 'shared/images/sklz/go-team.jpg';
import clap from 'shared/images/sklz/clap.jpg';
import learn from 'shared/images/sklz/learn.jpg';
import sweat from 'shared/images/sklz/sweat.jpg';

const IMAGES = [sklz, goTeam, clap, learn, sweat];

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
  const isSessionComplete = sessionInfo.past;
  const isSessionFull = sessionInfo.spotsLeft === 0;
  const isSkillSession = sessionInfo.skillSession;

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

  if (isNil(id)) {
    return <Redirect to={ROUTES.HOME} />;
  }

  if (isPageLoading) {
    return <Loading />;
  }

  if (sessionInfo.isOpenClub) {
    return <Redirect to={`/session/${id}/${date}/open-club`} />;
  }

  if (!sessionInfo.skillSession) {
    return <Redirect to={`/session/${id}/${date}`} />;
  }

  return (
    <div className="flex flex-col">
      <CancelModal
        isOpen={shouldShowCancelModal}
        closeHandler={showCancelModalAction}
        cancelSessionAction={cancelSessionAction}
        inCancellationTime={sessionInfo?.userSession?.inCancellationTime}
        isFreeSession={sessionInfo?.userSession?.isFreeSession}
        unlimitedCredits={userProfile.unlimitedCredits}
      />
      <SessionHeader>{sessionInfo.location.name} SESSION</SessionHeader>
      <div className="flex flex-col-reverse md:flex-row bg-cc-black h-full">
        <Carousel
          className="session-carousel carousel-h-full"
          imagesClassName="w-full md:w-1/2"
          imageUrls={IMAGES}
        />
        <div className="flex w-full flex-col-reverse md:flex-row md:w-1/2">
          <div className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-between py-12 px-4 md:p-8 font-shapiro95_super_wide text-white">
            <SessionInfo date={date} sessionInfo={sessionInfo} />
            <div className="font-shapiro95_super_wide text-center text-sm max-w-2xs mx-auto">
              {getSessionsMessageContainerText(
                isSessionComplete,
                isSessionFull,
                isSkillSession,
                isAuthenticated,
                userProfile
              )}
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col bg-white text-center justify-around items-center px-4 pb-12 md:px-4 md:py-10">
            <SklzCoaches sessionInfo={sessionInfo} />
            <SessionButtons
              session={sessionInfo}
              reserveSessionAction={reserveSessionAction}
              confirmSessionAction={confirmSessionAction}
              showCancelModalAction={showCancelModalAction}
              signupBookSessionAction={signupBookSessionAction}
              createAndReserveFreeSessionHandler={createAndReserveFreeSessionHandler}
              disabled={!isLegalAge}
            />
            {!isLegalAge && <LegalAgeWarning />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Session;
