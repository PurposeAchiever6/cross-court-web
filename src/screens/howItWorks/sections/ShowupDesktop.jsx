import React from 'react';

import ArrowLeftSvg from 'shared/components/ArrowLeftSvg';
import MerchSvg from 'shared/components/MerchSvg';
import TimerSvg from 'shared/components/TimerSvg';
import ShowupImage from '../images/ShowupDesktop.jpg';
import Icons from '../components/Icons';
import Icon from '../components/Icon';
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
                <Text>Arrive at least 10 minutes early</Text>
              </Icon>
            </Icons>
            <Par>
              <p>
                Athletic shoes are required, and we also suggest bringing a ball, water, and towel.
                We’ll take care of the rest.
              </p>
              <p>
                Arriving early is recommended since the first 10 players to check in start the first
                game.
              </p>
              <p>
                When you arrive, your Session Experience Manager will check you in and hand you a
                jersey. Depending on the order of your arrival, your SEM will let you know which
                color jersey to wear.
              </p>
              <p>
                In the meantime, talk strategy with your teammates, or stretch out until you hear
                the whistle.
              </p>
            </Par>
          </div>
          <div>
            <Link to="/signup">
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
