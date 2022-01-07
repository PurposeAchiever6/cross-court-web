import React from 'react';
import PropTypes from 'prop-types';

import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import NewToCrosscourtBgImg from 'screens/how-it-works/images/pick-up-referee.jpeg';
import playButtonWhiteIcon from 'shared/images/play-button-white.png';
import playButtonPurpleIcon from 'shared/images/play-button-purple.png';

const NewToCrosscourt = ({ scrollToTheSessionVideo }) => (
  <section
    className="min-h-screen bg-no-repeat bg-cover bg-left-n-36 sm:bg-left-top text-white py-32"
    style={{ backgroundImage: `url('${NewToCrosscourtBgImg}')` }}
  >
    <div className="lg:w-1/2 lg:ml-auto px-6 sm:px-20 flex justify-center sm:block">
      <div>
        <h1 className="font-dharma_gothic_cexbold text-9xl lg:text-11xl italic">NEW TO CC?</h1>
        <h2 className="font-shapiro95_super_wide text-sm lg:text-lg w-60 lg:w-auto -mt-4 mb-3">
          YOUR FIRST SESSION IS FREE
        </h2>
        <PrimaryButton
          bg="transparent"
          color="white"
          className="group transform scale-90 origin-top-left"
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
