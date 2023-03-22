import React from 'react';

import PageLayout from 'shared/components/layout/PageLayout';

import TheBest from './sections/TheBest';
import Connect from './sections/Connect';
import Create from './sections/Create';
import Compete from './sections/Compete';
import Ready from './sections/Ready';
import Gallery from './sections/Gallery';
import Faq from './sections/Faq';

const HowItWorksPage = () => (
  <PageLayout>
    <TheBest />
    <Connect />
    <Create />
    <Compete />
    <Ready />
    <Gallery />
    <Faq />
  </PageLayout>
);

export default HowItWorksPage;
