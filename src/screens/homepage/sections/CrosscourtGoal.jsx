import React from 'react';

import ROUTES from 'shared/constants/routes';
import SectionLayout from 'shared/components/layout/SectionLayout';
import ExpandedLayout from 'shared/components/layout/ExpandedLayout';
import Button from 'shared/components/Button';
import List from 'shared/components/List';
import crosscourtGoalImg from 'screens/homepage/images/crosscourt-goal.jpeg';

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
        className="md:absolute top-0 left-0 w-full md:w-2/3"
      />
    </ExpandedLayout>
    <div className="relative">
      <div className="md:w-1/2 md:ml-auto md:mr-16 md:pt-48">
        <h2 className="font-shapiro95_super_wide text-2xl md:text-4xl md:max-w-lg mb-8">
          Crosscourt is designed to enable professionals in the game of life to rediscover how
          team-sport is the best catalyst for social, mental and physical growth.
        </h2>
        <List
          align="center"
          className="md:max-w-lg text-sm mb-8"
          items={[
            'Deepen your human connection through shared experiences with others on the same journey',
            'Develop a new level of confidence and start taking risks that propel you towards reaching your potential',
            'Enhance mental and physical health to start living life unapologetically',
          ]}
        />
        <Button to={ROUTES.MEMBERSHIPS} className="mr-5">
          Join
        </Button>
      </div>
    </div>
  </SectionLayout>
);

export default CrosscourtGoal;
