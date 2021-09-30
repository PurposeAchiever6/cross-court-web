import React, { useState } from 'react';
import { PLAYERS_PER_TEAM, MAX_MISSING_PLAYERS } from 'shared/constants/gameConstants';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const Randomizer = () => {
  const [missingPlayers, setMissingPlayers] = useState(0);
  const [playersThatStay, setPlayersThatStay] = useState([]);
  const addMissingPlayer = () => {
    setMissingPlayers(Math.min(missingPlayers + 1, MAX_MISSING_PLAYERS));
  };

  const substractMissingPlayer = () => {
    setMissingPlayers(Math.max(missingPlayers - 1, 0));
  };

  const randomize = () => {
    const result = [];
    while (result.length < missingPlayers) {
      const randomNumber = Math.floor(Math.random() * PLAYERS_PER_TEAM) + 1;
      if (result.indexOf(randomNumber) === -1) result.push(randomNumber);
    }
    setPlayersThatStay(result);
  };

  return (
    <div className="w-full mb-2 text-white px-6 py-2">
      <p className="text-white text-7xl font-shapiro95_super_wide ml-4">SUBS</p>
      <div className="flex m-2 ml-4 font-shapiro95_super_wide text-7xl">
        <div className="border border-white flex items-center justify-center mr-4 h-40 w-40">
          {missingPlayers}
        </div>
        <div
          className="border border-white flex items-center justify-center mr-4 cursor-pointer h-40 w-40"
          onClick={substractMissingPlayer}
        >
          -
        </div>
        <div
          className="border border-white flex items-center justify-center mr-4 cursor-pointer h-40 w-40"
          onClick={addMissingPlayer}
        >
          +
        </div>
      </div>
      <PrimaryButton px="100px" inverted bg="transparent" onClick={randomize} className="ml-4 my-4">
        Randomize
      </PrimaryButton>
      <div className="h-56">
        {playersThatStay.length > 0 && (
          <div className="flex justify-around">
            {playersThatStay.map((index) => (
              <div
                className="flex items-center justify-center font-dharma_gothic_cheavy_italic flex bg-cc-black text-12xl shadow-lg border border-white w-56"
                key={`stay-${index}`}
              >
                <p>{`${index}`}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Randomizer;
