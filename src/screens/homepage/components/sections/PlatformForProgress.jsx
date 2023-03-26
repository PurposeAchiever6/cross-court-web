import React from 'react';

import SectionLayout from 'shared/components/layout/SectionLayout';
import InformationBox from 'shared/components/InformationBox';
import ExpandedLayout from 'shared/components/layout/ExpandedLayout';
import LineDashed from 'shared/components/LineDashed';
import platformForProgressImg from 'screens/homepage/images/platform-for-progress.png';
import connectImg from 'screens/homepage/images/connect.jpeg';
import createImg from 'screens/homepage/images/create.jpeg';
import competeImg from 'screens/homepage/images/compete.jpeg';
import elevateMentallyEmotionallyImg from 'screens/homepage/images/elevate-mentally-emotionally.jpeg';
import crownShapeImg from 'screens/homepage/images/crown-shape.png';

const PlatformForProgress = () => (
  <SectionLayout className="relative pt-10 md:pt-20 bg-gradient-to-b from-cc-blue-900 via-black to-black mb-24">
    <img
      alt="platform-for-progress-img"
      src={platformForProgressImg}
      className="absolute -top-16 left-2/3 w-56 md:w-80"
    />
    <div className="relative">
      <h2 className="font-shapiro95_super_wide text-3xl md:text-4xl max-w-2xl mb-8 md:mb-24">
        When you come to Crosscourt, you tap into a{' '}
        <span className="text-cc-purple">platform for progress.</span>
      </h2>
      <ExpandedLayout
        mdBreakpoint={false}
        lgBreakpoint={false}
        xlBreakpoint={false}
        className="mb-16"
      >
        <div className="md:flex md:-mx-4">
          <div className="md:w-1/3 md:mx-4">
            <InformationBox
              title="Connect."
              description="Our members will rediscover their connection to sport, discover new connections to people, and be reminded that sport connects to their purpose."
              image={connectImg}
              imageClassName="w-full h-96 object-cover"
            />
          </div>
          <div className="md:w-1/3 md:mx-4">
            <InformationBox
              title="Create."
              description="Whether it's wearing unique heat on your feet, creating a new move or moment, or having that conversation that sparks an idea. We cultivate the creative spirit sport inspires."
              image={createImg}
              imageClassName="w-full h-96 object-cover"
              className="mt-6 md:mt-20"
            />
          </div>
          <div className="md:w-1/3 md:mx-4">
            <InformationBox
              title="Compete."
              description="We believe that competition isn't about going all out against each other but all out for each other. Our members will learn that their path to being better is tied to the success of the person standing next to them."
              image={competeImg}
              imageClassName="w-full h-96 object-cover"
              className="mt-6 md:mt-40"
            />
          </div>
        </div>
      </ExpandedLayout>
    </div>
    <LineDashed className="text-cc-purple mb-16" />
    <div className="md:flex">
      <h2 className="font-shapiro95_super_wide text-4xl lg:text-5xl xl:text-6xl md:max-w-md md:mr-10 xl:mr-20 mb-4 md:mb-0">
        Team Sport Mirrors Life
      </h2>
      <div className="w-full xl:pl-6 mr-10 mb-14 md:mb-0">
        <h4 className="font-shapiro95_super_wide text-2xl mb-2">
          Elevate mentally and emotionally.
        </h4>
        <div className="text-sm max-w-xl">
          <p className="mb-4">
            We use the court to practice life. Who you are as a teammate on the court is a
            reflection of who you are as a person off it. From how you condition yourself to how you
            show for others up to how you communicate when the game is on the line—the arena of team
            sport is used to help you progress as a human.
          </p>
          <p>
            When you get your membership at Crosscourt, it’s more than scoring points on the court.
            It’s about learning discipline, how to work with others, how to handle failure,
            developing resilience, meeting adversity, dreaming big, what it means to be a leader,
            the benefits of hard work, and practicing them all in real time.
          </p>
        </div>
      </div>
      <div className="relative w-full md:w-64 shrink-0">
        <img alt="elevate-mentally-emotionally-img" src={elevateMentallyEmotionallyImg} />
        <img
          alt="crown-shape-img"
          src={crownShapeImg}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 ml-2 scale-110"
        />
      </div>
    </div>
  </SectionLayout>
);

export default PlatformForProgress;
