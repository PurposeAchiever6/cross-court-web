import React from 'react';

const classes =
  'm-2 shadow-lg border border-white z-10 flex flex-col p-3 items-center justify-center';

const DARK = 'dark';
const LIGHT = 'light';
const PLUS = 'plus';
const MINUS = 'minus';

const Fouls = ({ setFouls, darkFouls, lightFouls }) => (
  <div className="flex flex-col w-full mb-4 font-shapiro95_super_wide p-6">
    <p className="text-white text-7xl ml-4">FOULS</p>
    <div className="flex justify-around">
      <div className="flex flex-col text-white">
        <div className="flex">
          <div
            className={`flex flex-col w-52 h-52 bg-cc-black cursor-pointer ${classes}`}
            onClick={() => setFouls(DARK, MINUS)}
          >
            <p className="text-9xl">-1</p>
            <p className="text-3xl">DARK</p>
          </div>
          <div
            className={`flex flex-col w-52 h-52 bg-cc-black cursor-pointer ${classes}`}
            onClick={() => setFouls(DARK, PLUS)}
          >
            <p className="text-9xl">+1</p>
            <p className="text-3xl">DARK</p>
          </div>
        </div>
        <div className={`h-40 bg-cc-black text-9xl ${classes}`}>{darkFouls}</div>
      </div>
      <div className="flex flex-col text-cc-black">
        <div className="flex">
          <div
            className={`flex flex-col w-52 h-52 bg-white cursor-pointer ${classes}`}
            onClick={() => setFouls(LIGHT, MINUS)}
          >
            <p className="text-9xl">-1</p>
            <p className="text-3xl">LIGHT</p>
          </div>
          <div
            className={`flex flex-col w-52 h-52 bg-white cursor-pointer ${classes}`}
            onClick={() => setFouls(LIGHT, PLUS)}
          >
            <p className="text-9xl">+1</p>
            <p className="text-3xl">LIGHT</p>
          </div>
        </div>
        <div className={`h-40 bg-cc-black text-white text-9xl ${classes}`}>{lightFouls}</div>
      </div>
    </div>
  </div>
);

export default Fouls;
