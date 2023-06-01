import React from 'react';
import PropTypes from 'prop-types';

import { sessionInformation, sessionRestrictions } from 'screens/sessions/utils';
import LockSvg from 'shared/components/svg/LockSvg';
import SessionRoster from 'screens/sessions/components/SessionRoster';

const SessionShowMore = ({ session, className }) => {
  const { startTime, comingSoon } = session;

  const informations = sessionInformation(session);
  const restrictions = sessionRestrictions(session);

  const showRoster = !comingSoon;
  const showInformations = informations.length > 0;
  const showRestrictions = restrictions.length > 0;

  const informationsMarginTop = showRoster;
  const restrictionsMarginTop = showRoster || showInformations;
  const nothingToShow = !showRoster && !showInformations && !showRestrictions;

  return (
    <div className={className}>
      <div className="border-t border-cc-blue-100 pt-6">
        {nothingToShow ? (
          <div className="text-center text-sm">Session information will be updated later on</div>
        ) : (
          <>
            {showRoster && (
              <SessionRoster session={session} date={startTime} className="text-center" />
            )}
            {showInformations && (
              <div
                className={`flex flex-wrap justify-center -mr-2 sm:-mr-3 text-xs md:text-sm ${
                  informationsMarginTop ? 'mt-6' : ''
                }`}
              >
                {informations.map((information, index) => (
                  <div
                    key={index}
                    className="w-1/2 lg:w-1/3 xl:w-1/4 shrink-0 grow pr-2 sm:pr-3 pb-2 sm:pb-3"
                  >
                    <div className="bg-cc-blue-500 h-full flex justify-center items-center text-center p-3">
                      {information}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {showRestrictions && (
              <div
                className={`flex flex-wrap justify-center items-center gap-2 md:gap-4 ${
                  restrictionsMarginTop ? 'mt-6' : ''
                }`}
              >
                {restrictions.map((restriction, index) => (
                  <React.Fragment key={index}>
                    <div className="flex items-center text-xs md:text-sm">
                      <LockSvg className="shrink-0 w-3 md:w-5 mr-1 md:mr-2" />
                      {restriction}
                    </div>
                    {index + 1 < restrictions.length && (
                      <div className="shrink-0 w-2 h-2 bg-white rounded-full" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

SessionShowMore.defaultProps = {
  className: '',
};

SessionShowMore.propTypes = {
  session: PropTypes.shape().isRequired,
  className: PropTypes.string,
};

export default SessionShowMore;
