import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useParams, useLocation, useHistory } from 'react-router-dom';

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
import SessionGuests from 'screens/sessions/components/SessionGuests';
import SessionAlert from 'screens/sessions/components/SessionAlert';
import SessionInformation from 'screens/sessions/components/SessionInformation';
import SessionRoster from 'screens/sessions/components/SessionRoster';
import SessionOfficials from 'screens/sessions/components/SessionOfficials';
import FreeBookingExpiredModal from 'screens/sessions/components/modals/FreeBookingExpiredModal';

const FROM_FREE_BOOKING_QUERY_PARAM = 'fromFreeBooking';

const Session = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = useLocation();
  const { id, date } = useParams();

  const isAuthenticated = useSelector(getIsAuthenticated);
  const isLoading = useSelector(getPageLoading);
  const session = useSelector(getSessionInfo);

  const searchParams = new URLSearchParams(search);
  const comesFromFreeBooking = searchParams.get(FROM_FREE_BOOKING_QUERY_PARAM) === 'true';
  const { spotsLeft, maxCapacity, themeTitle, allowFreeBooking, reserved, onWaitlist, past } =
    session;

  const [showFreeBookingExpiredModal, setShowFreeBookingExpiredModal] = useState(false);

  const closeFreeBookingExpiredModal = () => {
    searchParams.delete(FROM_FREE_BOOKING_QUERY_PARAM);
    history.replace({ search: searchParams.toString() });
    setShowFreeBookingExpiredModal(false);
  };

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

  useEffect(() => {
    setShowFreeBookingExpiredModal(
      !isLoading &&
        isAuthenticated &&
        comesFromFreeBooking &&
        !allowFreeBooking &&
        !reserved &&
        !onWaitlist &&
        !past
    );
  }, [isAuthenticated, isLoading, session]);

  if (!id) {
    return <Redirect to={ROUTES.HOME} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <PageLayout>
        <SectionLayout>
          <SessionHeaderAction session={session} date={date} />
          <div className="sm:flex sm:justify-between sm:items-center mb-5 sm:mb-8">
            <h1 className="font-shapiro95_super_wide text-3xl sm:text-4xl mb-3 sm:mb-0">
              Session Details
            </h1>
            <UserCreditsLeft session={session} className="sm:text-right" />
          </div>
          <div className="md:flex md:justify-between md:items-center mb-6">
            <div>
              {themeTitle && (
                <div className="mb-6 md:mb-0">
                  <h3 className="font-shapiro95_super_wide text-lg sm:text-xl">Crosscourt</h3>
                  <div className="text-white text-opacity-80 mt-1">{themeTitle}</div>
                </div>
              )}
            </div>
            <div className="md:flex md:items-end">
              <div>
                {sessionRestrictions(session).map((restriction, index) => (
                  <div key={index} className="flex items-center text-sm mb-1">
                    <LockSvg className="shrink-0 w-4 mr-2" />
                    {restriction}
                  </div>
                ))}
              </div>
              <SessionGuests session={session} className="mt-6 md:mt-0 md:ml-8" />
            </div>
          </div>
          <SessionAlert session={session} className="mb-4" />
          <SessionInformation session={session} date={date} className="mb-4" />
          <div className="flex flex-wrap justify-center -mr-2 text-xs md:text-sm">
            {sessionInformation(session).map((information, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 shrink-0 grow pr-2 pb-2"
              >
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
      <FreeBookingExpiredModal
        isOpen={showFreeBookingExpiredModal}
        closeHandler={closeFreeBookingExpiredModal}
        session={session}
      />
    </>
  );
};

export default Session;
