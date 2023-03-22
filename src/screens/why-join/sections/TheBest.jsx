import React from 'react';

import HighFive from 'screens/why-join/images/high-five.png';
import SectionLayout from 'shared/components/layout/SectionLayout';
import ExpandedLayout from 'shared/components/layout/ExpandedLayout';

const TheBest = () => (
  <SectionLayout>
    <h2 className="font-shapiro95_super_wide text-3xl md:text-5xl md:max-w-4xl mb-4 md:mb-12">
      We use curated spaces, member driven experiences &amp; our community to push each other to be{' '}
      <span className="text-cc-purple">OUR best</span>, not THE best.
    </h2>
    <ExpandedLayout mdBreakpoint={false} lgBreakpoint={false} xlBreakpoint={false}>
      <img src={HighFive} alt="High Five" loading="lazy" />
    </ExpandedLayout>
  </SectionLayout>
);

TheBest.propTypes = {};

export default TheBest;
