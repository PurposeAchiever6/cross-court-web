import React from 'react';

import ROUTES from 'shared/constants/routes';
import { ReactComponent as CatchASweatSvg } from 'shared/components/svg/catch-a-sweat.svg';
import { ReactComponent as SecureTheWSvg } from 'shared/components/svg/secure-the-w.svg';
import Icon from 'shared/components/Icon';

import ArButton from 'shared/components/ArButton';
import Icons from '../components/Icons';
import Text from '../components/Text';

function SweatDesktop() {
  return (
    <section className="sweat section-block text-white">
      <section className="left-section"></section>
      <section className="right-section">
        <p className="title dharma_gothic_cheavy">SWEAT</p>
        <Icons className="icons">
          <Icon>
            <CatchASweatSvg />
            <Text>CATCH A SWEAT</Text>
          </Icon>
          <Icon>
            <SecureTheWSvg />
            <Text>SECURE THE W</Text>
          </Icon>
        </Icons>
        <p className="description">
          Whether you&apos;re looking to sweat for 60 minutes or get a little competitive,
          we&apos;ve got you covered.
          <br />
          <br />
          Our high intensity sessions are fast paced and non stop. Games are to 5 minutes or first
          to 11 by 2&apos;s and 3&apos;s, whichever comes first. Winner stays, but only for a max of
          3 games in a row to ensure you leave dripping in sweat.
        </p>
        <div className="buttons-container">
          <ArButton link={ROUTES.LOCATIONS} double>
            LET&apos;S RIDE
          </ArButton>
        </div>
      </section>
    </section>
  );
}

export default SweatDesktop;
