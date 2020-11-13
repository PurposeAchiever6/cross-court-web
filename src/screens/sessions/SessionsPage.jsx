import React, { useEffect } from 'react';
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
import AlternativeButton from 'shared/components/AlternativeButton';
import SessionLevel from 'shared/components/SessionLevel';
import LEVELS from 'shared/constants/levels';

import ROUTES from 'shared/constants/routes';

import { removeSessionFromStorage } from 'shared/actions/actionCreators';
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
import {
  formatSessionTime,
  purchaseFormattedDate,
  formatShareSessionDate,
  formatShareSessionTime,
} from 'shared/utils/date';

const SessionsPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  .title-container {
    display: flex;
    padding: 4rem 0;

    h2 {
      margin: 0;
      margin-left: 6rem;
      text-transform: uppercase;
      font-weight: 400;
      font-size: 2.5rem;
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

    .details-container {
      display: flex;
      background-color: ${colors.offWhite};
      width: 50%;

      .session-data-container {
        width: 50%;
        display: flex;
        flex-direction: column;
        padding: 3rem;

        .date-container,
        .address-container,
        .level-container,
        .time-container {
          display: flex;
          flex-direction: column;
          margin-bottom: 2rem;
        }

        .title {
          color: #9999ff;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 1rem;
          letter-spacing: 0.2rem;
          display: block;
        }
      }

      .side-container {
        width: 50%;
        display: flex;
        flex-direction: column;
        background-color: ${colors.white};
        text-align: center;
        padding: 2rem;
        justify-content: center;
        align-items: center;

        .sem-referee-container {
          .sem-container,
          .referee-container {
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
            .title {
              color: ${colors.polarPlum};
              font-size: 0.7rem;
              font-weight: 600;
              text-transform: uppercase;
              margin-bottom: 1rem;
              letter-spacing: 0.2rem;
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
      padding: 1rem 0;

      h2 {
        font-size: 1rem;
        margin-left: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;

        strong {
          margin-left: 0.5rem;
        }
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

      .details-container {
        flex-direction: column;
        width: 100%;

        .session-data-container {
          width: 91%;
          padding: 3rem 1rem;
        }

        .side-container {
          width: 100%;
          padding: 2rem 0;
          flex-direction: column;

          .sem-referee-container {
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
  const referralCode = window.sessionStorage.getItem('referralCode')
    ? window.sessionStorage.getItem('referralCode')
    : false;
  const dispatch = useDispatch();
  const history = useHistory();

  const isPageLoading = useSelector(getPageLoading);
  const sessionInfo = useSelector(getSessionInfo);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const userProfile = useSelector(getUserProfile);
  const shouldShowCancelModal = useSelector(getShowCancelModal);
  const sessionDate = useSelector(getSessionDate);

  const reserveSessionAction = () =>
    dispatch(reserveSessionInit(sessionInfo.id, date, referralCode));
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
      if (isAuthenticated && userProfile.credits) {
        text = `YOU HAVE ${userProfile.credits} SESSION${
          userProfile.credits === 1 ? '' : 'S'
        } AVAILABLE`;
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

  const copyShareInfoToClipboard = e => {
    const input = document.createElement('input');
    const referralCode = isAuthenticated && userProfile.referralCode ? '?referralCode=' + userProfile.referralCode : '';
    const SHARE_URL = `${window.location.origin}/session/${sessionInfo.id}/${sessionDate}${referralCode}`;
    const SHARE_MSG = `I just signed up for the Crosscourt ${sessionInfo.location.name} session at ${formatShareSessionTime(sessionInfo.time)} on ${formatShareSessionDate(sessionDate)}. Your first Crosscourt session's free! Use my link to sign up. ${SHARE_URL}`;
    input.setAttribute('value', SHARE_MSG);
    document.body.appendChild(input);
    input.select();
    const result = document.execCommand('copy');
    document.body.removeChild(input);
    document.querySelector('.invite-a-friend-button .ar-button-inner').innerHTML  = 'COPIED!';
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
        />
      </Modal>
      <div className="title-container">
        <BackButton />
        <h2>
          {sessionInfo.location.name} <strong>SESSION</strong>
        </h2>
      </div>
      <div className="session-details-container">
        <img src={sessionInfo.location.imageUrl} alt="Location" />
        <div className="details-container">
          <div className="session-data-container">
            <div className="date-container shapiro95_super_wide">
              <span className="title">DATE</span>
              <span className="text">{longSessionDate(date)}</span>
            </div>
            <div className="time-container shapiro95_super_wide">
              <span className="title">TIME</span>
              <span className="text">{hourRange(sessionInfo.time)}</span>
            </div>
            <div className="address-container shapiro95_super_wide">
              <span className="title">LOCATION</span>
              <span className="text">{sessionInfo.location.direction}</span>
              <span className="location">{`${sessionInfo.location.city}, CA ${sessionInfo.location.zipcode}`}</span>
            </div>
            {sessionInfo.level === LEVELS.ADVANCED && (
              <div className="level-container shapiro95_super_wide">
                <span className="title">Level</span>
                <SessionLevel showInfo level={sessionInfo.level} />
              </div>
            )}
            {getSessionsMessageContainerText() && (
              <span className="sessions-message-container">{getSessionsMessageContainerText()}</span>
            )}
          </div>
          <div className="side-container">
            <div className="sem-referee-container">
              <div className="sem-container">
                <span className="title">Your Sem</span>
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
              <div className="referee-container">
                <span className="title">Your SO</span>
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
            {isAuthenticated && (
              <div className="refer-section">
                <p class="refer-a-new-friend-message">REFER A NEW PLAYER, GET A FREE SESSION WHEN THEY BOOK!</p>
                <div
                  className="ar-button double invite-a-friend-button"
                  onClick={copyShareInfoToClipboard}
                >
                  <div className="ar-button-inner">
                    <FontAwesomeIcon icon={faExternalLinkAlt} /> INVITE A FRIEND
                  </div>
                  <div className="double-drop"></div>
                </div>
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
                />
              )}
              {isAuthenticated &&
                userProfile.credits === 0 &&
                !isSessionComplete &&
                !isSessionFull &&
                (!sessionInfo.userSession ||
                  (sessionInfo.userSession &&
                    ['reserved', 'confirmed'].indexOf(sessionInfo.userSession.state) === -1)) && (
                  <AlternativeButton
                    className="buy-btn ar-button double"
                    onClick={() => {
                      history.push(ROUTES.SERIES);
                    }}
                  >
                    <div className="ar-button-inner">CONFIRM RESERVATION</div>
                    <div className="double-drop"></div>
                  </AlternativeButton>
                )}
              {sessionInfo && (isSessionComplete || isSessionFull) && (
                <AlternativeButton
                  className="buy-btn ar-button double"
                  onClick={() => {
                    history.push(ROUTES.LOCATIONS);
                  }}
                >
                  <div className="ar-button-inner">FIND NEW SESSION</div>
                  <div className="double-drop"></div>
                </AlternativeButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </SessionsPageContainer>
  );
};

export default SessionsPage;
