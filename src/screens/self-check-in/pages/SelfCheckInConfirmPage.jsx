import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import Button from 'shared/components/Button';
import SelfCheckInLayout from 'shared/components/layout/SelfCheckInLayout';
import { getUserSessions, selfCheckInUserSessions } from 'screens/self-check-in/actionCreators';
import { selectUserSessions, getPageLoading } from 'screens/self-check-in/reducer';
import ZeroState from 'screens/self-check-in/components/ZeroState';
import SessionLogo from 'screens/sessions/components/SessionLogo';
import SignalBarsSvg from 'shared/components/svg/SignalBarsSvg';
import { formatSessionEndTime, formatSessionTime } from 'shared/utils/date';
import Loading from 'shared/components/Loading';

const SelfCheckInConfirmPage = () => {
  const dispatch = useDispatch();
  const { params } = useRouteMatch();
  const { search } = useLocation();
  const { qrData } = queryString.parse(search);
  const locationId = params?.id;

  const userSessions = useSelector(selectUserSessions);
  const loading = useSelector(getPageLoading);

  useEffect(() => {
    dispatch(getUserSessions(locationId));
  }, []);

  const handleCheckIn = () => {
    const userSessionIds = userSessions.map((userSession) => userSession.id);
    dispatch(selfCheckInUserSessions(userSessionIds, qrData));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <SelfCheckInLayout>
      <div className="mx-4 min-h-screen h-full flex flex-col items-center justify-center">
        {userSessions.length === 0 && !loading && <ZeroState />}
        {userSessions.map((userSession) => {
          const { session } = userSession;
          const skillLevel = session?.skillLevel;

          return (
            <div className="w-full mb-6" key={userSession.id}>
              <div className="flex items-end justify-center">
                <span className="font-shapiro95_super_wide text-base mr-2 text-white">
                  {formatSessionTime(session.time)}
                </span>
                <span className="text-white/60 text-sm">
                  - {formatSessionEndTime(session.time, session.durationMinutes)}
                </span>
              </div>
              <div className="bg-cc-blue-700 py-6 px-4">
                <SessionLogo session={session} className="w-24 mx-auto" />
                <hr className="my-4 border-cc-blue-100" />
                <span className="block mx-auto text-center font-shapiro95_super_wide text-lg">
                  {session.location.name}
                </span>
                {session.themeTitle && (
                  <span className="block mx-auto text-center text-lg">{session.themeTitle}</span>
                )}
                {skillLevel && (
                  <div className="flex items-center justify-center mt-4">
                    <SignalBarsSvg className="w-6 -mt-1 mr-2" />
                    <span className="text-base">{`${skillLevel.min} - ${skillLevel.max}`}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="fixed z-50 bottom-12 inset-x-0 mx-auto w-full px-4">
        <Button
          size="lg"
          className="w-full"
          onClick={handleCheckIn}
          loading={loading}
          disabled={userSessions.length === 0}
        >
          {userSessions.length > 1 ? 'CHECK IN ALL' : 'CHECK IN'}
        </Button>
      </div>
    </SelfCheckInLayout>
  );
};

export default SelfCheckInConfirmPage;
