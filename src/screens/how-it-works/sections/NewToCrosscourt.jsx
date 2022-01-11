import React from 'react';
import PropTypes from 'prop-types';

import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import NewToCrosscourtBgImg from 'screens/how-it-works/images/pick-up-referee.png';
import playButtonWhiteIcon from 'shared/images/play-button-white.png';
import playButtonPurpleIcon from 'shared/images/play-button-purple.png';

const NewToCrosscourt = ({ scrollToTheSessionVideo }) => (
  <section
    className="min-h-screen bg-no-repeat bg-cover text-white py-32"
    style={{ backgroundImage: `url('${NewToCrosscourtBgImg}')` }}
  >
    <div className="lg:w-1/2 lg:ml-auto px-4 sm:px-20">
      <h1 className="font-dharma_gothic_cheavy_italic text-8xl sm:text-9xl lg:text-11xl pl-1 lg:pl-2">
        NEW TO CC?
      </h1>
      <h2 className="font-shapiro96_inclined_wide text-xs sm:text-sm lg:text-lg w-48 sm:w-60 lg:w-auto lg:-mt-4 mb-4">
        YOUR FIRST SESSION IS FREE
      </h2>
      <div className="lg:pl-px">
        <PrimaryButton
          bg="transparent"
          color="white"
          className="group transform scale-75 sm:scale-90 origin-top-left"
          onClick={scrollToTheSessionVideo}
        >
          <img
            alt="play-video-icon"
            className="w-5 h-5 mr-4 inline-block group-hover:hidden"
            src={playButtonWhiteIcon}
          />
          <img
            alt="play-video-icon"
            className="w-5 h-5 mr-4 hidden group-hover:inline-block"
            src={playButtonPurpleIcon}
          />
          <span>How it works</span>
        </PrimaryButton>
      </div>
    </div>
  </section>
);

NewToCrosscourt.propTypes = {
  scrollToTheSessionVideo: PropTypes.func.isRequired,
};

export default NewToCrosscourt;
