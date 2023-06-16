import React from 'react';

import SectionLayout from 'shared/components/layout/SectionLayout';
import ExpandedLayout from 'shared/components/layout/ExpandedLayout';
import List from 'shared/components/List';
import crosscourtGoalImg from 'screens/ads/images/crosscourt-goal.jpg';
import ArrowPointDownSvg from 'shared/components/svg/ArrowPointDownSvg';

const CrosscourtGoal = () => (
  <SectionLayout className="relative mb-24">
    <ExpandedLayout
      mdBreakpoint={false}
      lgBreakpoint={false}
      xlBreakpoint={false}
      className="relative mb-8 md:mb-0"
    >
      <img
        alt="crosscourt-goal-img"
        src={crosscourtGoalImg}
        className="md:absolute top-0 left-0 w-full md:w-2/3 opacity-70"
      />
    </ExpandedLayout>
    <div className="relative">
      <span className="absolute font-shapiro95_super_wide text-cc-purple -bottom-12 md:bottom-0 left-0">
        Experience Crosscourt
        <ArrowPointDownSvg className="w-3 sm:w-4 ml-2 inline" />
      </span>
      <div className="md:w-1/2 md:ml-auto md:mr-16 md:pt-80">
        <h2 className="font-shapiro95_super_wide text-2xl md:text-3xl md:max-w-xl mb-4">
          Crosscourt enables professionals in the game of life to <br />{' '}
          <span className="text-cc-purple">elevate personally and professionally.</span>
        </h2>
        <p className="font-shapiro95_super_wide text-xl md:text-xl md:max-w-xl mb-8">
          When you come to Crosscourt, you tap into a platform for progress.
        </p>
        <List
          align="center"
          className="md:max-w-lg text-sm mb-8"
          items={[
            'Deepen your human connection through shared experiences with others on the same journey',
            'Develop a new level of confidence and start taking risks that propel you towards reaching your potential',
            'Enhance mental and physical health to start living life unapologetically',
          ]}
        />
      </div>
    </div>
  </SectionLayout>
);

export default CrosscourtGoal;
