import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import { isNil } from 'ramda';
import styled from 'styled-components';

import Loading from 'shared/components/Loading';
import Modal from 'shared/components/Modal';
import BackButton from 'shared/components/BackButton';
import colors from 'shared/styles/constants';
import UserSvg from 'shared/components/svg/UserSvg';
import { longSessionDate, hourRange } from 'shared/utils/date';

import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import SessionLevel from 'shared/components/SessionLevel';
import LEVELS from 'shared/constants/levels';

import ROUTES from 'shared/constants/routes';

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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { getSessionDate } from 'screens/sessions/reducer';
import { formatShareSessionDate, formatShareSessionTime } from 'shared/utils/date';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const SessionsPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  .title-container {
    display: flex;
    padding: 2rem 0;

    h2 {
      margin: 0;
      margin-left: 2rem;
      text-transform: uppercase;
      font-weight: 400;
      font-size: 1.5rem;
    }

    button {
      margin: 0;
      margin-left: 2rem;
    }
  }

  .session-details-container {
    display: flex;
    flex: 1;
    img {
      width: 50%;
    }

    .carousel-root {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 55%;
    }

    .details-container {
      display: flex;
      width: 50%;

      .session-data-container {
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 2rem 2rem 2.5rem 2rem;

        .date-container,
        .address-container,
        .time-container {
          display: flex;
          flex-direction: column;
          margin-bottom: 2rem;
        }

        .title {
          font-family: 'shapiro95_super_wide';
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          display: block;
        }

        .text {
          font-family: 'shapiro45_welter_extd';
          font-size: 0.875rem;
          text-transform: uppercase;
        }
      }

      .side-container {
        width: 50%;
        display: flex;
        flex-direction: column;
        background-color: ${colors.white};
        text-align: center;
        padding: 2rem 1rem 2.5rem 1rem;
        justify-content: space-between;
        align-items: center;

        .title-officials {
          -webkit-text-stroke: 1px;
          line-height: 1;
        }

        .sessions-officials-container {
          .official-container {
            display: flex;
            flex-direction: column;
            margin-bottom: 2rem;
            justify-content: center;
            align-items: center;

            img {
              width: 5rem;
              height: 5rem;
              margin: 0 auto;
              border-radius: 10rem;
              margin-bottom: 0.5rem;
              object-fit: cover;
            }

            .not-assigned-container {
              height: 5rem;
              width: 5rem;
              display: flex;
              justify-content: center;
              align-items: center;
              background: ${colors.lightGrey};
              border-radius: 10rem;
              font-size: 2.5rem;
              color: ${colors.polarPlum};
              margin-bottom: 0.5rem;
            }

            .name {
              font-weight: 500;
              font-size: 0.9rem;
              text-transform: capitalize;
            }
          }
        }
        .button-container {
          .btn-alternative {
            color: ${colors.black};
            border-color: ${colors.black};
            padding: 1rem 2.3rem;
          }

          .buy-btn {
            background-color: ${colors.black};
            color: ${colors.white};
          }
        }
      }
    }
  }

  @media (max-width: 991px) {
    .title-container {
      display: block;
      padding: 1rem 0;

      h2 {
        font-size: 1.5rem;
        margin: 1.5rem 0rem 1rem 0rem;
        padding: 0 2rem;
        text-align: center;
      }

      button {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem;
        margin-left: 1rem;

        svg {
          font-size: 1rem;
        }
      }
    }
    .session-details-container {
      flex-direction: column;

      img {
        width: 100%;
      }

      .carousel-root {
        width: 100%;
      }

      .details-container {
        flex-direction: column;
        width: 100%;

        .session-data-container {
          text-align: center;
          width: 100%;
          padding: 3rem 1rem;
        }

        .side-container {
          width: 100%;
          padding: 3rem 1rem;
          flex-direction: column;

          .sessions-officials-container {
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            width: 100%;
          }
        }
      }
    }
  }
