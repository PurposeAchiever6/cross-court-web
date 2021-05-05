import React from 'react';
import whatWeDoMobileImg from 'screens/homepage/images/xs-and-os.png';
import styled from 'styled-components';

const Section = styled.section`
  background-color: #231f20;
  background-image: none;
  background-position: 0 0;
  display: block;
  height: auto;
  min-height: 850px;

  @media (min-width: 992px) {
    background-image: url(${whatWeDoMobileImg});
    background-attachment: fixed;
  }

  .title {
    color: white;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: #9999ff;
    font-size: 120px;
    line-height: 100px;
    margin-bottom: 15px;

    @media (min-width: 992px) {
      font-size: 250px;
      line-height: 200px;
    }
  }

  .mobile-image {
    display: block;
    height: auto;
    @media (min-width: 992px) {
      display: none;
    }
  }
`;

const WhatWeDo = () => (
  <Section className="what-we-do section-block text-white">
    <section className="title-and-description-block shift-right">
      <p className="title dharma_gothic_cheavy">
        THE
        <br />
        X&apos;S AND O&apos;S
      </p>
      <p className="description">
        Our 15 player, hour-long basketball-based sessions are electric and challenging. Built for
        the modern athlete, we emphasize a seamless and sweat inducing fitness experience.
        <br />
        <br />
        Our continuous games to 11 have a 5 minute time limit to keep the session fast-paced, while
        the presence of our Experience Team ensures the vibes are always on point.
      </p>
    </section>
    <img alt="What We Do?" className="mobile-image" src={whatWeDoMobileImg}></img>
  </Section>
);

export default WhatWeDo;
