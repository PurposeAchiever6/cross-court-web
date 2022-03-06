import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { isNil } from 'ramda';

import ROUTES from 'shared/constants/routes';
import Loading from 'shared/components/Loading';

import { isUserInLegalAge } from 'shared/utils/user';
import WarningTriangle from 'shared/images/warning-triangle.png';

import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import BadgeWithInfo from 'shared/components/BadgeWithInfo';

import { removeSessionFromStorage } from 'shared/actions/actionCreators';
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
import SkillLevelWarning from 'screens/sessions/components/SkillLevelWarning';
import SessionHeader from 'screens/sessions/components/SessionHeader';

import SessionOfficials from 'screens/sessions/components/SessionOfficials';
import Carousel from 'shared/components/Carousel';
import { getSessionsMessageContainerText, sessionData } from 'screens/sessions/utils';

const Session = () => {
  const { id, date } = useParams();
  const referralCode = window.localStorage.getItem('referralCode');
  const dispatch = useDispatch();

  const isPageLoading = useSelector(getPageLoading);
  const sessionInfo = useSelector(getSessionInfo);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const userProfile = useSelector(getUserProfile);
  const shouldShowCancelModal = useSelector(getShowCancelModal);
  const { skillLevel } = sessionInfo;

  const reserveSessionAction = () =>
    dispatch(reserveSessionInit(sessionInfo.id, date, referralCode));
  const createAndReserveFreeSessionHandler = () =>
    dispatch(createAndReserveFreeSessionInit(sessionInfo.id, date, referralCode));
  const confirmSessionAction = () => dispatch(confirmSessionInit(sessionInfo.userSession.id));
  const cancelSessionAction = () => dispatch(cancelSessionInit(sessionInfo.userSession.id));
  const showCancelModalAction = () => dispatch(showCancelModal());
  const signupBookSessionAction = () => dispatch(signupBookSession(id, date));

  const isLegalAge = isUserInLegalAge(userProfile);
  const isSessionComplete = sessionInfo.past;
  const isSessionFull = sessionInfo.spotsLeft === 0;

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(removeSessionFromStorage());
      dispatch(initialLoadAuthInit(id, date));
    } else {
      dispatch(initialLoadInit(id, date));
    }
  }, [dispatch, id, date, isAuthenticated]);

  if (isNil(id)) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return isPageLoading ? (
    <Loading />
  ) : (
    <div className="flex flex-col border-b border-gray-400">
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
          imageUrls={sessionInfo.location.imageUrls}
        />
        <div className="flex w-full flex-col-reverse md:flex-row md:w-1/2 ">
          <div className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-between py-12 px-4 md:p-8 font-shapiro95_super_wide text-white">
            <div className="mb-8 flex flex-col items-center md:items-start">
              {isAuthenticated && (
                <SkillLevelWarning userProfile={userProfile} sessionInfo={sessionInfo} />
              )}
              {sessionData(date, sessionInfo).map((data, i) => (
                <div className="flex flex-col mb-8" key={`info-${i}`}>
                  <span className="uppercase block tracking-wider font-semibold">{data.title}</span>
                  <span className="font-shapiro45_welter_extd text-sm uppercase">{data.value}</span>
                </div>
              ))}
              <BadgeWithInfo info={skillLevel.description} variant="white">
                {`${skillLevel.min} - ${skillLevel.max}`}
              </BadgeWithInfo>
            </div>
            <div className="font-shapiro95_super_wide text-center text-sm max-w-2xs mx-auto">
              {getSessionsMessageContainerText(
                isSessionComplete,
                isSessionFull,
                isAuthenticated,
                userProfile
              )}
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col bg-white text-center justify-around items-center px-4 pb-12 md:px-4 md:py-10">
            <SessionOfficials sessionInfo={sessionInfo} />
            <SessionButtons
              session={sessionInfo}
              reserveSessionAction={reserveSessionAction}
              confirmSessionAction={confirmSessionAction}
              showCancelModalAction={showCancelModalAction}
              signupBookSessionAction={signupBookSessionAction}
              createAndReserveFreeSessionHandler={createAndReserveFreeSessionHandler}
              disabled={!isLegalAge}
            />
            {!isLegalAge && (
              <div className="flex items-center whitespace-nowrap mt-4 md:mt-2">
                <img className="w-4 h-4" src={WarningTriangle} alt="warning-icon" />
                <p className="text-2xs sm:text-xs mt-1 ml-2">YOU MUST BE 18+</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Session;