`;

const SessionsPage = () => {
  const { id, date } = useParams();
  const referralCode = window.localStorage.getItem('referralCode');
  const dispatch = useDispatch();
  const history = useHistory();
  const [copied, setCopied] = useState(false);

  const isPageLoading = useSelector(getPageLoading);
  const sessionInfo = useSelector(getSessionInfo);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const userProfile = useSelector(getUserProfile);
  const shouldShowCancelModal = useSelector(getShowCancelModal);
  const sessionDate = useSelector(getSessionDate);

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
  const inCancellationTime =
    sessionInfo && sessionInfo.userSession && sessionInfo.userSession.inCancellationTime;

  const copyShareInfoToClipboard = () => {
    const input = document.createElement('input');

    const SHARE_URL = `${window.location.origin}/session/${sessionInfo.id}/${sessionDate}`;
    const SHARE_MSG = `I just signed up for the Crosscourt ${
      sessionInfo.location.name
    } session at ${formatShareSessionTime(sessionInfo.time)} on ${formatShareSessionDate(
      sessionDate
    )}. Use my link to sign up. ${SHARE_URL}`;
    input.setAttribute('value', SHARE_MSG);
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    setCopied(true);
  };

  return isPageLoading ? (
    <Loading />
  ) : (
    <SessionsPageContainer className="sessions">
      <Modal shouldClose closeHandler={showCancelModalAction} isOpen={shouldShowCancelModal}>
        <CancelModal
          closeHandler={showCancelModalAction}
          cancelSessionAction={cancelSessionAction}
          inCancellationTime={inCancellationTime}
          unlimitedCredits={userProfile.unlimitedCredits}
        />
      </Modal>
      <div className="title-container font-shapiro95_super_wide">
        <BackButton />
        <h2>{sessionInfo.location.name} SESSION</h2>
      </div>
      <div className="session-details-container bg-cc-black border-b border-gray-600">
        <Carousel infiniteLoop={true} showArrows={true} showStatus={false} showThumbs={false}>
          {sessionInfo.location.imageUrls.map((image, index) => (
            <img src={image} alt="" key={index} />
          ))}
        </Carousel>
        <div className="details-container">
          <div className="session-data-container font-shapiro95_super_wide text-white">
            <div className="mb-8">
              <div className="date-container">
                <span className="title">DATE</span>
                <span className="text">{longSessionDate(date)}</span>
              </div>
              <div className="time-container">
                <span className="title">TIME</span>
                <span className="text">{hourRange(sessionInfo.time)}</span>
              </div>
              <div className="address-container">
                <span className="title">LOCATION</span>
                <span className="text">{sessionInfo.location.address}</span>
                <span className="text">{`${sessionInfo.location.city}, CA ${sessionInfo.location.zipcode}`}</span>
              </div>
              {sessionInfo.level === LEVELS.ADVANCED && (
                <SessionLevel showInfo level={sessionInfo.level} />
              )}
            </div>
            {getSessionsMessageContainerText() && (
              <div className="font-shapiro95_super_wide text-center text-sm max-w-2xs mx-auto">
                {getSessionsMessageContainerText()}
              </div>
            )}
          </div>
          <div className="side-container">
            <h3 className="uppercase mb-6">
              <span className="font-shapiro95_super_wide text-lg xl:text-2xl 2xl:text-3xl">
                Your Session
              </span>
              <br />
              <span className="title-officials font-shapiro97_air_extd text-2xl xl:text-3xl 2xl:text-4xl">
                Officials
              </span>
            </h3>
            <div className="sessions-officials-container font-shapiro95_super_wide">
              <div className="official-container">
                {isNil(sessionInfo.sem) || isNil(sessionInfo.sem.imageUrl) ? (
                  <div className="not-assigned-container">
                    <UserSvg />
                  </div>
                ) : (
                  <img src={sessionInfo.sem.imageUrl} alt="SEM" />
                )}

                <span className="name">
                  {sessionInfo.sem.name ? sessionInfo.sem.name : 'NOT ASSIGNED'}
                </span>
              </div>
              <div className="official-container">
                {isNil(sessionInfo.referee) || isNil(sessionInfo.referee.imageUrl) ? (
                  <div className="not-assigned-container">
                    <UserSvg />
                  </div>
                ) : (
                  <img src={sessionInfo.referee.imageUrl} alt="SEM" />
                )}
                <span className="name">
                  {sessionInfo.referee.name ? sessionInfo.referee.name : 'NOT ASSIGNED'}
                </span>
              </div>
            </div>
            {isAuthenticated &&
              !isSessionComplete &&
              !isSessionFull &&
              sessionInfo &&
              sessionInfo.userSession &&
              ['reserved', 'confirmed'].indexOf(sessionInfo.userSession.state) !== -1 && (
                <div className="mb-8">
                  <PrimaryButton double onClick={copyShareInfoToClipboard}>
                    <FontAwesomeIcon className="mr-1" icon={faExternalLinkAlt} />
                    {copied ? 'COPIED' : 'INVITE A FRIEND'}
                  </PrimaryButton>
                </div>
              )}

            <div className="button-container">
              {sessionInfo && !sessionInfo.past && (
                <SessionButtons
                  session={sessionInfo}
                  reserveSessionAction={reserveSessionAction}
                  confirmSessionAction={confirmSessionAction}
                  showCancelModalAction={showCancelModalAction}
                  userProfile={userProfile}
                  signupBookSessionAction={signupBookSessionAction}
                  createAndReserveFreeSessionHandler={createAndReserveFreeSessionHandler}
                />
              )}
              {isAuthenticated &&
                !userProfile.unlimitedCredits &&
                userProfile.totalCredits === 0 &&
                !isSessionComplete &&
                !isSessionFull &&
                (!sessionInfo.userSession ||
                  (sessionInfo.userSession &&
                    ['reserved', 'confirmed'].indexOf(sessionInfo.userSession.state) === -1)) && (
                  <PrimaryButton
                    double
                    className="buy-btn"
                    onClick={() => {
                      window.localStorage.setItem('redirect', window.location.pathname);
                      history.push(ROUTES.MEMBERSHIPS);
                    }}
                  >
                    CONFIRM RESERVATION
                  </PrimaryButton>
                )}
              {sessionInfo && (isSessionComplete || isSessionFull) && (
                <PrimaryButton
                  className="buy-btn"
                  onClick={() => {
                    history.push(ROUTES.LOCATIONS);
                  }}
                >
                  FIND NEW SESSION
                </PrimaryButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </SessionsPageContainer>
  );
};

export default SessionsPage;
