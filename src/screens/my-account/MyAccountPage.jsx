import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'ramda';
import Loading from 'shared/components/Loading';
import PageLayout from 'shared/components/layout/PageLayout';

import MyProfile from './components/MyProfile';
import { initialLoadInit } from './actionCreators';
import {
  getPageLoading,
  getUserProfile,
  getPreviousSessions,
  getUpcomingSessions,
  getSemUpcomingSessions,
} from './reducer';
import MySessions from './components/MySessions';
import MyInfo from './components/MyInfo';

export const MyAccountPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getPageLoading);
  const userProfile = useSelector(getUserProfile);

  const previousSessions = useSelector(getPreviousSessions);
  const upcomingSessions = useSelector(getUpcomingSessions);
  const semUpcomingSessions = useSelector(getSemUpcomingSessions);

  useEffect(() => {
    dispatch(initialLoadInit());
  }, [dispatch]);

  if (isLoading || isEmpty(userProfile)) {
    return <Loading />;
  }

  return (
    <PageLayout>
      <MyProfile profile={userProfile} />
      <MySessions
        profile={userProfile}
        previousSessions={previousSessions}
        upcomingSessions={upcomingSessions}
        semUpcomingSessions={semUpcomingSessions}
      />
      <MyInfo profile={userProfile} />
    </PageLayout>
  );
};

export default MyAccountPage;
