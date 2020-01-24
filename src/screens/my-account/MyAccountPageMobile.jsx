import React from 'react';
import styled from 'styled-components';
import { object, arrayOf } from 'prop-types';

import device from 'shared/styles/mediaQueries';
import Tabs from 'shared/components/Tabs';
import UpcomingSessions from './components/UpcomingSessions';
import PastSessions from './components/PastSessions';
import MyProfile from './components/MyProfile';
import SessionsList from './components/SessionsList';
import MyCredits from './components/mobile/MyCredits';

const MyAccountPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media ${device.desktop} {
    display: none;
  }
`;

export const MyAccountPageMobile = ({
  userProfile,
  previousSessions,
  upcomingSessions,
  semUpcomingSessions,
}) => (
  <MyAccountPageContainer>
    <Tabs>
      <div label="My Profile">
        <MyProfile profile={userProfile} showTitle={false} />
      </div>
      <div label="My Credits">
        <MyCredits credits={userProfile.credits} />
      </div>
    </Tabs>

    {userProfile.isSem ? (
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
        <UpcomingSessions sessions={upcomingSessions} />
        <PastSessions sessions={previousSessions} />
      </div>
    )}
  </MyAccountPageContainer>
);

MyAccountPageMobile.propTypes = {
  userProfile: object,
  previousSessions: arrayOf(object),
  upcomingSessions: arrayOf(object),
  semUpcomingSessions: arrayOf(object),
};

export default MyAccountPageMobile;
