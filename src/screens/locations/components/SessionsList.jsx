import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { isEmpty } from 'ramda';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faInfoCircle, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ROUTES from 'shared/constants/routes';
import colors from 'shared/styles/constants';
import Badge from 'shared/components/Badge';
import OnboardingTour from 'shared/components/OnboardingTour';
import { isUserInLegalAge } from 'shared/utils/user';
import { reserveTeamReservationAllowed } from 'shared/utils/sessions';
import SessionWarningInfo from 'shared/components/SessionWarningInfo';

import {
  hourRange,
  urlFormattedDate,
  isSameDay,
  sortSessionsByDate,
  formatSessionDate,
} from 'shared/utils/date';
import { isUserInFirstSessionFlow, isUserInFirstFreeSessionFlow } from 'shared/utils/user';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import { getSessionsLoadingBtns } from 'screens/sessions/reducer';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import {
  joinSessionWaitlistInit,
  removeSessionWaitlistInit,
} from 'screens/sessions/actionCreators';
import { isOnboardingTourEnable } from 'shared/utils/onboardingTour';
import SessionVote from 'screens/locations/components/SessionVote';
import SessionRoster from 'screens/locations/components/SessionRoster';
import SessionBadge from 'screens/sessions/components/SessionBadge';
import { hasConfirmOutsideOfSkillLevelSession } from 'shared/utils/outsideOfSkillLevel';
import OutsideOfSkillLevelModal from './OutsideOfSkillLevelModal';

const NoSessionContainer = styled.div`
  .title {
    font-family: shapiro95_super_wide;
    color: ${colors.brandBlack};
    font-size: 20px;
    line-height: 20px;
    @media (min-width: 992px) {
      font-size: 33px;
      line-height: 33px;
    }
  }

  .subtitle {
    color: ${colors.brandBlack};
    font-family: dharma_gothic_cexbold;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: ${colors.brandBlack};
    font-family: shapiro95_super_wide;
    font-size: 20px;
    line-height: 20px;
    @media (min-width: 992px) {
      font-size: 59px;
      line-height: 59px;
    }
  }
`;

