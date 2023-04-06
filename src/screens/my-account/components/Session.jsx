import React from 'react';
import PropTypes from 'prop-types';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Tooltip from 'shared/components/Tooltip';
import sklzLogoBlack from 'shared/images/logos/sklz-black.png';
import sklzLogoWhite from 'shared/images/logos/sklz-white.png';
import { urlFormattedDate, shortSessionDate, hourRange } from 'shared/utils/date';
import Button from 'shared/components/Button';

const Session = ({
  past,
  sessionInfo: {
    date,
    scouting,
    session: {
      id: sessionId,
      time,
      durationMinutes,
      skillSession,
      isOpenClub,
      normalSession,
      location: { name: locationName, imageUrls },
      skillLevel,
      themeTitle,
      themeDescription,
    },
  },
}) => (
  <div
    className={`flex flex-col gap-2 border-2 border-cc-black p-4 my-2 md:my-0 md:mx-2 md:w-[calc(33%-1rem)] ${
      past ? 'bg-white text-cc-black' : 'bg-cc-black text-white'
    }`}
  >
    <div className="flex items-center justify-between">
      <span className="text-9xl font-dharma_gothic_cexbold leading-[6rem] pt-2">
        {locationName}
      </span>
      {imageUrls && <img className="w-24 h-24 object-cover" src={imageUrls[0]} alt="Session" />}
    </div>
    <span className="uppercase font-shapiro95_super_wide">{shortSessionDate(date)}</span>
    <span>{hourRange(time, durationMinutes)}</span>
    <div className={`flex items-center border-t py-2 ${past ? 'border-cc-black' : 'border-white'}`}>
      {skillSession && (
        <img alt="sklz-logo" className="w-20 md:w-24" src={past ? sklzLogoBlack : sklzLogoWhite} />
      )}
      {isOpenClub && (
        <span className="font-shapiro95_super_wide md:text-xl uppercase">Open Club</span>
      )}
      {scouting && (
        <span className="font-shapiro95_super_wide md:text-xl uppercase">Evaluation</span>
      )}
      {normalSession && (
        <span className="font-shapiro95_super_wide md:text-xl uppercase">Session</span>
      )}
    </div>
    {skillLevel && (
      <div
        className={`flex items-center justify-between border-t py-2 text-lg ${
          past ? 'border-cc-black' : 'border-white'
        }`}
      >
        <span>
          {skillLevel.min} - {skillLevel.max}
        </span>
        <Tooltip variant="black" tooltip={skillLevel.description}>
          <FontAwesomeIcon size="lg" icon={faInfoCircle} className="text-gray-400 cursor-pointer" />
        </Tooltip>
      </div>
    )}
    {themeTitle && (
      <div
        className={`flex items-center justify-between border-t py-2 text-lg ${
          past ? 'border-cc-black' : 'border-white'
        }`}
      >
        <span>{themeTitle}</span>
        {themeDescription && (
          <Tooltip variant="black" tooltip={themeDescription}>
            <FontAwesomeIcon
              size="lg"
              icon={faInfoCircle}
              className="text-gray-400 cursor-pointer"
            />
          </Tooltip>
        )}
      </div>
    )}
    <Button
      to={`/session/${sessionId}/${urlFormattedDate(date)}`}
      variant={past ? 'outline-black' : 'purple'}
      className="mt-auto"
    >
      DETAILS
    </Button>
  </div>
);

Session.propTypes = {
  past: PropTypes.bool,
  sessionInfo: PropTypes.shape().isRequired,
};

export default Session;
