import React from 'react';

import ROUTES from 'shared/constants/routes';
import OnYourTimeSvg from 'shared/components/svg/OnYourTimeSvg';
import GymSvg from 'shared/components/svg/GymSvg';
import Icon from 'shared/components/Icon';

import ArButton from 'shared/components/ArButton';
import Icons from '../components/Icons';
import Text from '../components/Text';

import onYourTimeIcon from 'shared/images/on-your-time.png';
import premiumFacilityIcon from 'shared/images/premium-facility.png';

function Signup() {
  return (
    <section className="sign-up section-block text-black">
      <section className="left-section"></section>
      <section className="right-section">
        <p className="title dharma_gothic_cheavy">SIGN UP</p>
        <Icons className="icons">
          <Icon>
            <img className="on-your-time" src={onYourTimeIcon} />
            <span className="boxes-text">ON YOUR<br />TIME</span>
          </Icon>
          <Icon>
            <img className="premium-facility" src={premiumFacilityIcon} />
            <span className="boxes-text">AT A LOCATION<br />NEAR YOU</span>
          </Icon>
        </Icons>
        <p className="description">
          Reserve one of the 15 available spots in a session at a location near you. Come solo or
          with friends. Bring your shoes, some water, a towel, and a ball if you have 'em.
        </p>
        <div className="buttons-container">
          <ArButton link={ROUTES.LOCATIONS} double inverted>
            FIND A SESSION
          </ArButton>
        </div>
      </section>
    </section>
  );
}

export default Signup;
