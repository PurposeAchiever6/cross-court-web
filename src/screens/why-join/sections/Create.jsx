import React, { useState } from 'react';

import DashedCrossSvg from 'shared/components/svg/DashedCrossSvg';
import Button from 'shared/components/Button';
import SectionLayout from 'shared/components/layout/SectionLayout';
import ExpandedLayout from 'shared/components/layout/ExpandedLayout';
import VideoPlayer from 'shared/components/VideoPlayer';

import highFive from 'screens/why-join/images/high-five-2.jpg';
import dotsBgImg from 'shared/images/backgrounds/dots.png';
import sklz from 'screens/why-join/images/sklz.png';
import openClub from 'screens/why-join/images/open-club.png';
import phone from 'screens/why-join/images/phone.png';
import sklzLogoWhite from 'shared/images/logos/sklz-white.png';
import openClubLogoWhite from 'shared/images/logos/open-club-white.png';
import ROUTES from 'shared/constants/routes';

const Create = () => {
  const [watchVideo, setWatchVideo] = useState(false);

  return (
    <>
      <SectionLayout className="mt-12 md:mt-20">
        <ExpandedLayout
          mdBreakpoint={false}
          lgBreakpoint={false}
          xlBreakpoint={false}
          className="bg-cc-blue-900"
        >
          <img alt="high-five" src={highFive} />
          <div className="flex flex-col md:flex-row justify-between px-4 md:px-28 py-6 md:py-32">
            <div className="max-w-2xl">
              <h1 className="text-cc-purple font-shapiro95_super_wide text-4xl md:text-6xl">
                Create.
              </h1>
              <h3 className="mt-4 font-shapiro95_super_wide text-3xl">Through Sport.</h3>
              <p className="mt-4 text-lg">
                Experiences that create opportunities to bolster the five C’s: <br />
                competence, confidence, connections, character, and caring.
              </p>
            </div>
            <DashedCrossSvg className="hidden md:block w-44 md:w-72 h-44 md:h-72 mt-4 md:mt-0 self-center" />
          </div>
          <img
            src={dotsBgImg}
            alt="dots"
            className="md:w-[625px] md:h-[568px] hidden md:block absolute"
          />
          <div className="px-6 md:px-28 relative pb-6 md:pb-24">
            <div className="flex flex-col md:flex-row items-center mt-4 md:mt-2">
              <img alt="open-club" src={openClub} />
              <div className="flex flex-col md:ml-32">
                <img alt="sklz-logo" className="w-32 mt-4 md:mt-0" src={openClubLogoWhite} />
                <p className="mt-4 max-w-2xl text-lg">
                  We’re open for “Office Hours” during the work day and then “Open Club” in the
                  afternoon. Use the space as you wish. Get some work done or hit a workout. Put
                  some shots up with the shooting machine, organize games with other members, or
                  just come to hang out.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center">
              <img alt="sklz" src={sklz} />
              <div className="flex flex-col md:ml-32">
                <img alt="sklz-logo" className="w-32 mt-4 md:mt-0" src={sklzLogoWhite} />
                <p className="mt-4 max-w-2xl text-lg">
                  Our group training experience that is designed to help you develop new moves,
                  moments, and muscle with support from members on the same journey.
                </p>
                <Button
                  className="mt-4 w-min"
                  variant="outline-purple"
                  onClick={() => setWatchVideo(true)}
                >
                  WATCH VIDEO
                </Button>
              </div>
            </div>
          </div>
          <div className="bg-space-dots-with-radial-gradient px-2">
            <div className="flex flex-col items-center justify-center py-14">
              <img alt="phone" src={phone} />
              <h3 className="font-shapiro95_super_wide text-center text-3xl">
                Clip &amp; Share Highlights
              </h3>
              <p className="text-center max-w-xl mt-4 text-lg">
                We have partnered with Pixellot to bring our members closer to the action. Using the
                app, members can watch, clip, edit, and upload personalized highlights all from
                their mobile devices.
              </p>
              <Button to={ROUTES.CONTENT} className="mt-4" variant="outline-purple">
                HERE IS HOW
              </Button>
            </div>
          </div>
        </ExpandedLayout>
      </SectionLayout>
      <VideoPlayer
        url="/skill-sessions.mp4"
        playing
        openOnModal
        isModalOpen={watchVideo}
        closeModalHandler={() => setWatchVideo(false)}
      />
    </>
  );
};

Create.propTypes = {};

export default Create;
