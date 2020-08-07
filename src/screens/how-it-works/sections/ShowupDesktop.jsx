import React from 'react';

import ROUTES from 'shared/constants/routes';
import { ReactComponent as JerseySvg } from 'shared/components/svg/jersey.svg';
import { ReactComponent as GuidedExperienceSvg } from 'shared/components/svg/guided-experience.svg';
import Icon from 'shared/components/Icon';

import ArButton from 'shared/components/ArButton';
import Icons from '../components/Icons';
import Text from '../components/Text';

import equipmentProvidedIcon from 'shared/images/equipment-provided-2.png';
import guidedExperienceIcon from 'shared/images/guided-experience.png';

function Showup() {
  return (
    <section className="show-up section-block text-white">
      <section className="left-section">
        <p className="title dharma_gothic_cheavy">SHOW UP</p>
        <Icons className="icons">
          <Icon>
            <img className="equipment-provided" src={equipmentProvidedIcon} />
            <span className="boxes-text">EQUIPMENT PROVIDED</span>
          </Icon>
          <Icon>
            <img className="guided-experience" src={guidedExperienceIcon} />
            <span className="boxes-text">GUIDED EXPERIENCE</span>
          </Icon>
        </Icons>
        <p className="description">
          Each hour-long session is run by our trained Experience Team.
          <br />
          <br />
          Our Session Experience Managers will check you in, DJ, keep score, and make sure you leave
          dripping in sweat, while our Session Officials enforce the rules and maintain order on the
          court.
        </p>
        <div className="buttons-container">
          {/* <ArButton link={ROUTES.SEM} double inverted>
            JOIN THE TEAM
          </ArButton> */}
          <ArButton link={ROUTES.LOCATIONS} double>
            RESERVE NOW
          </ArButton>
        </div>
      </section>
      <section className="right-section"></section>
    </section>
  );
}

export default Showup;
