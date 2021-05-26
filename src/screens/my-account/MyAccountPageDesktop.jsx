import React from 'react';
import styled from 'styled-components';
import { object, arrayOf } from 'prop-types';

import colors from 'shared/styles/constants';
import Tabs from 'shared/components/Tabs';
import SessionsList from './components/SessionsList';
import MyProfile from './components/MyProfile';
import MyCredits from './components/MyCredits';

const MyAccountPageContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2rem;

  .sidebar-container {
    min-width: 365px;
    width: 25%;
    background: ${colors.white};
    box-shadow: 0px 2px 20px rgba(black, 0.15);
  }
  .content-container {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  @media (max-width: 991px) {
    display: none;
  }
`;

export const MyAccountPageDesktop = ({
  userProfile,
  previousSessions,
  upcomingSessions,
  semUpcomingSessions,
}) => (
  <MyAccountPageContainer className="my-account-desktop">
    <div className="sidebar-container">
      <MyProfile profile={userProfile} />
      <MyCredits
        dropinCredits={userProfile.credits}
        subscriptionCredits={userProfile.subscriptionCredits}
      />
    </div>
    <div className="content-container">
      {userProfile.isSem || userProfile.isReferee ? (
        <Tabs>
          <div label="As ETM">
            <SessionsList title="UPCOMING SESSIONS" sessions={semUpcomingSessions} isSem />
          </div>
          <div label="As Player">
            <SessionsList title="UPCOMING SESSIONS" sessions={upcomingSessions} />
            <SessionsList title="PAST SESSIONS" sessions={previousSessions} past />
          </div>
        </Tabs>
      ) : (
        <div>
          <SessionsList title="UPCOMING SESSIONS" sessions={upcomingSessions} />
          <SessionsList title="PAST SESSIONS" sessions={previousSessions} past />
        </div>
      )}
    </div>
  </MyAccountPageContainer>
);

MyAccountPageDesktop.propTypes = {
  userProfile: object,
  previousSessions: arrayOf(object),
  upcomingSessions: arrayOf(object),
  semUpcomingSessions: arrayOf(object),
};

export default MyAccountPageDesktop;