const SessionsList = ({ availableSessions, selectedDate, showingFreeSessionCreditAdded }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [showOutsideSkillLevelModal, setShowOutsideSkillLevelModal] = useState(false);
  const [showSessionRoster, setShowSessionRoster] = useState(null);
  const [idModal, setIdModal] = useState('');
  const [URLDateModal, setURLDateModal] = useState('');
  const [levelNameModal, setLevelNameModal] = useState('');
  const isAuthenticated = useSelector(getIsAuthenticated);
  const currentUser = useSelector(getUserProfile);
  const sessionsLoadingBtns = useSelector(getSessionsLoadingBtns);

  const isLegalAge = isUserInLegalAge(currentUser);
  const isReserveTeam = currentUser.reserveTeam;

  const sessionList = availableSessions.filter(({ startTime }) =>
    isSameDay(startTime, selectedDate)
  );
  const sortedSessions = sortSessionsByDate(sessionList);

  const onClickJoinWaitlist = (sessionId, sessionDate) => {
    if (!isAuthenticated) {
      return history.push(ROUTES.LOGIN);
    }

    if (!currentUser.unlimitedCredits && currentUser.totalCredits === 0) {
      return history.push({
        pathname: ROUTES.MEMBERSHIPS,
        state: { showNoCreditsAnimation: true },
      });
    }

    dispatch(joinSessionWaitlistInit(sessionId, sessionDate));
  };

  const onClickRemoveFromWaitlist = (sessionId, sessionDate) => {
    dispatch(removeSessionWaitlistInit(sessionId, sessionDate));
  };

  const showModalForOutsideSkillLevel = (e, outsideOfSkillLevel, id, URLdate, levelName) => {
    if (outsideOfSkillLevel && !hasConfirmOutsideOfSkillLevelSession(currentUser)) {
      e.preventDefault();
      setIdModal(id);
      setURLDateModal(URLdate);
      setLevelNameModal(levelName);
      setShowOutsideSkillLevelModal(true);
    }
  };

  const goToReserveDetails = () => history.push(`/session/${idModal}/${URLDateModal}`);

  const onboardingTourId = 'onboarding-tour-sessions-list';
  const isFirstSessionFreeFlow = isUserInFirstFreeSessionFlow(currentUser);
  const isFirstSessionFlow = isUserInFirstSessionFlow(currentUser);
  const isOnboardingTourEnabled =
    isOnboardingTourEnable(onboardingTourId) &&
    !showingFreeSessionCreditAdded &&
    (!isAuthenticated || isFirstSessionFlow);

  const userSkillRating = parseInt(currentUser.skillRating);

  if (isEmpty(sortedSessions)) {
    return (
      <div className="flex flex-col h-full justify-center">
        <NoSessionContainer className="py-4 text-center">
          <p className="title">NO SESSIONS SCHEDULED</p>
          <p className="subtitle">FOR THIS DATE</p>
        </NoSessionContainer>
      </div>
    );
  }

  return (
    <div className="px-3 font-shapiro45_welter_extd">
      {sortedSessions.map(
        (
          {
            id,
            startTime,
            time,
            durationMinutes,
            full,
            location,
            skillLevel,
            spotsLeft,
            reserved,
            past,
            isPrivate,
            comingSoon,
            onWaitlist,
            waitlistPlacement,
            isOpenClub,
            votes,
            voted,
            womenOnly,
            skillSession,
            allSkillLevelsAllowed,
            reservations,
          },
          index
        ) => {
          const URLdate = urlFormattedDate(startTime);
          const sessionDate = formatSessionDate(startTime);
          const showRoster = showSessionRoster === `${id}${sessionDate}`;

          let button;

          const outsideOfSkillLevel =
            userSkillRating < skillLevel.min || userSkillRating > skillLevel.max;
          const cannotReserveBecauseSkillLevel = !allSkillLevelsAllowed && outsideOfSkillLevel;

          const reserveTeamAllowed = reserveTeamReservationAllowed({
            sessionTime: time,
            sessionDate,
            reservationsCount: reservations.length,
            isOpenClub,
            past,
            isReserveTeam,
            isPrivate,
          });

          if (comingSoon) {
            button = (
              <PrimaryButton
                fontSize="12px"
                w="9.5rem"
                px="0.5rem"
                className={past ? '' : 'opacity-30 pointer-events-none'}
                inverted
              >
                COMING SOON
              </PrimaryButton>
            );
          } else if (isOpenClub) {
            button = (
              <PrimaryButton
                fontSize="12px"
                w="9.5rem"
                px="0.5rem"
                to={`/session/${id}/${URLdate}/open-club`}
              >
                OPEN CLUB
              </PrimaryButton>
            );
          } else if (reserved || past) {
            button = (
              <PrimaryButton fontSize="12px" w="9.5rem" to={`/session/${id}/${URLdate}`} inverted>
                SEE DETAILS
              </PrimaryButton>
            );
          } else if (onWaitlist) {
            button = (
              <PrimaryButton
                onClick={() => onClickRemoveFromWaitlist(id, sessionDate)}
                w="9.5rem"
                fontSize="11px"
                loading={sessionsLoadingBtns.includes(id)}
              >
                OUT WAITLIST
              </PrimaryButton>
            );
          } else if (full) {
            button = (
              <PrimaryButton
                onClick={() => onClickJoinWaitlist(id, sessionDate)}
                w="9.5rem"
                fontSize="11px"
                disabled={!isLegalAge || cannotReserveBecauseSkillLevel}
                loading={sessionsLoadingBtns.includes(id)}
              >
                JOIN WAITLIST
              </PrimaryButton>
            );
          } else {
            button = (
              <>
                <PrimaryButton
                  id="sessions-list-reserve-btn"
                  to={`/session/${id}/${URLdate}`}
                  w="9.5rem"
                  fontSize="12px"
                  disabled={!isLegalAge || cannotReserveBecauseSkillLevel || !reserveTeamAllowed}
                  onClick={(e) =>
                    showModalForOutsideSkillLevel(
                      e,
                      outsideOfSkillLevel,
                      id,
                      URLdate,
                      skillLevel.name
                    )
                  }
                >
                  RESERVE
                </PrimaryButton>
                <OnboardingTour
                  id={onboardingTourId}
                  timeout={1000}
                  enabled={isOnboardingTourEnabled}
                  steps={[
                    {
                      element: '#sessions-list-session-level-info',
                      intro: `Each session is assigned a skill level range. Refer to this module when looking for a session that fits your playstyle. Hover over or click the purple icon <span class="text-cc-purple">${
                        icon(faInfoCircle).html
                      }</span> for more skill based information.`,
                    },
                    {
                      element: '#sessions-list-reserve-btn',
                      intro: isAuthenticated
                        ? `Tap <strong>RESERVE</strong> to see the session details and reserve your first ${
                            isFirstSessionFreeFlow ? 'free' : ''
                          } session.`
                        : 'Tap <strong>RESERVE</strong> to see the session details. Then create a profile to receive your free session credit and finish booking.',
                    },
                  ]}
                />
              </>
            );
          }

          return (
            <div
              key={index}
              className={`border-b py-6 md:px-5 overflow-hidden ${
                past ? 'opacity-30 pointer-events-none' : ''
              }`}
            >
              <div className="flex justify-between items-center" key={id}>
                <div
                  className={`flex flex-col items-start ${
                    comingSoon && !past ? 'opacity-30 pointer-events-none' : ''
                  }`}
                >
                  <p className="font-bold whitespace-nowrap text-sm sm:text-base">
                    {hourRange(time, durationMinutes)}
                    {isPrivate && (
                      <Badge
                        variant="black"
                        className="block sm:inline-block sm:ml-3 mt-1 mb-2 sm:mt-0 sm:mb-0"
                      >
                        Private
                      </Badge>
                    )}
                  </p>
                  <p className="font-shapiro96_inclined_wide overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {location.name}
                  </p>
                  <div
                    id={`${
                      !isOpenClub && !womenOnly && !skillSession
                        ? 'sessions-list-session-level-info'
                        : ''
                    }`}
                    className="mt-2"
                  >
                    <SessionBadge
                      skillLevel={skillLevel}
                      isOpenClub={isOpenClub}
                      womenOnly={womenOnly}
                      skillSession={skillSession}
                    />
                  </div>
                  {!isOpenClub && (
                    <div
                      className="flex items-center font-shapiro96_inclined_wide text-xs uppercase mt-3 cursor-pointer"
                      onClick={() =>
                        setShowSessionRoster(showRoster ? null : `${id}${sessionDate}`)
                      }
                    >
                      See Roster
                      <FontAwesomeIcon
                        className={`text-cc-purple text-lg ml-2 transition-transform ${
                          showRoster ? 'transform rotate-180' : ''
                        }`}
                        icon={faChevronDown}
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-col-reverse lg:flex-row items-center pl-8">
                  {isAuthenticated && comingSoon && !past && (
                    <SessionVote
                      sessionId={id}
                      sessionDate={sessionDate}
                      votes={votes}
                      voted={voted}
                      className="mt-2 lg:mt-0 lg:mr-4"
                    />
                  )}
                  <div className="flex flex-col items-end">
                    {button}
                    {!isOpenClub && !comingSoon && (
                      <SessionWarningInfo
                        isLegalAge={isLegalAge}
                        reserved={reserved}
                        onWaitlist={onWaitlist}
                        cannotReserveBecauseSkillLevel={cannotReserveBecauseSkillLevel}
                        skillLevelName={skillLevel.name}
                        reserveTeamAllowed={reserveTeamAllowed}
                        isReserveTeam={isReserveTeam}
                        full={full}
                        spotsLeft={spotsLeft}
                        past={past}
                      />
                    )}
                    {onWaitlist && !past && (
                      <div className="flex items-center justify-center self-center mt-2 whitespace-nowrap">
                        <p className="text-2xs sm:text-xs uppercase mt-1 ml-2">{`#${waitlistPlacement} on the waitlist`}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {showRoster && <SessionRoster users={reservations} className="mt-3" />}
            </div>
          );
        }
      )}
      <OutsideOfSkillLevelModal
        isOpen={showOutsideSkillLevelModal}
        closeHandler={() => setShowOutsideSkillLevelModal(false)}
        onConfirm={goToReserveDetails}
        level={levelNameModal}
        userProfile={currentUser}
      />
    </div>
  );
};

SessionsList.defaultProps = {
  showingFreeSessionCreditAdded: false,
};

SessionsList.propTypes = {
  availableSessions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      startTime: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      location: PropTypes.object.isRequired,
      level: PropTypes.object,
    })
  ),
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  showingFreeSessionCreditAdded: PropTypes.bool,
};

export default SessionsList;
