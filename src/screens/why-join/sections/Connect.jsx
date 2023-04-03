import React from 'react';

import SectionLayout from 'shared/components/layout/SectionLayout';
import ExpandedLayout from 'shared/components/layout/ExpandedLayout';

import Meetsups from 'screens/why-join/images/meetups.png';
import Discord from 'screens/why-join/images/discord.png';
import DashedCircleSvg from 'shared/components/svg/DashedCircleSvg';
import Button from 'shared/components/Button';

const Connect = () => (
  <SectionLayout>
    <ExpandedLayout
      mdBreakpoint={false}
      lgBreakpoint={false}
      xlBreakpoint={false}
      className="bg-cc-blue-900 px-4 md:px-28 py-6 md:py-32"
    >
      <div className="flex flex-col-reverse md:flex-row justify-between">
        <div className="flex flex-col md:max-w-2xl">
          <p className="font-shapiro95_super_wide text-sm">WELCOME TO THE CC TEAM</p>
          <h1 className="font-shapiro95_super_wide text-cc-purple text-4xl md:text-6xl mt-4">
            Connect.
          </h1>
          <h3 className="mt-4 font-shapiro95_super_wide text-3xl">
            A community bonded by the power of team sport.
          </h3>
          <p className="mt-4 text-lg">
            You’ve probably heard that you’re a product of the people you spend the most time with.
            The ccteam knows success is a result of being challenged and encouraged by those on the
            same journey around us. Our members rediscover their connection to sport while
            discovering new connections to people and their purpose.
          </p>
        </div>
        <DashedCircleSvg className="hidden md:block w-44 h-44 md:w-80 md:h-80 self-center md:self-start mt-4 md:mt-0 mb-8 md:mb-0" />
      </div>
    </ExpandedLayout>
    <ExpandedLayout
      mdBreakpoint={false}
      lgBreakpoint={false}
      xlBreakpoint={false}
      className="flex flex-col md:flex-row"
    >
      <img
        className="md:w-1/2 object-cover w-full h-full align-middle"
        src={Meetsups}
        alt="Meetups &amp; events"
        loading="lazy"
      />
      <div className="md:w-1/2 flex flex-col justify-center px-4 md:px-14 bg-cc-blue-900">
        <h3 className="font-shapiro95_super_wide text-3xl mb-4 mt-6 md:mt-0">
          Attend Meetups &amp; Events
        </h3>
        <p className="text-lg">
          Connect with like-minded people who are on the same journey you are. Whether it's talking
          about the new Jordans that just dropped or having that conversation that sparks an idea—we
          cultivate the creative spirit that sport inspires.
        </p>
      </div>
    </ExpandedLayout>
    <ExpandedLayout
      mdBreakpoint={false}
      lgBreakpoint={false}
      xlBreakpoint={false}
      className="flex flex-col-reverse md:flex-row mt-4 md:mt-0"
    >
      <div className="md:w-1/2 flex flex-col justify-center px-4 md:px-14 bg-cc-blue-900">
        <h3 className="font-shapiro95_super_wide text-3xl mb-4 mt-6 md:mt-0">Meet other Members</h3>
        <p className="text-lg">
          Our community is at the heart of everything we do and our spaces, beyond the physical, are
          built to create environments that spark connection. Crosscourt members have access to our
          Discord, a members directory, and other unique, socially designed features that drive
          relationships.
        </p>
        <Button
          className="my-4 md:mb-0 w-min"
          to={import.meta.env.VITE_DISCORD_LINK}
          variant="outline-purple"
          isExternal
          target="_blank"
        >
          JOIN DISCORD
        </Button>
      </div>
      <img
        className="md:w-1/2 object-cover w-full h-full align-middle"
        src={Discord}
        alt="Discord"
        loading="lazy"
      />
    </ExpandedLayout>
  </SectionLayout>
);

Connect.propTypes = {};

export default Connect;
