import React from 'react';
import styled from 'styled-components';
import { object, arrayOf } from 'prop-types';

import device from 'shared/styles/mediaQueries';
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
    width: 25%;
    background: ${colors.white};
    box-shadow: 0px 2px 20px rgba(black, 0.15);
  }
  .content-container {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  @media ${device.mobile} {
    display: none;
  }
`;

export const MyAccountPageDesktop = ({
  userProfile,
  previousSessions,
  upcomingSessions,
  semUpcomingSessions,
}) => (
  <MyAccountPageContainer>
    <div className="sidebar-container">
      <MyProfile profile={userProfile} />
      <MyCredits credits={userProfile.credits} />
    </div>
    <div className="content-container">
      {userProfile.isSem || userProfile.isReferee ? (
        <Tabs>
          <div label="As SEM">
            <SessionsList title="Upcoming sessions" sessions={semUpcomingSessions} isSem />
          </div>
          <div label="As player">
            <SessionsList title="Upcoming sessions" sessions={upcomingSessions} />
            <SessionsList title="Previous sessions" sessions={previousSessions} past />
          </div>
        </Tabs>
      ) : (
        <div>
          <SessionsList title="Upcoming sessions" sessions={upcomingSessions} />
          <SessionsList title="Previous sessions" sessions={previousSessions} past />
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
