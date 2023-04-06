import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, take } from 'ramda';
import ROUTES from 'shared/constants/routes';
import Link from 'shared/components/Link';
import BasketballIlustrationSvg from 'shared/components/svg/BasketballIlustrationSvg';
import Session from './Session';

const SessionsList = ({ sessions, past, isSem }) => {
  const filteredSessions = sessions.filter((session) => session.state !== 'canceled');
  const sesionsToShow = take(3, filteredSessions);

  return (
    <div className="bg-white">
      {past && <hr className="mx-6 border-cc-black opacity-70" />}
      {isEmpty(sesionsToShow) ? (
        <div className="flex flex-col items-center justify-center p-8">
          {!past && <BasketballIlustrationSvg className="text-cc-black" />}
          <h3 className="text-black text-2xl my-2 font-shapiro95_super_wide">
            You have no {past ? 'past' : 'upcoming'} sessions yet.
          </h3>
          {!past && !isSem && (
            <Link to={ROUTES.LOCATIONS} className="text-sm">
              View the schedule
            </Link>
          )}
        </div>
      ) : (
        <div className="p-6">
          <div className={`flex flex-col md:flex-row ${past ? 'opacity-70' : ''}`}>
            <h3 className="text-cc-black md:w-1/5 text-2xl md:text-xl font-shapiro95_super_wide">
              {past ? 'Past' : 'Upcoming'} <br /> Sessions
            </h3>
            <div className="flex flex-col md:flex-row md:flex-wrap w-full">
              {sesionsToShow.map((session) => (
                <Session past={past} key={session.id} sessionInfo={session} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

SessionsList.propTypes = {
  past: PropTypes.bool,
  isSem: PropTypes.bool,
  sessions: PropTypes.arrayOf(PropTypes.object),
};

export default SessionsList;
