import React from 'react';
import PropTypes from 'prop-types';

import { isSameDay, sortSessionsByDate } from 'shared/utils/date';
import ExpandedLayout from 'shared/components/layout/ExpandedLayout';
import Session from 'screens/locations/components/Session';

const SessionsList = ({ availableSessions, selectedDate, showingFreeSessionCreditAdded }) => {
  const sessionList = availableSessions.filter(({ startTime }) =>
    isSameDay(startTime, selectedDate)
  );
  const sortedSessions = sortSessionsByDate(sessionList);

  if (sortedSessions.length === 0) {
    return (
      <div className="font-shapiro95_super_wide text-2xl md:text-4xl text-white text-opacity-60 uppercase text-center py-12">
        No Sessions Scheduled <br className="hidden md:block" />
        For This Date
      </div>
    );
  }

  return (
    <ExpandedLayout
      smBreakpoint={false}
      mdBreakpoint={false}
      lgBreakpoint={false}
      xlBreakpoint={false}
    >
      {sortedSessions.map((session, index) => (
        <Session
          key={index}
          session={session}
          showingFreeSessionCreditAdded={showingFreeSessionCreditAdded}
          className="mb-10 md:mb-4"
        />
      ))}
    </ExpandedLayout>
  );
};

SessionsList.defaultProps = {
  showingFreeSessionCreditAdded: false,
};

SessionsList.propTypes = {
  availableSessions: PropTypes.arrayOf(PropTypes.shape()),
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  showingFreeSessionCreditAdded: PropTypes.bool,
};

export default SessionsList;
