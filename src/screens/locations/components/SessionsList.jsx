import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { isEmpty } from 'ramda';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ROUTES from 'shared/constants/routes';
import colors from 'shared/styles/constants';
import SessionLevel from 'shared/components/SessionLevel';
import FewSessionsLeftTriangle from 'shared/images/warning-triangle.png';

import {
  hourRange,
  urlFormattedDate,
  isSameDay,
  sortSessionsByDate,
  formatSessionTime,
  formatSessionDate,
} from 'shared/utils/date';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import { openContactFormForUser } from 'shared/utils/contactForm';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

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

const fewSpotsLeftText = 'FEW SPOTS LEFT';

const SessionsList = ({ availableSessions, selectedDate }) => {
  const history = useHistory();
  const isAuthenticated = useSelector(getIsAuthenticated);
  const currentUser = useSelector(getUserProfile);

  const sessionList = availableSessions.filter(({ startTime }) =>
    isSameDay(startTime, selectedDate)
  );
  const sortedSessions = sortSessionsByDate(sessionList);

  const onClickJoinWaitlist = (sessionTime, sessionDate, locationName) => {
    if (!isAuthenticated) {
      return history.push(ROUTES.LOGIN);
    }

    const message =
      `I would like to be added to the waitlist for the ${sessionTime} ` +
      `session on ${sessionDate} at ${locationName}. Please notify me ` +
      `if a spot opens up. You can reach me at ${currentUser.phoneNumber}.`;

    openContactFormForUser(currentUser, message);
  };

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
        ({ id, startTime, time, full, location, skillLevel, spotsLeft, reserved, past }) => {
          const sessionTime = formatSessionTime(time);
          const URLdate = urlFormattedDate(startTime);
          const sessionDate = formatSessionDate(startTime);
          let button;

          if (reserved || past) {
            button = (
              <PrimaryButton to={`/session/${id}/${URLdate}`} inverted>
                SEE DETAILS
              </PrimaryButton>
            );
          } else if (full) {
            button = (
              <PrimaryButton
                onClick={() => onClickJoinWaitlist(sessionTime, sessionDate, location.name)}
              >
                JOIN WAITLIST
              </PrimaryButton>
            );
          } else {
            button = <PrimaryButton to={`/session/${id}/${URLdate}`}>RESERVE</PrimaryButton>;
          }

          return (
            <div
              className={`flex border-b py-6 md:px-5 justify-between w-full items-center overflow-hidden ${
                past ? ' opacity-30' : ''
              }`}
              key={id}
            >
              <div className="flex flex-col">
                <p className="font-bold whitespace-nowrap text-sm sm:text-base">
                  {hourRange(time)}
                </p>
                <p className="font-shapiro96_inclined_wide overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {location.name}
                </p>
                <SessionLevel showInfo level={skillLevel} />
              </div>
              <div className="flex flex-col items-end pl-8">
                {button}
                {spotsLeft > 0 && spotsLeft <= 5 && fewSpotsLeftText && (
                  <div className="flex items-center mt-2 whitespace-nowrap">
                    <img alt="" className="w-4 h-4" src={FewSessionsLeftTriangle} />
                    <p className="text-2xs sm:text-xs mt-1 ml-2">{fewSpotsLeftText}</p>
                  </div>
                )}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
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
};

export default SessionsList;
