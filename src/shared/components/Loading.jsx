import React from 'react';

const Loading = () => (
  <div className="bg-cc-black flex-1 justify-center items-center fixed h-screen z-9999 w-screen inset-0">
    <div className="loader-wrapper">
      <div className="floor" />
      <div className="ball">
        <div className="ball-line" />
        <div className="ball-line" />
        <div className="ball-line" />
        <div className="ball-line" />
      </div>
    </div>
  </div>
);

export default Loading;
