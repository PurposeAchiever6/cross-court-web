import React from 'react';

import ROUTES from 'shared/constants/routes';
import ArrowLeftSvg from 'shared/components/svg/ArrowLeftSvg';
import MerchSvg from 'shared/components/svg/MerchSvg';
import TimerSvg from 'shared/components/svg/TimerSvg';
import Icon from 'shared/components/Icon';

import ShowupImage from '../images/showup-desktop.webp';
import Icons from '../components/Icons';
import Link from '../components/Link';
import Par from '../components/Par';
import Text from '../components/Text';

function Showup() {
  return (
    <>
      <div className="desktop-container">
        <div className="info">
          <div>
            <h2 className="title title--black">
              show <em>up</em>
            </h2>
            <Icons>
              <Icon>
                <MerchSvg />
                <Text>All equipment provided</Text>
              </Icon>
              <Icon>
                <TimerSvg />
                <Text>Guided Experience</Text>
              </Icon>
            </Icons>
            <Par>
              <p>Each hour-long session is run by our trained Experience Team</p>
              <p>
                Our Session Experience Managers will check you in, bump music, keep score, and make
                sure you leave dripping in sweat, while our Session Officials will enforce the rules
                and maintain order on the court
              </p>
            </Par>
          </div>
          <div>
            <Link to={ROUTES.LOCATIONS}>
              reserve now <ArrowLeftSvg />
            </Link>
          </div>
        </div>
      </div>
      <div className="desktop-container">
        <img src={ShowupImage} className="image image--large" alt="match being played" />
      </div>
    </>
  );
}

export default Showup;
