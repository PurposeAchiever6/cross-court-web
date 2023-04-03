import React, { useState } from 'react';

import SectionLayout from 'shared/components/layout/SectionLayout';
import ExpandedLayout from 'shared/components/layout/ExpandedLayout';
import Button from 'shared/components/Button';
import Link from 'shared/components/Link';
import VideoPlayer from 'shared/components/VideoPlayer';
import RulesAndFormatModal from 'screens/why-join/components/RulesAndFormatModal';

import activationsLogoWhite from 'shared/images/logos/activations-white.png';
import challengesLogoWhite from 'shared/images/logos/challenges-white.png';
import sznsLogoWhite from 'shared/images/logos/cc-league-white.png';
import sessionsLogoWhite from 'shared/images/logos/sessions-white.png';
import dotsBgImg from 'shared/images/backgrounds/dots.png';
import DashedXSvg from 'shared/components/svg/DashedXSvg';
import compete from 'screens/why-join/images/compete.png';
import session from 'screens/why-join/images/session.png';
import activation from 'screens/why-join/images/activation.png';
import challenges from 'screens/why-join/images/challenges.png';
import szns from 'screens/why-join/images/szns.png';

const Compete = () => {
  const [videoName, setVideoName] = useState('');
  const [watchVideo, setWatchVideo] = useState(false);
  const [openRulesAndFormatModal, setOpenRulesAndFormatModal] = useState(false);

  return (
    <>
      <SectionLayout className="mt-12 md:mt-20">
        <ExpandedLayout
          mdBreakpoint={false}
          lgBreakpoint={false}
          xlBreakpoint={false}
          className="bg-cc-blue-900 relative"
        >
          <img alt="high-five" src={compete} />
          <div className="flex flex-col md:flex-row justify-between px-4 md:px-28 py-6 md:py-32">
            <div className="max-w-2xl">
              <h1 className="text-cc-purple font-shapiro95_super_wide text-4xl md:text-6xl">
                Compete.
              </h1>
              <h3 className="mt-4 font-shapiro95_super_wide text-3xl">
                Experiences that push us to be our best, not the best.
              </h3>
              <p className="mt-4 text-lg">
                We believe that competition isn't about going all out against each other, but
                instead, all out for each other. Our members will learn that their path to being
                better is tied to the success of the person standing next to them.
              </p>
            </div>
            <DashedXSvg className="hidden md:block w-44 md:w-72 h-44 md:h-72 mt-4 md:mt-0 self-center" />
          </div>
          <img src={dotsBgImg} alt="dots" className="md:w-[40rem] hidden md:block absolute" />
          <img
            src={dotsBgImg}
            alt="dots"
            className="md:w-[40rem] hidden md:block absolute bottom-[100px]"
          />
          <div className="px-6 md:px-28 relative pb-6 md:pb-24">
            <div className="flex flex-col md:flex-row items-center">
              <img alt="sklz" src={session} />
              <div className="flex flex-col md:ml-32">
                <img alt="sklz-logo" className="w-32 mt-4 md:mt-0" src={sessionsLogoWhite} />
                <p className="mt-4 max-w-2xl text-lg">
                  Our curated, pickup-inspired experience. Our bread and butter. 55 minutes, 15
                  player limit, 2 Session Officials, tiered skill levels, music, jerseys, and more.
                  Built to help you create, compete, and connect.
                </p>
                <div className="flex mt-4 items-center">
                  <Button
                    variant="outline-purple"
                    onClick={() => {
                      setVideoName('how-it-works');
                      setWatchVideo(true);
                    }}
                  >
                    WATCH VIDEO
                  </Button>
                  <Link onClick={() => setOpenRulesAndFormatModal(true)} className="ml-4">
                    Rules &amp; Format
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center mt-8 md:mt-2">
              <img alt="open-club" src={activation} />
              <div className="flex flex-col md:ml-32">
                <img alt="sklz-logo" className="w-40 mt-4 md:mt-0" src={activationsLogoWhite} />
                <p className="mt-4 max-w-2xl text-lg">
                  Unique, members only pop up events and competitive experiences centered around
                  team sport. From 3v3 challenges, to dodgeball tournaments, to 3 point contests, to
                  Futsal nights, we consistently look for new ways to leverage the power of team
                  sport in order to foster healthy competition.
                </p>
                <Button
                  className="mt-4 w-min"
                  variant="outline-purple"
                  onClick={() => {
                    setVideoName('activations');
                    setWatchVideo(true);
                  }}
                >
                  WATCH VIDEO
                </Button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center mt-8 md:mt-2">
              <img alt="open-club" src={challenges} />
              <div className="flex flex-col md:ml-32">
                <img alt="sklz-logo" className="w-40 mt-4 md:mt-0" src={challengesLogoWhite} />
                <p className="mt-4 max-w-2xl text-lg">
                  We constantly look for fun ways to engage our community through challenges and
                  other competitions beyond the court. From a March Madness bracket challenge, to an
                  NFL survivor pool, to the best Crosscourt highlight of the week, members have
                  numerous opportunities to converse and compete without shedding a sweat.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center mt-8 md:mt-2">
              <img alt="open-club" src={szns} />
              <div className="flex flex-col md:ml-32">
                <img alt="sklz-logo" className="w-28 mt-4 md:mt-0" src={sznsLogoWhite} />
                <div>
                  <p className="mt-4 text-lg font-shapiro95_super_wide text-cc-purple">
                    COMING SOON
                  </p>
                  <p className="mt-2 max-w-2xl text-lg">
                    League play re-imagined. Short term, members only, league inspired experiences
                    ranging from 3v3, 4v4, to 5v5. Stats, game recaps, highlights, custom uniforms,
                    and other unique touches designed to make you feel like those dreams of going
                    pro never died.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ExpandedLayout>
      </SectionLayout>
      <RulesAndFormatModal
        isOpen={openRulesAndFormatModal}
        closeHandler={() => setOpenRulesAndFormatModal(false)}
      />
      <VideoPlayer
        url={`/${videoName}.mp4`}
        playing
        openOnModal
        isModalOpen={watchVideo}
        closeModalHandler={() => setWatchVideo(false)}
      />
    </>
  );
};

Compete.propTypes = {};

export default Compete;
