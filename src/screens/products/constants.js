import sessionsLogo from 'shared/images/logos/sessions-white.png';
import skillSessionsLogo from 'shared/images/logos/sklz-white.png';
import officeHoursLogo from 'shared/images/logos/office-hours-white.png';
import activationsLogo from 'shared/images/logos/activations-white.png';
import privateTrainingLogo from 'shared/images/logos/private-trainings-white.png';
import ccLeagueLogo from 'shared/images/logos/cc-league-white.png';

import sessionsBgImg from 'shared/images/membership-features/sessions.jpeg';
import skillSessionsBgImg from 'shared/images/membership-features/skill-sessions.jpeg';
import openClubBgImg from 'shared/images/membership-features/open-club.jpeg';
import activationsBgImg from 'shared/images/membership-features/activations.jpeg';
import privateTrainingBgImg from 'shared/images/membership-features/private-trainings.jpeg';
import ccLeagueBgImg from 'shared/images/membership-features/cc-league.jpeg';

import dotsBgImg from 'shared/images/membership-features/dots.png';

export const ONE_TIME = 'one_time';
export const RECURRING = 'recurring';
export const FREE_SESSION = 'Free Session';
export const UNLIMITED_VALUE = -1;
export const MIN_PRODUCT_CREDITS = 4;

export const MEMBERSHIPS_EXPERIENCES = [
  {
    skip: true,
  },
  {
    icon: sessionsLogo,
    description:
      'Our curated, pickup-inspired experience. 1 hour, 15 players, 2 Session Officials, tiered skill levels, music, jerseys, and more. Convenience and vibe of a boutique fitness experience applied to team-sport. Built to help you create, compete, and connect. 1 session requires 1 credit.',
    label: 'Requires Credit',
    clipCorner: 'top-left',
    backgroundImage: sessionsBgImg,
    darkenBackground: true,
    iconClassName: 'h-9',
  },
  {
    icon: skillSessionsLogo,
    description:
      'SKLZ is a core Crosscourt tenet as it offers a variety of skill based, group workouts that allow us to improve our abilities and attributes on a holistic level, while providing an energizing workout and community centereed experience. SKLZ also requires 1 credit to book.',
    label: 'Requires Credit',
    backgroundImage: skillSessionsBgImg,
    darkenBackground: true,
    iconClassName: 'h-9',
  },
  {
    icon: officeHoursLogo,
    description:
      'The Club is open all day for members and their guests to utilize our amenities to get some work done, workout, hoop with others, hang out, recover, and generally use the space as it works for them. Using credits and booking through the schedule, members can reserve the court, the shooting machine, recovery devices, and other services offered during Office Hours.',
    label: 'Included',
    backgroundImage: openClubBgImg,
    darkenBackground: true,
    iconClassName: 'h-10',
  },
  {
    icon: activationsLogo,
    description:
      'Members only social events or team-sport based pop up experience that take place at the Club or off site. Designed to build relationships on & off the court and provide a unique experience only available to our members. Ranging from a 3 on 3 tournament to a finals watch party to an off site happy hour.',
    label: 'Included',
    backgroundImage: activationsBgImg,
    darkenBackground: true,
    iconClassName: 'h-8',
  },
  {
    icon: privateTrainingLogo,
    description:
      'If you really want to take yourself to the next level, book a 1 on 1 private coaching session with one of our coaches by reaching out to us via email at ccteam@cross-court.com.',
    label: 'A La Carte',
    backgroundImage: privateTrainingBgImg,
    darkenBackground: true,
    iconClassName: 'h-9',
  },
  {
    icon: ccLeagueLogo,
    description: 'League play re-imagined. 4 SZNS /year. Members only.',
    label: 'Coming Soon',
    clipCorner: 'bottom-right',
    backgroundImage: ccLeagueBgImg,
    darkenBackground: true,
    iconClassName: 'h-9',
  },
];

export const MEMBERSHIPS_PERKS = [
  {
    name: 'Tiered Sessions',
    description:
      'Members have potential to book our tiered sessions, although certain, higher intensity sessions may be unaccessible to some. Non-members do not have access to higher tiered sessions.',
    clipCorner: 'top-left',
    backgroundImage: dotsBgImg,
  },
  {
    name: 'Community',
    description:
      'Access to a unique, passionate community of people just like you. You’ve probably heard that you’re a product of the four people you spend the most time with. The best part about Crosscourt is that not only are the other people on the court just as interested in leveling up their life, but every member of the CCTeam has the opportunity to change yours. As a Crosscourt member, you get exclusive access to a member directory (coming soon), members only events and networking opportunities that are designed to help show you that your only limit is you.',
    backgroundImage: dotsBgImg,
  },
  {
    name: 'Shooting Machine',
    description:
      'Rent a personal shooting machine when booking your spot in Office Hours to get in the zone and further elevate your confidence.',
    backgroundImage: dotsBgImg,
  },
  {
    skip: true,
  },
  {
    skip: true,
  },
  {
    name: 'Discounted Credits',
    description:
      'Certain CC memberships allow you to purchase additional, a la carte credits at a discount if the remaining credits in your account for that month have been used.',
    backgroundImage: dotsBgImg,
  },
  {
    name: 'CC Ca$h',
    description:
      'CC CA$H is our member credit system that enables members to acquire cc credit by referring friends or taking advantage of some of our promotions. CC Cash can be used to redeem items like in club beverages/snacks, merch, drop in sessions, or cover no show/late cancellation fees.',
    backgroundImage: dotsBgImg,
  },
  {
    name: 'Guest Passes',
    description:
      'Add non-member guests to your experience with a couple clicks. Available for all SKLZ/Office Hours bookings, but limited for sessions. Tap "See Details" on a booking in "My Account" to invite a guest.',
    clipCorner: 'bottom-right',
    backgroundImage: dotsBgImg,
  },
];
