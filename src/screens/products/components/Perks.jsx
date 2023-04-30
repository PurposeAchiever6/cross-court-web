import React from 'react';

import PerkWaitlistPriority from 'screens/products/images/perk-waitlist-priority.png';
import PerkOpenClub from 'screens/products/images/perk-open-club.png';
import PerkGetHighlights from 'screens/products/images/perk-get-highlights.png';
import PerkReducedSessions from 'screens/products/images/perk-reduced-sessions.png';

const PERKS = [
  {
    title: 'Waitlist Priority',
    description: 'All members get moved straight to the top of any session waitlist.',
    iconImg: PerkWaitlistPriority,
    iconClassName: 'w-10 lg:w-14 mr-6',
  },
  {
    title: 'Open Club Access',
    description:
      'Members can access the club during specified "open gym" hours to shootaround with other ' +
      'members, hang out or organize their own basketball-based activities.',
    iconImg: PerkOpenClub,
    iconClassName: 'w-10 lg:w-14 mr-6',
  },
  {
    title: 'Personal Highlights',
    description:
      'Only members receive access to sessions VOD content, where you can view, clip, edit ' +
      'and download personal highlights.',
    iconImg: PerkGetHighlights,
    iconClassName: 'w-12 lg:w-16 mr-4',
  },
  {
    title: 'Reduced Sessions',
    description:
      '4 or 8 session/month members can purchase additional drop in sessions at a reduced rate ' +
      'once all the credits in your account for that month have been used.',
    iconImg: PerkReducedSessions,
    iconClassName: 'w-12 lg:w-16 mr-4',
  },
];

const Perks = () => (
  <section className="text-white bg-cc-black bg-opacity-60 w-full px-4 md:px-14 xl:px-24 py-8 lg:mb-10">
    <div className="flex flex-col-reverse lg:flex-row lg:items-center max-w-screen-xl mx-auto">
      <div className="w-full mb-12 lg:mb-0">
        <h2 className="font-shapiro95_super_wide text-3xl italic mb-12">MEMBERSHIP PERKS</h2>
        <div className="flex flex-wrap justify-center -m-4">
          {PERKS.map(({ title, description, iconImg, iconClassName }, index) => (
            <div key={index} className="flex w-full sm:mb-4 sm:w-1/2 items-start p-4">
              <img src={iconImg} alt="perk-title" className={iconClassName} />
              <div>
                <div className="font-shapiro95_super_wide text-lg sm:text-xl text-cc-purple uppercase mb-2">
                  {title}
                </div>
                <p className="text-xs">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Perks;
