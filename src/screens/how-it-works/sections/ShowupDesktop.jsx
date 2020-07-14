import React from 'react';

import ROUTES from 'shared/constants/routes';
import { ReactComponent as JerseySvg } from 'shared/components/svg/jersey.svg';
import { ReactComponent as GuidedExperienceSvg } from 'shared/components/svg/guided-experience.svg';
import Icon from 'shared/components/Icon';

import ArButton from 'shared/components/ArButton';
import Icons from '../components/Icons';
import Text from '../components/Text';

function Showup() {
  return (
    <section className="show-up section-block text-white">
      <section className="left-section">
        <p className="title dharma_gothic_cheavy">SHOW UP</p>
        <Icons className="icons">
          <Icon>
            <JerseySvg />
            <Text>EQUIPMENT PROVIDED</Text>
          </Icon>
          <Icon>
            <GuidedExperienceSvg />
            <Text>GUIDED EXPERIENCE</Text>
          </Icon>
        </Icons>
        <p className="each-hour">Each hour-long session is run by our trained Experience Team.</p>
        <p className="our-session">
          Our Session Experience Managers will check you in, DJ, keep score, and make sure you leave
          dripping in sweat, while our Session Officials enforce the rules and maintain order on the
          court.
        </p>
        <ArButton link={ROUTES.SEM} double inverted>
          JOIN THE TEAM
        </ArButton>
        <ArButton link={ROUTES.LOCATIONS} double>
          RESERVE NOW
        </ArButton>
      </section>
      <section className="right-section"></section>
    </section>
  );
}

export default Showup;
