import React from 'react';

import DesktopLanding from './components/DesktopLanding';
import MobileLanding from './components/MobileLanding';
import AnyQuestions from './components/desktop/AnyQuestions';
import Join from './components/desktop/Join';

const SemHomePage = () => (
  <>
    <Join />
    <DesktopLanding />
    <MobileLanding />
    <AnyQuestions />
  </>
);

export default SemHomePage;
