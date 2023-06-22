import React from 'react';
import PropTypes from 'prop-types';
import Tabs from 'shared/components/Tabs';
import SectionLayout from 'shared/components/layout/SectionLayout';
import SessionsList from 'screens/my-account/components/SessionsList';

const MySessions = ({ profile, previousSessions, upcomingSessions, semUpcomingSessions }) => (
  <SectionLayout className="mb-6">
    {profile.isSem || profile.isReferee ? (
      <Tabs alignLabels="around" className="mt-10" noActiveTab>
        <div label="As ETM">
          <SessionsList sessions={semUpcomingSessions} isSem />
        </div>
        <div label="As Player">
          <SessionsList sessions={upcomingSessions} />
          <SessionsList sessions={previousSessions} past />
        </div>
      </Tabs>
    ) : (
      <>
        <SessionsList sessions={upcomingSessions} />
        <SessionsList sessions={previousSessions} past />
      </>
    )}
  </SectionLayout>
);

MySessions.propTypes = {
  profile: PropTypes.shape().isRequired,
  previousSessions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  upcomingSessions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  semUpcomingSessions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default MySessions;
