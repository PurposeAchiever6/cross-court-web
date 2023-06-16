import React from 'react';

import SectionLayout from 'shared/components/layout/SectionLayout';
import LineDashedSvg from 'shared/components/svg/LineDashedSvg';
import DashedXSvg from 'shared/components/svg/DashedXSvg';
import List from 'shared/components/List';

const RIGHT_ARROW = '\u290F';

const PlatformForProgress = () => (
  <SectionLayout className="md:flex py-10 md:py-20 bg-cc-blue-900 mb-24">
    <div className="relative md:w-1/2 md:flex md:flex-col justify-between">
      <div>
        <h2 className="font-shapiro95_super_wide text-2xl md:text-3xl max-w-2xl mb-2">
          Are you consistently looking for places, people, and perspectives that will <br />
          <span className="text-cc-purple">bring out the best in you?</span>
        </h2>
        <span className="hidden md:block text-6xl font-shapiro95_super_wide text-cc-purple">
          {RIGHT_ARROW}
        </span>
      </div>
      <DashedXSvg className="hidden md:block absolute -bottom-20 opacity-40 self-end mr-16" />
    </div>
    <div className="md:w-1/2">
      <LineDashedSvg className="text-cc-purple mb-6" />
      <p className="font-shapiro95_super_wide text-md md:text-xl mb-6">
        Current options can inhibit your abilities and demotivate you:
      </p>
      <p className="font-shapiro95_super_wide mb-4">Pick-up at the park</p>
      <List
        variant="cross"
        bulletsColor="warning"
        align="center"
        className="md:pr-8 text-sm mb-8"
        items={[
          <span>
            <span className="shapiro95_super_wide">Weather</span>: can be bad or make it difficult
            to plan around.
          </span>,
          <span>
            <span className="shapiro95_super_wide">Availability</span>: parks can be crowded during
            nice days and courts can be hard to find in your area.
          </span>,
          <span>
            <span className="shapiro95_super_wide">Quality of play</span>: mostly informal and may
            not have rules or organization. This can lead to uneven skill levels, arguments, lack of
            consistency.
          </span>,
        ]}
      />
      <p className="font-shapiro95_super_wide mb-4">Courts at gyms</p>
      <List
        variant="cross"
        bulletsColor="warning"
        align="center"
        className="md:pr-8 text-sm mb-8"
        items={[
          <span>
            <span className="shapiro95_super_wide">Crowds</span>: courts at gyms can be crowded,
            especially during peak hours.
          </span>,
          <span>
            <span className="shapiro95_super_wide">Strict Rules</span>: gyms have strict rules for
            playing basketball, such as no dunking or no full-court games. These rules can be
            frustrating for players who play a more free-form style.
          </span>,
          <span>
            <span className="shapiro95_super_wide">Hours of operation</span>: gyms may not provide
            access during your preferred times of day.
          </span>,
        ]}
      />
      <LineDashedSvg className="text-cc-purple mt-6" />
    </div>
  </SectionLayout>
);

export default PlatformForProgress;
