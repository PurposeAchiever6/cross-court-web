import React from 'react';
import PropTypes from 'prop-types';

import SectionLayout from 'shared/components/layout/SectionLayout';
import ExpandedLayout from 'shared/components/layout/ExpandedLayout';
import VideoPlayer from 'shared/components/VideoPlayer';
import List from 'shared/components/List';
import LineDashedSvg from 'shared/components/svg/LineDashedSvg';
import CircleDashedSvg from 'shared/components/svg/CircleDashedSvg';

const CurrentOptions = ({ className }) => (
  <SectionLayout className={className}>
    <ExpandedLayout lgBreakpoint={false} xlBreakpoint={false} className="mb-10">
      <VideoPlayer url="/how-it-works.mp4" playing muted loop playsInline controls />
    </ExpandedLayout>
    <div className="sm:flex mb-20">
      <div className="w-full sm:pr-4 mb-6 sm:mb-0">
        <h3 className="font-shapiro95_super_wide text-3xl xl:text-4xl">
          Stop worrying about <span className="text-cc-purple">who has next</span> or{' '}
          <span className="text-cc-purple">calling your own fouls</span>
        </h3>
      </div>
      <div className="w-full sm:pl-4">
        <h3 className="font-shapiro95_super_wide text-xl max-w-lg mb-8">
          Current options can inhibit your abilities, waste your time, and demotivate you:
        </h3>
        <List
          variant="cross"
          bulletsColor="red"
          align="center"
          className="text-s"
          items={[
            'Normal pick up can be problematic because of crowded courts, availability, and basic quality of play.',
            'Unorganized pick up often means long waits, unpredictability, arguments, and a lot of BS you don’t have time to deal with.',
          ]}
        />
      </div>
    </div>
    <div className="h-8 relative">
      <LineDashedSvg className="absolute left-0 w-1/2 text-cc-purple" />
      <CircleDashedSvg className="absolute-center-x -mt-8 w-16 h-16 text-cc-purple" />
    </div>
  </SectionLayout>
);

CurrentOptions.defaultProps = {
  className: '',
};

CurrentOptions.propTypes = {
  className: PropTypes.string,
};

export default CurrentOptions;
