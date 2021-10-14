import React, { useState, useEffect } from 'react';

import WinStreak from './components/WinStreak';
import Randomizer from './components/Randomizer';
import Fouls from './components/Fouls';
import Clock from './components/Clock';
import PlayersList from './components/PlayersList';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import { getUserProfile, getPageLoading } from 'screens/my-account/reducer';
import { useSelector } from 'react-redux';
import ROUTES from 'shared/constants/routes';
import { useHistory } from 'react-router-dom';

const DARK = 'dark';
const PLUS = 'plus';

const Dashboard = () => {
  const [darkFouls, setDarkFouls] = useState(0);
  const [lightFouls, setLightFouls] = useState(0);
  const [streak, setStreak] = useState([]);
  const { isSem, isReferee } = useSelector(getUserProfile);
  const pageLoading = useSelector(getPageLoading);
  const history = useHistory();

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
      <div className="flex flex-col bg-cc-black min-h-screen">
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
      </div>
    )
  );
};

export default Dashboard;
