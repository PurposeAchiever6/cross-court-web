import React, { useState } from 'react';
import PropTypes from 'prop-types';

import BadgeWithInfo from 'shared/components/BadgeWithInfo';
import VideoPlayer from 'shared/components/VideoPlayer';
import sklzLogoWhite from 'shared/images/sklz-logo-white.png';

const SessionBadge = ({ skillLevel, isOpenClub, womenOnly, skillSession, variant }) => {
  const [watchVideo, setWatchVideo] = useState(false);
  const [enableBadgeInfo, setEnableBadgeInfo] = useState(true);

  if (isOpenClub) {
    return (
      <BadgeWithInfo
        info="All members can access the club to shootaround, train, or self-organize own runs (included with memberships)."
        variant={variant}
      >
        Open Club
      </BadgeWithInfo>
    );
  }

  if (womenOnly) {
    return (
      <BadgeWithInfo
        info="Women sessions are designed for the women out there who are tired of the male dominated pickup basketball culture. These sessions enable women to shed sweat and stress through the power of team sport."
        variant={variant}
      >
        Women
      </BadgeWithInfo>
    );
  }

  if (skillSession) {
    const tooltipInformation = (
      <div>
        60 minute, trainer led, group workout for members to level up their game. Work on handles,
        shooting, passing, endurance, and more in this high intensity, community driven experience.{' '}
        <button
          onClick={() => {
            setWatchVideo(true);
            setEnableBadgeInfo(false);
          }}
          className="block font-bold hover:underline cursor-pointer"
        >
          Watch Video
        </button>
      </div>
    );

    return (
      <>
        <BadgeWithInfo info={tooltipInformation} enableInfo={enableBadgeInfo} variant={variant}>
          <img alt="sklz-logo" className="h-2 inline-block" src={sklzLogoWhite} />
        </BadgeWithInfo>
        <VideoPlayer
          url="/skill-sessions.mp4"
          playing
          openOnModal
          isModalOpen={watchVideo}
          closeModalHandler={() => {
            setWatchVideo(false);
            setEnableBadgeInfo(true);
          }}
        />
      </>
    );
  }

  return (
    <BadgeWithInfo info={skillLevel.description} variant={variant}>
      {`${skillLevel.min} - ${skillLevel.max}`}
    </BadgeWithInfo>
  );
};

SessionBadge.defaultProps = {
  skillLevel: null,
  variant: 'black',
};

SessionBadge.propTypes = {
  skillLevel: PropTypes.shape(),
  isOpenClub: PropTypes.bool.isRequired,
  womenOnly: PropTypes.bool.isRequired,
  skillSession: PropTypes.bool.isRequired,
  variant: PropTypes.string,
};

export default SessionBadge;
