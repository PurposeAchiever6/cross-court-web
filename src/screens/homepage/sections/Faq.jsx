import React from 'react';

import SectionLayout from 'shared/components/layout/SectionLayout';
import FaqList from 'screens/faq/components/FaqList';

const Faq = () => (
  <SectionLayout className="mt-12 md:mt-20">
    <h2 className="font-shapiro95_super_wide text-2xl text-center mb-8 md:mb-12">
      Frequently Asked Questions
    </h2>
    <FaqList className="max-w-screen-md mx-auto" showInBatches={3} />
  </SectionLayout>
);

export default Faq;
