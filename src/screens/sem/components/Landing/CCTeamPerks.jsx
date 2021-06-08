import React from 'react';

import competitiveWageIcon from './../../images/wage.png';
import freeSessionsIcon from './../../images/free-sessions.png';
import rewardsIcon from './../../images/rewards.png';
import ccFitIcon from './../../images/cc-fit.png';
import gloryIcon from './../../images/glory.png';

const images = [
  { src: competitiveWageIcon, footer: 'COMPETITIVE WAGE' },
  { src: freeSessionsIcon, footer: 'FREE SESSIONS' },
  { src: rewardsIcon, footer: 'REWARDS' },
  { src: ccFitIcon, footer: 'CC FIT' },
  { src: gloryIcon, footer: 'GLORY' },
];

const CCTeamPerks = () => (
  <div className="flex flex-wrap md:px-40 2xl:px-80 my-20 justify-between">
    {images.map((image) => (
      <div className="flex flex-col justify-between items-center w-1/2 last:w-full h-44 mb-10 md:last:w-auto md:w-auto md:mb-0">
        <img src={image.src} alt="" />
        <p className="font-shapiro95_super_wide text-center">{image.footer}</p>
      </div>
    ))}
  </div>
);

export default CCTeamPerks;
