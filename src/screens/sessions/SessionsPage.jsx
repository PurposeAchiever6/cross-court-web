import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { isNil } from 'ramda';
import styled from 'styled-components';

import Loading from 'shared/components/Loading';
import Modal from 'shared/components/Modal';
import BackButton from 'shared/components/BackButton';
import { longSessionDate, hourRange } from 'shared/utils/date';

import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import SessionLevel from 'shared/components/SessionLevel';

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
} from './actionCreators';
import { getPageLoading, getSessionInfo, getShowCancelModal } from './reducer';
import CancelModal from './components/CancelModal';
import SessionButtons from './components/SessionButtons';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import SessionOfficials from './components/SessionOfficials';

const SessionsPageContainer = styled.div`
  @media (min-width: 768px) {
    height: calc(100vh - 8rem);
  }
  .title-officials {
    -webkit-text-stroke: 1px;
    line-height: 1;
  }

  .carousel-root {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 55%;
  }

  @media (max-width: 991px) {
    .carousel-root {
      width: 100%;
    }
  }
`;

const SessionsPage = () => {
  const { id, date } = useParams();
  const referralCode = window.localStorage.getItem('referralCode');
  const dispatch = useDispatch();

  const isPageLoading = useSelector(getPageLoading);
  const sessionInfo = useSelector(getSessionInfo);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const userProfile = useSelector(getUserProfile);
  const shouldShowCancelModal = useSelector(getShowCancelModal);

  const reserveSessionAction = () =>
    dispatch(reserveSessionInit(sessionInfo.id, date, referralCode));
  const createAndReserveFreeSessionHandler = () =>
    dispatch(createAndReserveFreeSessionInit(sessionInfo.id, date, referralCode));
  const confirmSessionAction = () => dispatch(confirmSessionInit(sessionInfo.userSession.id));
  const cancelSessionAction = () => dispatch(cancelSessionInit(sessionInfo.userSession.id));
  const showCancelModalAction = () => dispatch(showCancelModal());
  const signupBookSessionAction = () => dispatch(signupBookSession(id, date));
  const removeSessionFromStorageAction = () => dispatch(removeSessionFromStorage());

  const isSessionComplete = sessionInfo.past;
  const isSessionFull = sessionInfo.spotsLeft === 0;
  const getSessionsMessageContainerText = () => {
    let text = '';

    if (isSessionComplete) {
      text = `SESSION COMPLETE`;
    } else if (isSessionFull) {
      text = `SESSION FULL`;
    } else {
      if (isAuthenticated) {
        if (userProfile.unlimitedCredits) {
          text = 'YOU HAVE UNLIMITED SESSIONS';
        } else if (userProfile.totalCredits) {
          text = `YOU HAVE ${userProfile.totalCredits} SESSION${
            userProfile.totalCredits === 1 ? '' : 'S'
          } ${userProfile.activeSubscription ? 'LEFT THIS MONTH' : 'AVAILABLE'}`;
        }
      }
    }

    return text;
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(removeSessionFromStorageAction());
      dispatch(initialLoadAuthInit(id, date));
    } else {
      dispatch(initialLoadInit(id, date));
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  if (isNil(id)) {
    return <Redirect to="/" />;
  }

  const sessionData = [
    { title: 'DATE', value: longSessionDate(date) },
    { title: 'TIME', value: hourRange(sessionInfo.time) },
    {
      title: 'LOCATION',
      value: [
        `${sessionInfo?.location?.address}`,
        <br />,
        `${sessionInfo?.location?.city}, CA ${sessionInfo?.location?.zipcode}`,
      ],
    },
  ];

  return isPageLoading ? (
    <Loading />
  ) : (
    <SessionsPageContainer className="flex flex-col">
      <Modal shouldClose closeHandler={showCancelModalAction} isOpen={shouldShowCancelModal}>
        <CancelModal
          closeHandler={showCancelModalAction}
          cancelSessionAction={cancelSessionAction}
          inCancellationTime={sessionInfo?.userSession?.inCancellationTime}
          isFreeSession={sessionInfo?.userSession?.isFreeSession}
          unlimitedCredits={userProfile.unlimitedCredits}
        />
      </Modal>
      <div className="md:flex py-4 md:py-8 font-shapiro95_super_wide">
        <BackButton className="ml-8 mt-4 md:mt-0" />
        <h2 className="md:ml-8 text-center uppercase font-normal py-8 md:py-0 text-2xl">
          {sessionInfo.location.name} SESSION
        </h2>
      </div>
      <div className="flex flex-col md:flex-row bg-cc-black border-b border-gray-600 h-full">
        <Carousel
          className="carousel-h-full"
          infiniteLoop={true}
          showArrows={true}
          showStatus={false}
          showThumbs={false}
        >
          {sessionInfo.location.imageUrls.map((image, index) => (
            <img className="w-full md:w-1/2" src={image} alt="" key={index} />
          ))}
        </Carousel>
        <div className="flex w-full flex-col md:flex-row md:w-1/2 ">
          <div className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-between py-12 px-4 md:p-8 font-shapiro95_super_wide text-white">
            <div className="mb-8 flex flex-col items-center md:items-start">
              {sessionData.map((data) => (
                <div className="flex flex-col mb-8">
                  <span className="uppercase block tracking-wider font-semibold">{data.title}</span>
                  <span className="font-shapiro45_welter_extd text-sm uppercase">{data.value}</span>
                </div>
              ))}
              <SessionLevel showInfo level={sessionInfo.skillLevel} light />
            </div>
            {getSessionsMessageContainerText() && (
              <div className="font-shapiro95_super_wide text-center text-sm max-w-2xs mx-auto">
                {getSessionsMessageContainerText()}
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2 flex flex-col bg-white text-center justify-between items-center px-4 py-12 md:px-4 md:py-10">
            <SessionOfficials sessionInfo={sessionInfo} />
            <SessionButtons
              session={sessionInfo}
              reserveSessionAction={reserveSessionAction}
              confirmSessionAction={confirmSessionAction}
              showCancelModalAction={showCancelModalAction}
              userProfile={userProfile}
              signupBookSessionAction={signupBookSessionAction}
              createAndReserveFreeSessionHandler={createAndReserveFreeSessionHandler}
            />
          </div>
        </div>
      </div>
    </SessionsPageContainer>
  );
};

export default SessionsPage;
