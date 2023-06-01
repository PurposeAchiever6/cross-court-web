import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { isEmpty } from 'ramda';

import ROUTES from 'shared/constants/routes';
import { sessionGuestsAllowed } from 'screens/sessions/utils';
import { getSessionInfo } from 'screens/sessions/reducer';
import PageLayout from 'shared/components/layout/PageLayout';
import SessionInformation from 'screens/sessions/components/session-reserved/SessionInformation';
import ReferAFriend from 'screens/sessions/components/session-reserved/ReferAFriend';
import InviteAFriend from 'screens/sessions/components/session-reserved/InviteAFriend';

const SessionReserved = () => {
  const session = useSelector(getSessionInfo);

  if (isEmpty(session)) {
    return <Redirect to={ROUTES.LOCATIONS} />;
  }

  return (
    <PageLayout headerPadding>
      <div className="lg:flex">
        <div className="lg:w-1/2">
          <SessionInformation session={session} />
        </div>
        <div className="lg:w-1/2">
          {sessionGuestsAllowed(session) ? <InviteAFriend session={session} /> : <ReferAFriend />}
        </div>
      </div>
    </PageLayout>
  );
};

export default SessionReserved;
