import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import colors from 'shared/styles/constants';

const FreeSessionCreditAddedContainer = styled.div`
  background: linear-gradient(
    0deg,
    white 0%,
    rgba(91, 91, 91, 0.25) 5%,
    rgba(65, 65, 65, 0.5) 15%,
    rgb(39, 39, 39, 0.75) 25%,
    ${colors.brandBlack} 50%
  );
  height: 200vh;
`;

const FreeSessionCreditAdded = ({ onFinishAnimation }) => {
  const [animationEnabled, setAnimationEnabled] = useState(true);
  const [animationClass, setAnimationClass] = useState('');
  const [show, setShow] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onScroll = () => {
    if (!animationEnabled) {
      return;
    }

    let newAnimationClass = '';

    if (window.scrollY >= 20 && window.scrollY < 40) {
      newAnimationClass = 'anim1';
    } else if (window.scrollY >= 40 && window.scrollY < 60) {
      newAnimationClass = 'anim2';
    } else if (window.scrollY >= 60 && window.scrollY < 80) {
      newAnimationClass = 'anim3';
    } else if (window.scrollY >= 80 && window.scrollY < 100) {
      newAnimationClass = 'anim4';
    } else if (window.scrollY >= 100 && window.scrollY < 120) {
      newAnimationClass = 'anim5';
    } else if (window.scrollY >= 120 && window.scrollY < 140) {
      newAnimationClass = 'anim6';
    } else if (window.scrollY >= 140 && window.scrollY < 160) {
      newAnimationClass = 'anim7';
    } else if (window.scrollY >= 160 && window.scrollY < 180) {
      newAnimationClass = 'anim8';
    } else if (window.scrollY >= 180 && window.scrollY < 200) {
      newAnimationClass = 'anim9';
    } else if (window.scrollY >= 200 && window.scrollY < 220) {
      newAnimationClass = 'anim10';
    } else if (window.scrollY >= 220 && window.scrollY < 240) {
      newAnimationClass = 'anim11';
    } else if (window.scrollY >= 240 && window.scrollY < 260) {
      newAnimationClass = 'anim12';
    } else if (window.scrollY >= 260 && window.scrollY < 280) {
      newAnimationClass = 'anim13';
    } else if (window.scrollY >= 280 && window.scrollY < 300) {
      newAnimationClass = 'anim14';
    } else if (window.scrollY >= 300 && window.scrollY < 320) {
      newAnimationClass = 'anim15';
    } else if (window.scrollY >= 320 && window.scrollY < 340) {
      newAnimationClass = 'anim16';
    } else if (window.scrollY >= 340 && window.scrollY < 360) {
      newAnimationClass = 'anim17';
    } else if (window.scrollY >= 360 && window.scrollY < 380) {
      newAnimationClass = 'anim18';
    } else if (window.scrollY >= 380 && window.scrollY < 400) {
      newAnimationClass = 'anim19';
    } else if (window.scrollY >= 400 && window.scrollY < 420) {
      newAnimationClass = 'anim20';
    } else if (window.scrollY >= 420 && window.scrollY < 440) {
      newAnimationClass = 'anim21';
    } else if (window.scrollY >= 440 && window.scrollY < 460) {
      newAnimationClass = 'anim22';
    } else if (window.scrollY >= 460 && window.scrollY < 480) {
      newAnimationClass = 'anim23';
    } else if (window.scrollY >= 480 && window.scrollY < 500) {
      newAnimationClass = 'anim24';
    } else if (window.scrollY >= 500 && window.scrollY < 520) {
      newAnimationClass = 'anim25';
    } else if (window.scrollY >= 520 && window.scrollY < 540) {
      newAnimationClass = 'anim26';
    } else if (window.scrollY >= 540 && window.scrollY < 560) {
      newAnimationClass = 'anim27';
    } else if (window.scrollY >= 560 && window.scrollY < 580) {
      newAnimationClass = 'anim28';
    } else if (window.scrollY >= 580 && window.scrollY < 600) {
      newAnimationClass = 'anim29';
    } else if (window.scrollY >= 600) {
      newAnimationClass = 'anim30';

      setAnimationEnabled(false);

      window.setTimeout(() => {
        setShow(false);
        onFinishAnimation();
        window.scrollTo(0, 0);
      }, 1250);
    }

    setAnimationClass(newAnimationClass);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  if (!show) {
    return null;
  }

  return (
    <FreeSessionCreditAddedContainer className="free-session-credit-added relative text-white">
      <div className="animate-fade fixed inset-x-0 top-1/2 transform -translate-y-1/2 text-center text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-none px-5">
        <div className={`title whitespace-pre-wrap sm:whitespace-normal ${animationClass}`}>
          <div className="font-shapiro95_super_wide tracking-wide md:pl-2 mb-1">
            {`FREE\nSESSION\nCREDIT`}
          </div>
          <div className="font-shapiro97_air_extd">{`ADDED\nTO\nACCOUNT`}</div>
        </div>
      </div>
      <div className="animate-slide-top fixed bottom-10 inset-x-0 text-center">
        <div className={`scroll ${animationClass}`}>
          <div className="w-1 h-20 sm:h-24 bg-white inline-block mb-4"></div>
          <div className="font-shapiro95_super_wide text-xs md:text-lg">SCROLL TO BOOK SESSION</div>
        </div>
      </div>
    </FreeSessionCreditAddedContainer>
  );
};

FreeSessionCreditAdded.defaultProps = {
  onFinishAnimation: () => null,
};

FreeSessionCreditAdded.propTypes = {
  onFinishAnimation: PropTypes.func,
};

export default FreeSessionCreditAdded;
