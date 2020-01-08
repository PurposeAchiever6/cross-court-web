import React from 'react';

import ClockSvg from 'shared/components/ClockSvg';
import FieldSvg from 'shared/components/FieldSvg';
import ArrowLeftSvg from 'shared/components/ArrowLeftSvg';
import Icon from 'shared/components/Icon';
import SignupImage from '../images/SignupDesktop.jpg';
import Icons from '../components/Icons';
import Link from '../components/Link';
import Par from '../components/Par';
import Text from '../components/Text';

function Signup() {
  return (
    <>
      <div className="desktop-container desktop-container--small">
        <img src={SignupImage} className="image" alt="player celebrating" />
      </div>
      <div className="desktop-container desktop-container--small">
        <div className="info">
          <div>
            <h2 className="title">
              sign <em>up</em>
            </h2>
            <Icons>
              <Icon>
                <ClockSvg />
                <Text>On your time</Text>
              </Icon>
              <Icon>
                <FieldSvg />
                <Text>At a gym near you</Text>
              </Icon>
            </Icons>
            <Par>
              <p>
                Whether you’re an existing member, first time player, or just looking to drop in,
                find a session that fits your schedule and apply your credits.
              </p>
            </Par>
          </div>
          <div>
            <Link to="/signup">
              find a session <ArrowLeftSvg />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
