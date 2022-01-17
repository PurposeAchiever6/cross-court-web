import React, { useRef } from 'react';

import CrosscourtKeys from 'shared/components/CrosscourtKeys';
import TheSessionVideo from './sections/TheSessionVideo';
import Signup from './sections/Signup';
import Showup from './sections/Showup';
import Sweat from './sections/Sweat';
import NewToCrosscourt from './sections/NewToCrosscourt';

const HowItWorksPage = () => {
  const sessionVideoRef = useRef(null);

  const scrollToTheSessionVideo = () => {
    const elementRect = sessionVideoRef.current.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.pageYOffset;
    const absoluteElementMiddle = absoluteElementTop + elementRect.height / 2;
    const middle = absoluteElementMiddle - window.innerHeight / 2;

    window.scroll({ top: middle });

    setTimeout(() => {
      sessionVideoRef.current.play();
      sessionVideoRef.current.currentTime = 0;
      sessionVideoRef.current.muted = false;
    }, 1000);
  };

  return (
    <>
      <NewToCrosscourt scrollToTheSessionVideo={scrollToTheSessionVideo} />
      <TheSessionVideo ref={sessionVideoRef} />
      <Signup />
      <Showup />
      <Sweat />
      <CrosscourtKeys showBtn />
    </>
  );
};

export default HowItWorksPage;
