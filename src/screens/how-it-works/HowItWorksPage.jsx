import React from 'react';

import TheSessionVideo from './sections/TheSessionVideo';
import SignupDesktop from './sections/SignupDesktop';
import ShowupDesktop from './sections/ShowupDesktop';
import SweatDesktop from './sections/SweatDesktop';
import NewToCrosscourt from './sections/NewToCrosscourt';
import TheSession from './sections/TheSession';

const HowItWorksPage = () => {
  return (
    <>
      <NewToCrosscourt />
      <TheSessionVideo />
      <SignupDesktop />
      <ShowupDesktop />
      <SweatDesktop />
      <TheSession />
    </>
  );
};

export default HowItWorksPage;
