import React from 'react';

import ROUTES from 'shared/constants/routes';
import Icon from 'shared/components/Icon';

import ArButton from 'shared/components/ArButton';

import equipmentProvidedIcon from 'shared/images/equipment-provided-2.png';
import guidedExperienceIcon from 'shared/images/guided-experience.png';
import Icons from '../components/Icons';

function Showup() {
  return (
    <section className="show-up section-block text-white">
      <section className="left-section">
        <p className="title dharma_gothic_cheavy">SHOW UP</p>
        <Icons className="icons">
          <Icon>
            <img alt="" className="equipment-provided" src={equipmentProvidedIcon} />
            <span className="boxes-text">
              EQUIPMENT
              <br />
              PROVIDED
            </span>
          </Icon>
          <Icon>
            <img alt="" className="guided-experience" src={guidedExperienceIcon} />
            <span className="boxes-text">
              GUIDED
              <br />
              EXPERIENCE
            </span>
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
          <ArButton link={ROUTES.LOCATIONS} double>
            RESERVE NOW
          </ArButton>
        </div>
      </section>
      <section className="right-section" />
    </section>
  );
}

export default Showup;
