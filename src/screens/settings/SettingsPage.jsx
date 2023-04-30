import React from 'react';
import PageLayout from 'shared/components/layout/PageLayout';
import SectionLayout from 'shared/components/layout/SectionLayout';

import Tabs from 'shared/components/Tabs';
import { BILLING_TAB } from 'shared/constants/tabs';

import Account from 'screens/settings/components/Account';
import Billing from 'screens/settings/components/Billing';
import Bio from 'screens/settings/components/Bio';
import IntensityLevel from 'screens/settings/components/IntensityLevel';

const SettingsPage = () => (
  <PageLayout>
    <SectionLayout>
      <div className="max-w-4xl mx-auto">
        <h2 className="font-shapiro95_super_wide text-3xl md:text-5xl mb-10">Settings</h2>
        <Tabs variant="opacity-underline" showSeparator>
          <div label="Account">
            <Account />
          </div>
          <div label={BILLING_TAB} showSeparator>
            <Billing />
          </div>
          <div label="Bio">
            <Bio />
          </div>
          <div label="Intensity Rating">
            <IntensityLevel />
          </div>
        </Tabs>
      </div>
    </SectionLayout>
  </PageLayout>
);

export default SettingsPage;
