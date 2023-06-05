import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { isEmpty } from 'ramda';

import ROUTES from 'shared/constants/routes';
import { getUserProfile } from 'screens/my-account/reducer';
import { getSessionInfo } from 'screens/sessions/reducer';
import PageLayout from 'shared/components/layout/PageLayout';
import SessionInformation from 'screens/sessions/components/session-reserved/SessionInformation';
import JoinTheCCTeam from 'screens/sessions/components/session-reserved/JoinTheCCTeam';

const FirstSessionReserved = () => {
  const currentUser = useSelector(getUserProfile);
  const session = useSelector(getSessionInfo);

  if (isEmpty(session)) {
    return <Redirect to={ROUTES.LOCATIONS} />;
  }

  if (currentUser.activeSubscription) {
    return <Redirect to={ROUTES.SESSIONRESERVED} />;
  }

  return (
    <PageLayout headerPadding>
      <div className="lg:flex">
        <div className="lg:w-1/2">
          <SessionInformation session={session} />
        </div>
        <div className="lg:w-1/2">
          <JoinTheCCTeam />
        </div>
      </div>
    </PageLayout>
  );
};

export default FirstSessionReserved;
