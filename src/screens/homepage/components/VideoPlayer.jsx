import React from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import device from 'shared/styles/mediaQueries';

const Container = styled.div`
  margin: 2rem auto;
  width: 70%;
  padding-top: 39.375%;
  position: relative;

  @media (max-width: 991px) {
    margin: 0;
    width: 100%;
    padding-top: 56.25%;
  }

  .react-player {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const VideoPlayer = () => {
  const env = runtimeEnv();

  return (
    <Container>
      <ReactPlayer
        controls
        className="react-player"
        width="100%"
        height="100%"
        url={env.REACT_APP_VIDEO_URL}
      />
    </Container>
  );
};

export default VideoPlayer;
