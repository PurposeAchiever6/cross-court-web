import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { takeWhile } from 'ramda';

const WinStreak = ({ setStreak, streak }) => {
  const dispatch = useDispatch();
  const [threeInARow, setThreeInARow] = useState();

  const buttonClasses =
    'absolute -top-14 w-52 h-52 shadow-lg border border-white z-10 cursor-pointer flex flex-col font-shapiro95_super_wide p-3 items-center justify-center';

  useEffect(() => {
    if (takeWhile((item) => item === streak[0], streak).length === 3) {
      setThreeInARow(streak[0]);
      setTimeout(() => {
        setThreeInARow();
        setStreak([]);
      }, 3000);
    }
  }, [streak, dispatch]);

  return (
    <div className="flex flex-col w-full mb-8">
      <p className="font-shapiro95_super_wide text-white text-7xl p-6 mb-8 ml-4">WINS</p>
      <div className="flex justify-around mt-4 p-6 relative">
        <div
          className={`bg-cc-black text-white left-40 ${buttonClasses}`}
          onClick={() => setStreak(['black', ...streak])}
        >
          {threeInARow === 'black' ? (
            <div className="h-auto bg-cc-black">
              <p>Dark won</p>
              <p className=""> 3 in a row!</p>
            </div>
          ) : (
            <>
              <p className="text-9xl">+1</p>
              <p className="text-3xl">DARK</p>
            </>
          )}
        </div>
        <div
          className={`bg-white text-cc-black right-40 ${buttonClasses}`}
          onClick={() => setStreak(['white', ...streak])}
        >
          {threeInARow === 'white' ? (
            <div className="h-auto bg-white">
              <p>Light won</p>
              <p className=""> 3 in a row!</p>
            </div>
          ) : (
            <>
              <p className="text-9xl">+1</p>
              <p className="text-3xl">LIGHT</p>
            </>
          )}
        </div>
      </div>
      <div className="flex items-end z-0 bg-cc-purple w-full h-64 mt-4">
        <div className="bottom-4 ml-4 font-dharma_gothic_cheavy_italic text-10xl ml-24">
          {[0, 1, 2].map((index) => {
            return streak.length > index ? (
              <span key={`win-${index}`} className={`ml-6 text-${streak[index]}`}>
                W
              </span>
            ) : (
              <span key={`win-${index}`} className="ml-6 text-gray-300">
                W
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WinStreak;
