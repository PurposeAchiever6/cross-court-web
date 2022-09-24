/* eslint-disable no-lonely-if */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import { getUserProfile, getPageLoading } from 'screens/my-account/reducer';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import LazyBackgroundImage from 'shared/components/LazyBackgroundImage';
import blackTextureBgImg from 'shared/images/black-texture-bg.png';

import WinStreak from './components/WinStreak';
import Randomizer from './components/Randomizer';
import Fouls from './components/Fouls';
import Clock from './components/Clock';
import PlayersList from './components/PlayersList';

const DARK = 'dark';
const PLUS = 'plus';

const DashboardPage = () => {
  const history = useHistory();

  const [darkFouls, setDarkFouls] = useState(0);
  const [lightFouls, setLightFouls] = useState(0);

  const [streak, setStreak] = useState([]);
  const { isSem, isReferee } = useSelector(getUserProfile);
  const pageLoading = useSelector(getPageLoading);

  useEffect(() => {
    if (!pageLoading) {
      if (!(isSem || isReferee)) {
        history.push(ROUTES.HOME);
      }
    }
  }, [isSem, isReferee, pageLoading, history]);

  const setFouls = (team, operation) => {
    if (team === DARK) {
      if (operation === PLUS) {
        setDarkFouls(darkFouls + 1);
      } else {
        const fouls = darkFouls - 1;
        setDarkFouls(fouls < 0 ? 0 : fouls);
      }
    } else {
      if (operation === PLUS) {
        setLightFouls(lightFouls + 1);
      } else {
        const fouls = lightFouls - 1;
        setLightFouls(fouls < 0 ? 0 : fouls);
      }
    }
  };

  const reset = () => {
    setDarkFouls(0);
    setLightFouls(0);
    setStreak([]);
  };

  return (
    !pageLoading && (
      <LazyBackgroundImage
        as="div"
        img={blackTextureBgImg}
        className="flex flex-col min-h-screen bg-no-repeat bg-cover bg-center"
      >
        <div className="flex justify-end">
          <PrimaryButton
            inverted
            bg="transparent"
            className="m-4"
            px="100px"
            onClick={() => reset()}
          >
            reset
          </PrimaryButton>
        </div>
        <Fouls setFouls={setFouls} darkFouls={darkFouls} lightFouls={lightFouls} />
        <WinStreak setStreak={setStreak} streak={streak} />
        <Randomizer />
        <Clock />
        <PlayersList />
      </LazyBackgroundImage>
    )
  );
};

export default DashboardPage;
