import React from 'react';

import ROUTES from 'shared/constants/routes';
import Button from 'shared/components/Button';
import SectionLayout from 'shared/components/layout/SectionLayout';
import ExpandedLayout from 'shared/components/layout/ExpandedLayout';
import trustTheProgressImg from 'screens/homepage/images/trust-the-progress.jpeg';
import trustTheProgressShapeImg from 'screens/homepage/images/trust-the-progress-shape.png';

const TrustTheProgress = () => (
  <SectionLayout className="border-b border-cc-purple">
    <ExpandedLayout>
      <div className="md:flex">
        <div className="relative md:w-1/2 md:shrink-0">
          <img alt="trust-the-progress-img" src={trustTheProgressImg} className="w-full" />
          <img
            alt="trust-the-progress-shape-img"
            src={trustTheProgressShapeImg}
            className="absolute-center w-1/2"
          />
        </div>
        <div className="md:w-1/2 md:shrink-0 flex flex-col justify-center items-start px-4 py-10 md:px-10 xl:px-20">
          <h2 className="font-shapiro95_super_wide text-4xl lg:text-5xl uppercase max-w-md mb-6">
            Trust The Progress
          </h2>
          <p className="text-sm lg:text-base max-w-lg leading-6 mb-6">
            Team Sport connects people, places, perspectives, and philosophy to create conditions
            that maximize potential.
          </p>
          <Button to={ROUTES.MEMBERSHIPS} className="mr-5">
            Join
          </Button>
        </div>
      </div>
    </ExpandedLayout>
  </SectionLayout>
);

export default TrustTheProgress;
