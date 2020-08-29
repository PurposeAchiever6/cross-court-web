import React from 'react';

const HomeVideo = props => (
  <section className="home-video">
    <video className="video-player" src="/home.mp4" muted playsInline="" controls={true} loop={true}></video>
  </section>
);

export default HomeVideo;
