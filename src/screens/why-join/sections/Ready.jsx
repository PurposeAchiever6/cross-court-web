import React from 'react';

import SectionLayout from 'shared/components/layout/SectionLayout';
import ExpandedLayout from 'shared/components/layout/ExpandedLayout';

import ReadyImg from 'screens/why-join/images/ready.png';
import Button from 'shared/components/Button';
import ROUTES from 'shared/constants/routes';
import Link from 'shared/components/Link';

const Ready = () => (
  <SectionLayout className="mt-8 md:mt-20 border-t-2 border-b-2 border-cc-purple pt-8 md:pt-24">
    <div className="md:flex md:items-center">
      <ExpandedLayout
        className="md:w-full"
        mdBreakpoint={false}
        lgBreakpoint={false}
        xlBreakpoint={false}
      >
        <img className="md:mr-28" src={ReadyImg} alt="Ready" loading="lazy" />
      </ExpandedLayout>
      <div className="md:w-full">
        <h2 className="font-shapiro95_super_wide text-3xl md:text-5xl mt-3 md:mt-0">
          Connect. <br className="md:hidden" /> Create. <br />
          Compete.
        </h2>
        <h4 className="font-shapiro95_super_wide mt-4">Ready to join?</h4>
        <p className="mt-4">Here’s how it works</p>
        <div className="flex bg-cc-blue-300 mt-4">
          <div className="font-dharma_gothic_cheavy bg-cc-blue-900 p-6 text-8xl w-20 flex items-center justify-center">
            1
          </div>
          <div className="p-6 flex flex-col justify-center">
            <p className="text-cc-purple font-shapiro95_super_wide text-2xl">Create Your Account</p>
            <Button to={ROUTES.SIGNUP} className="w-min mt-4">
              JOIN
            </Button>
          </div>
        </div>
        <div className="flex bg-cc-blue-300 mt-4">
          <div className="font-dharma_gothic_cheavy bg-cc-blue-900 p-6 text-8xl w-20 flex items-center justify-center">
            2
          </div>
          <div className="p-6 flex flex-col justify-center">
            <p className="text-cc-purple font-shapiro95_super_wide text-2xl">Explore Memberships</p>
            <p className="text-sm">Find the plan that’s right for you.</p>
            <Button to={ROUTES.MEMBERSHIPS} className="w-min mt-4">
              PLANS
            </Button>
          </div>
        </div>
        <div className="flex bg-cc-blue-300 mt-4">
          <div className="font-dharma_gothic_cheavy bg-cc-blue-900 p-6 text-8xl w-20 flex items-center justify-center">
            3
          </div>
          <div className="p-6 flex flex-col justify-center">
            <p className="text-cc-purple font-shapiro95_super_wide text-2xl">
              Unlock Your Potential
            </p>
            <p className="text-sm">Book an experience</p>
            <Button to={ROUTES.LOCATIONS} className="w-min mt-4">
              SCHEDULE
            </Button>
          </div>
        </div>
      </div>
    </div>
    <p className="text-white my-24 text-center text-sm">
      Not ready to become a member? Try Crosscourt out by booking a “day pass”{' '}
      <Link to={ROUTES.MEMBERSHIPS}>drop-in session.</Link>
    </p>
  </SectionLayout>
);

Ready.propTypes = {};

export default Ready;
