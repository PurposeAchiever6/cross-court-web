import PageLayout from 'shared/components/layout/PageLayout';
import SectionLayout from 'shared/components/layout/SectionLayout';

import Tabs from 'shared/components/Tabs';
import { BILLING_TAB } from 'shared/constants/tabs';

import Account from 'screens/settings/components/Account';
import Billing from 'screens/settings/components/Billing';
import Bio from 'screens/settings/components/Bio';

const SettingsPage = () => (
  <PageLayout>
    <SectionLayout>
      <div className="max-w-4xl mx-auto">
        <h2 className="font-shapiro95_super_wide text-3xl md:text-5xl">Settings</h2>
        <Tabs className="mt-10">
          <div label="Account">
            <Account />
          </div>
          <div label={BILLING_TAB}>
            <Billing />
          </div>
          <div label="Bio">
            <Bio />
          </div>
          <div label="Skill Rating"></div>
          <div label="Q&amp;A"></div>
        </Tabs>
      </div>
    </SectionLayout>
  </PageLayout>
);

export default SettingsPage;
