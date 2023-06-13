import React, { useState } from 'react';
import SectionLayout from 'shared/components/layout/SectionLayout';
import Tabs from 'shared/components/Tabs';
import Button from 'shared/components/Button';
import activationsLogoWhite from 'shared/images/logos/activations-white.png';
import challengesLogoWhite from 'shared/images/logos/challenges-white.png';
import sznsLogoWhite from 'shared/images/logos/cc-league-white.png';
import sessionsLogoWhite from 'shared/images/logos/sessions-white.png';
import officeHoursLogo from 'shared/images/logos/office-hours-white.png';
import sklzLogoWhite from 'shared/images/logos/sklz-white.png';
import ExperienceTab from 'screens/ads/sections/ExperienceTabs/ExperienceTab';
import meetupsImg from 'screens/ads/images/experience-tabs/meetups.png';
import discordImg from 'screens/ads/images/experience-tabs/discord.png';
import sklzImg from 'screens/ads/images/experience-tabs/sklz.jpg';
import activationsImg from 'screens/ads/images/experience-tabs/activations.jpg';
import challengesImg from 'screens/ads/images/experience-tabs/challenges.jpg';
import officeHoursImg from 'screens/ads/images/experience-tabs/office-hours.jpg';
import sessionImg from 'screens/ads/images/experience-tabs/session.jpg';
import sznsImg from 'screens/ads/images/experience-tabs/szns.jpg';
import Link from 'shared/components/Link';
import VideoPlayer from 'shared/components/VideoPlayer';
import RulesAndFormatModal from 'shared/components/RulesAndFormatModal';

const ExperienceTabs = () => {
  const [videoName, setVideoName] = useState('');
  const [watchVideo, setWatchVideo] = useState(false);
  const [openRulesAndFormatModal, setOpenRulesAndFormatModal] = useState(false);

  const tabs = [
    {
      label: 'Meetups',
      title: 'Attend Meetups & Events',
      description:
        "Connect with like-minded people who are on the same journey you are. Whether it's talking about the new Jordans that just dropped or having that conversation that sparks an idea—we cultivate the creative spirit that sport inspires.",
      image: meetupsImg,
    },
    {
      label: 'Community',
      title: 'Meet other Members',
      description:
        'Our community is at the heart of everything we do and our spaces, beyond the physical, are built to create environments that spark connection. Crosscourt members have access to our Discord, a members directory, and other unique, socially designed features that drive relationships.',
      image: discordImg,
      buttons: (
        <Button
          variant="outline-purple"
          to={import.meta.env.VITE_DISCORD_LINK}
          isExternal
          target="_blank"
        >
          Join Discord
        </Button>
      ),
    },
    {
      label: 'SKLZ',
      logo: sklzLogoWhite,
      description:
        'Our group training experience that is designed to help you develop new moves, moments, and muscle with support from members on the same journey.',
      image: sklzImg,
      buttons: (
        <Button
          onClick={() => {
            setVideoName('skill-sessions');
            setWatchVideo(true);
          }}
          variant="outline-purple"
        >
          Watch Video
        </Button>
      ),
    },
    {
      label: 'Office Hours',
      logo: officeHoursLogo,
      description:
        'The Club is open all day for members and their guests to utilize our amenities to get some work done, work out, hoop with others, hang out, recover, and generally use the space as it works for them. Using credits, members can reserve the court, the shooting machine, recovery devices, and other services during Office Hours through the schedule.',
      image: officeHoursImg,
    },
    {
      label: 'Sessions',
      logo: sessionsLogoWhite,
      description:
        'Our curated, pickup-inspired experience. Our bread and butter. 55 minutes, 15 player limit, 2 Session Officials, tiered skill levels, music, jerseys, and more. Built to help you create, compete, and connect.',
      image: sessionImg,
      buttons: (
        <div>
          <Button
            onClick={() => {
              setVideoName('how-it-works');
              setWatchVideo(true);
            }}
            variant="outline-purple"
            className="mr-4"
          >
            Watch Video
          </Button>
          <Link onClick={() => setOpenRulesAndFormatModal(true)}>Format &amp; Rules</Link>
        </div>
      ),
    },
    {
      label: 'Activations',
      logo: activationsLogoWhite,
      description:
        'Unique, members only pop up events and competitive experiences centered around team sport. From 3v3 challenges, to dodgeball tournaments, to 3 point contests, to Futsal nights, we consistently look for new ways to leverage the power of team sport in order to foster healthy competition.',
      image: activationsImg,
      buttons: (
        <Button
          onClick={() => {
            setVideoName('activations');
            setWatchVideo(true);
          }}
          variant="outline-purple"
        >
          Watch Video
        </Button>
      ),
    },
    {
      label: 'Challenges',
      logo: challengesLogoWhite,
      description:
        'We constantly look for fun ways to engage our community through challenges and other competitions beyond the court. From a March Madness bracket challenge, to an NFL survivor pool, to the best Crosscourt highlight of the week, members have numerous opportunities to converse and compete without shedding a sweat.',
      image: challengesImg,
    },
    {
      label: 'SZNS',
      logo: sznsLogoWhite,
      description:
        'League play re-imagined. Short term, members only, league inspired experiences ranging from 3v3, 4v4, to 5v5. Stats, game recaps,  highlights, custom uniforms, and other unique touches designed to make you feel like those dreams of going pro never died.',
      image: sznsImg,
      comingSoon: true,
    },
  ];

  return (
    <>
      <SectionLayout className="mb-24">
        <Tabs tabContainerClasses="border-b" variant="opacity-underline" noActiveTab>
          {tabs.map((tab) => (
            <div label={tab.label} key={tab.label}>
              <ExperienceTab tab={tab} />
            </div>
          ))}
        </Tabs>
      </SectionLayout>
      <VideoPlayer
        url={`/${videoName}.mp4`}
        playing
        openOnModal
        isModalOpen={watchVideo}
        closeModalHandler={() => setWatchVideo(false)}
      />
      <RulesAndFormatModal
        isOpen={openRulesAndFormatModal}
        closeHandler={() => setOpenRulesAndFormatModal(false)}
      />
    </>
  );
};

export default ExperienceTabs;
