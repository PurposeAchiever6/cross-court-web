import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import { formatSessionTime, formatSessionEndTime } from 'shared/utils/date';
import { pluralize } from 'shared/utils/helpers';
import SignalBarsSvg from 'shared/components/svg/SignalBarsSvg';
import sklzLogoWhite from 'shared/images/logos/sklz-white.png';
import openClubLogoWhite from 'shared/images/logos/open-club-white.png';
import sessionsLogoWhite from 'shared/images/logos/sessions-white.png';
import SessionButton from 'screens/locations/components/SessionButton';
import SessionVote from 'screens/locations/components/SessionVote';
import SessionShowMore from 'screens/locations/components/SessionShowMore';

const Session = ({ session, showingFreeSessionCreditAdded, className }) => {
  const [showMore, setShowMore] = useState(false);

  const {
    time,
    durationMinutes,
    skillLevel,
    spotsLeft,
    past,
    comingSoon,
    themeTitle,
    themeSubheading,
  } = session;

  const sessionLogo = (() => {
    if (session.isOpenClub) {
      return { src: openClubLogoWhite, alt: 'open-club-logo', className: 'w-24' };
    }

    if (session.skillSession) {
      return { src: sklzLogoWhite, alt: 'skill-session-logo', className: 'w-24' };
    }

    return { src: sessionsLogoWhite, alt: 'session-logo', className: 'w-24' };
  })();

  const spotsLeftText = (() => {
    if (comingSoon) {
      return 'No spots yet';
    }

    if (spotsLeft || spotsLeft === 0) {
      return `${spotsLeft} ${pluralize('spot', spotsLeft)} left${spotsLeft <= 5 ? '!' : ''}`;
    }

    return null;
  })();

  return (
    <div className={className}>
      <div className={`md:flex max-w-[1150px] mx-auto ${past ? 'opacity-50' : ''}`}>
        <div className="md:text-right md:w-40 md:shrink-0 md:pt-3 md:mr-10 px-4 md:px-0 mb-2 md:mb-0">
          <span className="md:block font-shapiro95_super_wide text-lg mr-2 md:mr-0">
            {formatSessionTime(time)}
          </span>
          <span className="md:block text-white text-opacity-60 text-sm">
            - {formatSessionEndTime(time, durationMinutes)}
          </span>
        </div>
        <div className="relative bg-cc-blue-700 w-full p-4 md:p-6">
          {comingSoon && (
            <div className="absolute top-0 right-0 bg-white font-shapiro95_super_wide text-black text-xs uppercase px-2 py-1">
              Coming Soon
            </div>
          )}
          <div className="md:flex md:items-center mb-6 mb:mb-4">
            <img alt={sessionLogo.alt} className={sessionLogo.className} src={sessionLogo.src} />
            <div className="border-t md:border-t-0 mt-6 pt-6 md:mt-0 md:pt-0 md:ml-6 md:pl-6 md:border-l border-cc-blue-100 md:w-full">
              <div className="md:flex md:justify-between md:items-start md:w-full">
                <div className="md:self-center mb-6 md:mb-0">
                  {themeTitle && (
                    <h3 className="font-shapiro95_super_wide text-xl mb-2">{themeTitle}</h3>
                  )}
                  {themeSubheading && <p className="text-sm mb-2">{themeSubheading}</p>}
                  {skillLevel && (
                    <div id={past ? '' : 'sessions-list-session-level-info'} className="flex">
                      <SignalBarsSvg className="w-4 -mt-1 mr-2" />
                      <span className="text-xs">{`${skillLevel.min} - ${skillLevel.max}`}</span>
                    </div>
                  )}
                </div>
                <SessionButton
                  session={session}
                  showingFreeSessionCreditAdded={showingFreeSessionCreditAdded}
                  className="w-full md:w-auto"
                />
              </div>
              {comingSoon && <SessionVote session={session} className="mt-4" />}
            </div>
          </div>
          <div className={`flex justify-between items-center ${showMore ? '' : 'md:ml-36'}`}>
            <div className="text-sm text-white text-opacity-60">{spotsLeftText}</div>
            <div
              onClick={() => setShowMore(!showMore)}
              className="flex items-center text-sm cursor-pointer group"
            >
              <span className="text-cc-purple transition-all duration-300 group-hover:text-cc-purple-300 mr-2">
                {showMore ? 'Show Less' : 'Show More'}
              </span>
              <FontAwesomeIcon
                className={`bg-cc-blue-500 group-hover:bg-cc-blue-300 p-2 trasform transition-all duration-150 ${
                  showMore ? 'rotate-180' : ''
                }`}
                icon={faChevronDown}
              />
            </div>
          </div>
          {showMore && <SessionShowMore session={session} className="mt-4" />}
        </div>
      </div>
    </div>
  );
};

Session.defaultProps = {
  className: '',
  showingFreeSessionCreditAdded: false,
};

Session.propTypes = {
  session: PropTypes.shape().isRequired,
  showingFreeSessionCreditAdded: PropTypes.bool,
  className: PropTypes.string,
};

export default Session;
