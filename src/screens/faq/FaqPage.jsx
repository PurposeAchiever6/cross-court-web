import React from 'react';

import PageLayout from 'shared/components/layout/PageLayout';
import SectionLayout from 'shared/components/layout/SectionLayout';
import FaqList from 'screens/faq/components/FaqList';

const FaqPage = () => (
  <PageLayout>
    <SectionLayout className="max-w-5xl mx-auto">
      <h1 className="font-shapiro95_super_wide text-center text-xl md:text-3xl mb-10">
        Frequently Asked Questions
      </h1>
      <FaqList />
    </SectionLayout>
  </PageLayout>
);

export default FaqPage;
