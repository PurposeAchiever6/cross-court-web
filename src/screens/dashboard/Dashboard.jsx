import React, { useState } from 'react';

import WinStreak from './components/WinStreak';
import Randomizer from './components/Randomizer';
import Fouls from './components/Fouls';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import { getUserProfile } from 'screens/my-account/reducer';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ROUTES from 'shared/constants/routes';

const DARK = 'dark';
const PLUS = 'plus';

const Dashboard = () => {
  const [darkFouls, setDarkFouls] = useState(0);
  const [lightFouls, setLightFouls] = useState(0);
  const [streak, setStreak] = useState([]);
  const { isSem, isReferee } = useSelector(getUserProfile);

  if (!(isSem || isReferee)) {
    return <Redirect to={ROUTES.HOME} />;
  }

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
    <div className="flex flex-col bg-cc-black min-h-screen">
      <div className="flex justify-end">
        <PrimaryButton inverted bg="transparent" className="m-4" px="100px" onClick={() => reset()}>
          reset
        </PrimaryButton>
      </div>
      <Fouls setFouls={setFouls} darkFouls={darkFouls} lightFouls={lightFouls} />
      <WinStreak setStreak={setStreak} streak={streak} />
      <Randomizer />
    </div>
  );
};

export default Dashboard;
