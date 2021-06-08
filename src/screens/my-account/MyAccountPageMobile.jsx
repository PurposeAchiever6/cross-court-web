import React from 'react';
import styled from 'styled-components';
import { object, arrayOf } from 'prop-types';

import Tabs from 'shared/components/Tabs';
import MyProfile from './components/MyProfile';
import SessionsList from './components/SessionsList';
import MyCredits from './components/mobile/MyCredits';

const MyAccountPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 992px) {
    display: none;
  }
`;

export const MyAccountPageMobile = ({
  userProfile,
  previousSessions,
  upcomingSessions,
  semUpcomingSessions,
}) => (
  <MyAccountPageContainer className="my-account-mobile">
    <Tabs>
      <div label="MY ACCOUNT">
        <MyProfile profile={userProfile} showTitle={false} />
      </div>
      <div label="MY CREDITS">
        <MyCredits
          isUnlimited={userProfile.unlimitedCredits}
          credits={userProfile.totalCredits}
          hasActiveSubscription={!!userProfile.activeSubscription}
        />
      </div>
    </Tabs>

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
  </MyAccountPageContainer>
);

MyAccountPageMobile.propTypes = {
  userProfile: object,
  previousSessions: arrayOf(object),
  upcomingSessions: arrayOf(object),
  semUpcomingSessions: arrayOf(object),
};

export default MyAccountPageMobile;
