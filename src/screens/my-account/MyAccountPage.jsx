import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'ramda';
import Loading from 'shared/components/Loading';
import MyAcccountPageDesktop from './MyAccountPageDesktop';
import MyAcccountPageMobile from './MyAccountPageMobile';
import { initialLoadInit } from './actionCreators';
import {
  getPageLoading,
  getUserProfile,
  getPreviousSessions,
  getUpcomingSessions,
  getSemUpcomingSessions,
} from './reducer';

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
    <>
      <MyAcccountPageMobile
        userProfile={userProfile}
        previousSessions={previousSessions}
        upcomingSessions={upcomingSessions}
        semUpcomingSessions={semUpcomingSessions}
      />
      <MyAcccountPageDesktop
        userProfile={userProfile}
        previousSessions={previousSessions}
        upcomingSessions={upcomingSessions}
        semUpcomingSessions={semUpcomingSessions}
      />
    </>
  );
};

export default MyAccountPage;
