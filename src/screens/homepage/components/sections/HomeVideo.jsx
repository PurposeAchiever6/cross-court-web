import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  background-color: #000;
  .video-player {
    display: block;
    height: auto;
    margin: 0 auto;
    width: 100%;
  }
`;

const HomeVideo = (props) => (
  <Section
    className="z-20"
    dangerouslySetInnerHTML={{
      __html: `
    <video
      autoplay
      class="video-player"
      src="/home.mp4"
      muted=""
      playsinline=""
      webkit-playsinline=""
      controls=""
      loop=""
      type="video/mp4"
    ></video>
  `,
    }}
  ></Section>
);

export default HomeVideo;
