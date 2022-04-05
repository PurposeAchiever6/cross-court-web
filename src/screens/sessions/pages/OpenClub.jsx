import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { isNil } from 'ramda';
import styled from 'styled-components';

import ROUTES from 'shared/constants/routes';
import Loading from 'shared/components/Loading';

import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';

import { resetLoading, removeSessionFromStorage } from 'shared/actions/actionCreators';
import { initialLoadInit, initialLoadAuthInit } from 'screens/sessions/actionCreators';
import { getPageLoading, getSessionInfo } from 'screens/sessions/reducer';
import Carousel from 'shared/components/Carousel';
import { getSessionsMessageContainerText, sessionData } from 'screens/sessions/utils';

import SessionHeader from 'screens/sessions/components/SessionHeader';
import FreeIncludedIcon from 'shared/images/open-club/free-included-icon.png';
import StationaryBikeIcon from 'shared/images/open-club/stationary-bike-icon.png';
import TrainSoloIcon from 'shared/images/open-club/train-solo-icon.png';
import OwnRunsIcon from 'shared/images/open-club/own-runs-icon.png';

const StyledTitle = styled.div`
  .title {
    font-size: 45px;
    line-height: 45px;
  }

  .subtitle {
    font-size: 76px;
    line-height: 76px;
  }
`;

const OpenClub = () => {
  const { id, date } = useParams();
  const dispatch = useDispatch();

  const isPageLoading = useSelector(getPageLoading);
  const sessionInfo = useSelector(getSessionInfo);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const userProfile = useSelector(getUserProfile);

  const isSessionComplete = sessionInfo.past;
  const isSessionFull = sessionInfo.spotsLeft === 0;

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

  if (!sessionInfo.isOpenClub) {
    return <Redirect to={`/session/${id}/${date}`} />;
  }

  return (
    <div className="flex flex-col border-b border-gray-400">
      <SessionHeader>{sessionInfo.location.name} OPEN CLUB</SessionHeader>
      <div className="flex flex-col-reverse md:flex-row bg-cc-black h-full">
        <Carousel
          className="session-carousel carousel-h-full"
          imagesClassName="w-full md:w-1/2"
          imageUrls={sessionInfo.location.imageUrls}
        />
        <div className="flex w-full flex-col-reverse md:flex-row md:w-1/2 ">
          <div className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-between py-12 px-4 md:p-8 font-shapiro95_super_wide text-white">
            <div className="flex flex-col items-center md:items-start">
              {sessionData(date, sessionInfo).map((data, i) => (
                <div className="flex flex-col mb-8" key={`info-${i}`}>
                  <span className="uppercase block tracking-wider font-semibold">{data.title}</span>
                  <span className="font-shapiro45_welter_extd text-sm uppercase">{data.value}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col bg-cc-purple p-3 mb-10 md:mb-4 md:-mt-2">
              <p>HOW IT WORKS</p>
              <p className="font-shapiro45_welter_extd mt-1">
                You will only be allowed to access open club hours if you are a member. Show your
                membership info located in "My Account" to our session experience manager upon
                arrival.
              </p>
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
          <div className="flex flex-col justify-evenly w-full md:w-1/2 bg-white text-center px-4 pb-12 md:pb-0">
            <StyledTitle>
              <p className="font-shapiro95_super_wide title mt-3 md:m-0">CC OPEN</p>
              <p className="font-shapiro95_super_wide text-stroke-width-2 text-white text-stroke-cc-black subtitle">
                CLUB
              </p>
              <p className="text-cc-purple my-3 md:m-0">MEMBERS ONLY</p>
            </StyledTitle>
            <div className="p-4 md:p-0">
              <div className="flex mb-10">
                <div className="flex flex-col items-center justify-center w-1/2">
                  <img src={FreeIncludedIcon} alt="free-included" className="w-16 h-16 mb-2" />
                  <p className="font-shapiro95_super_wide text-xs">INCLUDED WITH MEMBERSHIPS</p>
                </div>
                <div className="flex flex-col items-center justify-center w-1/2">
                  <img src={TrainSoloIcon} alt="train-solo" className="w-20 h-20 mb-2" />
                  <p className="font-shapiro95_super_wide text-xs">
                    SHOOTAROUND/ <br /> TRAIN SOLO
                  </p>
                </div>
              </div>
              <div className="flex mt-10">
                <div className="flex flex-col items-center justify-center w-1/2">
                  <img src={StationaryBikeIcon} alt="bike" className="w-20 h-20 mb-2" />
                  <p className="font-shapiro95_super_wide text-xs">
                    HANG OUT/ <br /> STRETCH OUT
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center w-1/2">
                  <img src={OwnRunsIcon} alt="own-runs" className="w-20 h-20 mb-2" />
                  <p className="font-shapiro95_super_wide text-xs">
                    SELF-ORGANIZE/ <br /> OWN RUNS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenClub;
