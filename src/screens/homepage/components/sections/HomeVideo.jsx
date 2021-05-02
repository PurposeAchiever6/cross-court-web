import React from 'react';
//import poster from 'screens/homepage/images/home-poster.png';

const HomeVideo = props => (
  <section className="home-video" dangerouslySetInnerHTML={{ __html: `
    <video
      class="video-player"
      src="/home.mp4"
      muted=""
      playsinline=""
      webkit-playsinline=""
      controls=""
      loop=""
      type="video/mp4"
    ></video>
  ` }}></section>
);

export default HomeVideo;
