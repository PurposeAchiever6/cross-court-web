import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useParams, Link } from 'react-router-dom';
import { isNil } from 'ramda';
import styled from 'styled-components';

import Loading from 'shared/components/Loading';
import NewModal from 'shared/components/NewModal';
import BackButton from 'shared/components/BackButton';
import device from 'shared/styles/mediaQueries';
import colors from 'shared/styles/constants';
import UserSvg from 'shared/components/svg/UserSvg';
import { longSessionDate, hourRange } from 'shared/utils/date';
import ROUTES from 'shared/constants/routes';

import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import AlternativeButton from 'shared/components/AlternativeButton';

import {
  initialLoadInit,
  reserveSessionInit,
  cancelSessionInit,
  confirmSessionInit,
  showCancelModal,
  initialLoadAuthInit,
} from './actionCreators';
import { getPageLoading, getSessionInfo, getShowCancelModal } from './reducer';
import CancelModal from './components/CancelModal';
import SessionButtons from './components/SessionButtons';

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
        .time-container {
          display: flex;
          flex-direction: column;
          margin-bottom: 2rem;
        }

        .address-container {
          flex: 1;
        }

        .sessions-available-container {
          text-align: center;
        }

        .title {
          color: ${colors.polarPlum};
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 1rem;
          letter-spacing: 0.2rem;
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
              max-width: 5rem;
              margin: 0 auto;
              border-radius: 10rem;
              margin-bottom: 0.5rem;
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
          width: 80%;

          button {
            width: 94%;
          }

          .buy-btn {
            background-color: ${colors.black};
            color: ${colors.white};
          }

          .cancel-btn {
            color: red;
            border-color: red;
            margin-top: 1rem;
          }
        }
      }
    }
  }

  @media ${device.mobile} {
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
  const dispatch = useDispatch();
  const isPageLoading = useSelector(getPageLoading);
  const sessionInfo = useSelector(getSessionInfo);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const userProfile = useSelector(getUserProfile);
  const shouldShowCancelModal = useSelector(getShowCancelModal);

  const reserveSessionAction = () => dispatch(reserveSessionInit(sessionInfo.id, date));
  const confirmSessionAction = () => dispatch(confirmSessionInit(sessionInfo.userSession.id));
  const cancelSessionAction = () => dispatch(cancelSessionInit(sessionInfo.userSession.id));
  const showCancelModalAction = () => dispatch(showCancelModal());

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(initialLoadAuthInit(id, date));
    } else {
      dispatch(initialLoadInit(id, date));
    }
  }, [dispatch, id, date, isAuthenticated]);

  if (isNil(id)) {
    return <Redirect to="/" />;
  }

  return isPageLoading ? (
    <Loading />
  ) : (
    <SessionsPageContainer>
      <NewModal shouldClose closeHandler={showCancelModalAction} isOpen={shouldShowCancelModal}>
        <CancelModal
          closeHandler={showCancelModalAction}
          cancelSessionAction={cancelSessionAction}
        />
      </NewModal>
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
            <div className="date-container">
              <span className="title">Date</span>
              <span className="text">{longSessionDate(date)}</span>
            </div>
            <div className="time-container">
              <span className="title">Time</span>
              <span className="text">{hourRange(sessionInfo.time)}</span>
            </div>
            <div className="address-container">
              <span className="title">Address</span>
              <span className="text">{sessionInfo.location.direction}</span>
              <span className="location">{`${sessionInfo.location.city}, CA ${sessionInfo.location.zipcode}`}</span>
            </div>
            {isAuthenticated && (
              <span className="sessions-available-container">{`You have ${userProfile.credits} available sessions`}</span>
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
                  {sessionInfo.sem.name ? sessionInfo.sem.name : 'Not assigned'}
                </span>
              </div>
              <div className="referee-container">
                <span className="title">Your Referee</span>
                {isNil(sessionInfo.referee) || isNil(sessionInfo.referee.imageUrl) ? (
                  <div className="not-assigned-container">
                    <UserSvg />
                  </div>
                ) : (
                  <img src={sessionInfo.referee.imageUrl} alt="SEM" />
                )}
                <span className="name">
                  {sessionInfo.referee.name ? sessionInfo.referee.name : 'Not assigned'}
                </span>
              </div>
            </div>
            <div className="button-container">
              <SessionButtons
                session={sessionInfo}
                reserveSessionAction={reserveSessionAction}
                confirmSessionAction={confirmSessionAction}
                showCancelModalAction={showCancelModalAction}
                userProfile={userProfile}
              />
              {userProfile.credits === 0 && (
                <Link to={ROUTES.SERIES}>
                  <AlternativeButton className="buy-btn">Buy Credits</AlternativeButton>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </SessionsPageContainer>
  );
};

export default SessionsPage;
