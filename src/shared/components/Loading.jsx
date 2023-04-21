import React from 'react';

const Loading = () => (
  <div className="bg-cc-black/90 justify-center items-center fixed inset-0 z-[9998]">
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
