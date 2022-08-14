import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

import ROUTES from 'shared/constants/routes';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import LazyBackgroundImage from 'shared/components/LazyBackgroundImage';
import VideoPlayer from 'shared/components/VideoPlayer';
import everyoneIsAnAthleteBgImg from 'screens/homepage/images/everyone-is-an-athlete.jpeg';

const EveryoneIsAnThlete = () => {
  const [watchVideo, setWatchVideo] = useState(false);

  return (
    <>
      <LazyBackgroundImage
        as="section"
        img={everyoneIsAnAthleteBgImg}
        className="text-white min-h-screen bg-no-repeat bg-cover bg-center"
      >
        <div className="md:pr-20 pt-20 pb-40 sm:py-20">
          <div className="bg-cc-black bg-opacity-70 w-4/5 max-w-sm md:max-w-md md:min-h-screen ml-auto">
            <div className="px-4 sm:px-6 py-10 sm:py-16">
              <h2 className="font-dharma_gothic_cheavy text-transparent text-stroke-cc-purple text-stroke-width-1 md:text-stroke-width-2 text-9xl md:text-10xl 2xl:text-11xl md:whitespace-nowrap md:direction-rtl uppercase mb-8">
                Everyone's An Athlete
              </h2>
              <h3 className="font-shapiro95_super_wide md:text-xl uppercase mb-8">
                No more "who has next" BS
              </h3>
              <div className="md:text-lg mb-10">
                <p className="mb-6">Basketball was probably your jam before becoming "an adult".</p>
                <p className="mb-6">
                  If we had to guess, too many nightmarish pickup experiences forced you stop
                  playing, and you lost not only the sport you love, but a means of exercise,
                  escapism, competition, and community.
                </p>
                <p>
                  Crosscourt exists to get you back in the game and back in shape. Surround yourself
                  with the CCteam - a community of modern athletes that unite and ignite through the
                  power of team sport.
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <PrimaryButton
                  fontSize="0.75rem"
                  contentClasses="w-52 md:w-auto"
                  onClick={() => setWatchVideo(true)}
                  bg="transparent"
                  color="white"
                >
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faPlayCircle} className="text-lg mr-2" />
                    See In Action
                  </div>
                </PrimaryButton>
                <PrimaryButton
                  fontSize="0.75rem"
                  contentClasses="w-52 md:w-auto"
                  to={ROUTES.LOCATIONS}
                >
                  Book Session
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </LazyBackgroundImage>
      <VideoPlayer
        url="https://vimeo.com/665411481"
        playing
        openOnModal
        isModalOpen={watchVideo}
        closeModalHandler={() => setWatchVideo(false)}
      />
    </>
  );
};

export default EveryoneIsAnThlete;
