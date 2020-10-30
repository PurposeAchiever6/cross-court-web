import React from 'react';
import styled from 'styled-components'

const Section = styled.section`

  .text {
    font-weight: bold;
  }

  .title {
    text-align: left;
    font-size: 3rem;
    margin-bottom: 5rem;
    letter-spacing: 0.2rem;
    font-weight: 500;
  }

  @media (max-width: 991px) {
    .title {
      text-align: center;
      font-size: 2rem;
    }

  }
`;

const TheSessionVideo = props => (
  <Section className="the-session-video" {...props} dangerouslySetInnerHTML={{ __html: `
    <video
      class="video-player"
      src="/how-it-works.mp4"
      muted=""
      playsinline=""
      webkit-playsinline=""
      controls=""
      loop=""
      type="video/mp4"
    ></video>
  ` }}></Section>
);

export default TheSessionVideo;
