import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import { pluralize } from 'shared/utils/helpers';
import { sessionInformation, sessionRestrictions } from 'screens/sessions/utils';
import { resetLoading, removeSessionFromStorage } from 'shared/actions/actionCreators';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getPageLoading, getSessionInfo } from 'screens/sessions/reducer';
import { initialLoadInit, initialLoadAuthInit } from 'screens/sessions/actionCreators';
import Loading from 'shared/components/Loading';
import LockSvg from 'shared/components/svg/LockSvg';
import PageLayout from 'shared/components/layout/PageLayout';
import SectionLayout from 'shared/components/layout/SectionLayout';
import SessionHeaderAction from 'screens/sessions/components/SessionHeaderAction';
import UserCreditsLeft from 'screens/sessions/components/UserCreditsLeft';
import SessionInformation from 'screens/sessions/components/SessionInformation';
import SessionRoster from 'screens/sessions/components/SessionRoster';
import SessionOfficials from 'screens/sessions/components/SessionOfficials';

const Session = () => {
  const { id, date } = useParams();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(getIsAuthenticated);
  const isLoading = useSelector(getPageLoading);
  const session = useSelector(getSessionInfo);

  const { spotsLeft, maxCapacity, themeTitle } = session;

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(removeSessionFromStorage());
      dispatch(initialLoadAuthInit(id, date));
    } else {
      dispatch(initialLoadInit(id, date));
    }

    return () => {
      dispatch(resetLoading());
    };
  }, [dispatch, id, date, isAuthenticated]);

  if (!id) {
    return <Redirect to={ROUTES.HOME} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <PageLayout>
      <SectionLayout>
        <SessionHeaderAction session={session} date={date} />
        <div className="sm:flex sm:justify-between sm:items-center mb-5 sm:mb-8">
          <h1 className="font-shapiro95_super_wide text-3xl sm:text-4xl mb-3 sm:mb-0">
            Session Details
          </h1>
          <UserCreditsLeft session={session} className="sm:text-right" />
        </div>
        <div className="sm:flex sm:justify-between sm:items-center mb-6">
          <div>
            {themeTitle && (
              <div className="mb-5 sm:mb-0">
                <h3 className="font-shapiro95_super_wide text-lg sm:text-xl">Cross-Court</h3>
                <div className="text-white text-opacity-80 mt-1">{themeTitle}</div>
              </div>
            )}
          </div>
          <div>
            {sessionRestrictions(session).map((restriction, index) => (
              <div key={index} className="flex items-center text-sm mb-1">
                <LockSvg className="shrink-0 w-4 mr-2" />
                {restriction}
              </div>
            ))}
          </div>
        </div>
        <SessionInformation session={session} date={date} className="mb-4" />
        <div className="flex flex-wrap justify-center -mr-2 text-xs md:text-sm">
          {sessionInformation(session).map((information, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 shrink-0 grow pr-2 pb-2">
              <div className="bg-cc-blue-500 h-full flex justify-center items-center text-center p-3">
                {information}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <h3 className="font-shapiro95_super_wide text-xl mb-1">
            Roster {maxCapacity ? `${maxCapacity - spotsLeft}/${maxCapacity}` : ''}
          </h3>
          {spotsLeft !== null && (
            <div className="font-shapiro95_super_wide text-cc-purple text-sm mb-3">
              {`${spotsLeft} ${pluralize('spot', spotsLeft)} left${spotsLeft <= 5 ? '!' : ''}`}
            </div>
          )}
          <SessionRoster session={session} date={date} showExpanded className="mb-12" />
          <SessionOfficials session={session} />
        </div>
      </SectionLayout>
    </PageLayout>
  );
};

export default Session;
