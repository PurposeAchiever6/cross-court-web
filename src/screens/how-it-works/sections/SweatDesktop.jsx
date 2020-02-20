import React from 'react';
import ROUTES from 'shared/constants/routes';
import SweatSvg from 'shared/components/svg/SweatSvg';
import LockSvg from 'shared/components/svg/LockSvg';
import ArrowLeftSvg from 'shared/components/svg/ArrowLeftSvg';
import Icon from 'shared/components/Icon';
import SweatImage from '../images/SweatDesktop.jpg';
import Icons from '../components/Icons';
import Link from '../components/Link';
import Par from '../components/Par';
import Text from '../components/Text';

function SweatDesktop() {
  return (
    <>
      <div className="desktop-container">
        <img src={SweatImage} className="image image--large" alt="match being played" />
      </div>
      <div className="desktop-container">
        <div className="info">
          <div>
            <h2 className="title">
              <em>sweat</em>
            </h2>
            <Icons>
              <Icon>
                <SweatSvg />
                <Text>Catch a sweat</Text>
              </Icon>
              <Icon>
                <LockSvg />
                <Text>Secure the W</Text>
              </Icon>
            </Icons>
            <Par>
              <p>
                Whether you’re looking for an hour long sweat sesh or some upbeat competition, we’ve
                got you covered.
              </p>
              <p>
                CrossCourt series are fast paced and non stop with a 15 player limit to guarantee
                you leave dripping in sweat. Walking on the court is frowned upon as we expect 60
                minutes of straight hustle.
              </p>
              <p>
                Each Session is made up of games to 5 minutes or first to 11 by 2s and 3s -
                whichever comes first. Winning team stays for a max of three wins in a row.
              </p>
              <p>
                If there’s less than 15 players, our custom Player Selection Process randomly
                chooses who gets to stay on the court.
              </p>
            </Par>
          </div>
          <div>
            <Link to={ROUTES.LOCATIONS}>
              ready to sweat <ArrowLeftSvg />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default SweatDesktop;
