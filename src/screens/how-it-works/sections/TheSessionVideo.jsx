import React from 'react';
import styled from 'styled-components'

import ROUTES from 'shared/constants/routes';
import ArButton from 'shared/components/ArButton';

const Section = styled.section`
  // margin: 50px 0;
  // padding: 4.5rem 5rem;

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

  // .boxes {
  //   display: flex;
  //   justify-content: space-between;
  //   align-items: center;
  // }

  // .boxes-item {
  //   display: flex;
  //   height: 7rem;
  //   justify-content: space-between;
  //   flex-direction: column;
  //   align-items: center;
  // }

  // .boxes-text {
  //   width: 99%;
  //   text-align: center;
  //   font-weight: bold;
  // }

  // .boxes-image {
  //   margin-bottom: 1rem;
  // }

  @media (max-width: 991px) {
    //padding: 4.5rem 0;

    .title {
      text-align: center;
      font-size: 2rem;
    }

    // .boxes {
    //   display: grid;
    //   grid-template-columns: repeat(2, 1fr);
    //   grid-template-rows: repeat(3, 1fr);
    //   grid-column-gap: 15px;
    //   grid-row-gap: 40px;
    // }
  }
`;

const TheSessionVideo = props => (
  <Section className="the-session-video" {...props}>
    <video className="video-player" src="/how-it-works.mp4" muted playsInline="" controls={true} loop={true}></video>
  </Section>
);

export default TheSessionVideo;
