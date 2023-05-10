import React from 'react';
import dotsBgImg from 'shared/images/backgrounds/dots.png';

const GradientDots = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/99 to-white" />
    <img src={dotsBgImg} alt="dots" className="w-full" />
  </div>
);

export default GradientDots;
