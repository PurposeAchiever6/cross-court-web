import React from 'react';

import ROUTES from 'shared/constants/routes';
import SectionLayout from 'shared/components/layout/SectionLayout';
import ExpandedLayout from 'shared/components/layout/ExpandedLayout';
import Button from 'shared/components/Button';
import List from 'shared/components/List';

const CrosscourtGoal = () => (
  <SectionLayout className="relative mb-24 md:mb-96">
    <ExpandedLayout
      mdBreakpoint={false}
      lgBreakpoint={false}
      xlBreakpoint={false}
      className="mb-8 md:mb-0"
    >
      <video
        className="top-0 left-0 w-full md:w-2/3"
        src="/how-it-works.mp4"
        autoPlay
        muted
        playsInline
        controls
        loop
        type="video/mp4"
      />
    </ExpandedLayout>
    <div className="md:absolute top-40 right-16 md:w-1/2 md:ml-auto md:max-w-lg">
      <h2 className="font-shapiro95_super_wide text-2xl md:text-4xl mb-8 md:ml-auto">
        Crosscourt is designed to enable professionals in the game of life to rediscover how
        team-sport is the best catalyst for social, mental and physical growth.
      </h2>
      <List
        align="center"
        className="text-sm mb-8 md:ml-auto"
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
  </SectionLayout>
);

export default CrosscourtGoal;
