import React from 'react';

import ROUTES from 'shared/constants/routes';
import { ReactComponent as CatchASweatSvg } from 'shared/components/svg/catch-a-sweat.svg';
import { ReactComponent as SecureTheWSvg } from 'shared/components/svg/secure-the-w.svg';
import Icon from 'shared/components/Icon';

import ArButton from 'shared/components/ArButton';
import Icons from '../components/Icons';
import Text from '../components/Text';

import catchASweatIcon from 'shared/images/catch-a-sweat-2.png';
import secureTheWIcon from 'shared/images/secure-the-w-2.png';

function SweatDesktop() {
  return (
    <section className="sweat section-block text-white">
      <section className="left-section"></section>
      <section className="right-section">
        <p className="title dharma_gothic_cheavy">SWEAT</p>
        <Icons className="icons">
          <Icon>
            <img className="catch-a-sweat" src={catchASweatIcon} />
            <span className="boxes-text">CATCH A<br />SWEAT</span>
          </Icon>
          <Icon>
            <img className="secure-the-w" src={secureTheWIcon} />
            <span className="boxes-text">SECURE<br />THE W</span>
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
