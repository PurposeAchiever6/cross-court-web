import React from 'react';

import ROUTES from 'shared/constants/routes';
import Icon from 'shared/components/Icon';

import Icons from '../components/Icons';

import catchASweatIcon from 'shared/images/catch-a-sweat-2.png';
import secureTheWIcon from 'shared/images/secure-the-w-2.png';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

function SweatDesktop() {
  return (
    <section className="sweat section-block text-white">
      <section className="left-section"></section>
      <section className="right-section">
        <p className="title dharma_gothic_cheavy">SWEAT</p>
        <Icons className="icons">
          <Icon>
            <img alt="" className="catch-a-sweat" src={catchASweatIcon} />
            <span className="boxes-text">
              CATCH A<br />
              SWEAT
            </span>
          </Icon>
          <Icon>
            <img alt="" className="secure-the-w" src={secureTheWIcon} />
            <span className="boxes-text">
              SECURE
              <br />
              THE W
            </span>
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
          <PrimaryButton to={ROUTES.LOCATIONS} double>
            LET&apos;S RIDE
          </PrimaryButton>
        </div>
      </section>
    </section>
  );
}

export default SweatDesktop;
