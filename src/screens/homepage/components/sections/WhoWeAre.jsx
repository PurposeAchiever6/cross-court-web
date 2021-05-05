import React from 'react';
import whoWeAreMobileImg from 'screens/homepage/images/who-we-are.png';
import styled from 'styled-components';

const Section = styled.section`
  background-color: #fff;
  background-image: none;
  background-position: top right;
  display: block;
  height: auto;
  min-height: 850px;

  @media (min-width: 992px) {
    background-image: url(${whoWeAreMobileImg});
    background-attachment: fixed;
  }

  .description {
    @media (min-width: 992px) {
      max-width: 620px;
    }
  }

  .title {
    color: #9999ff;
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
    margin-top: -20%;
    position: relative;
    right: 50%;
    width: 150%;

    @media (min-width: 992px) {
      display: none;
    }
  }
`;

const WhoWeAre = () => (
  <Section className="section-block">
    <section className="title-and-description-block shift-left">
      <p className="title dharma_gothic_cheavy">
        THE
        <br />
        CC TEAM
      </p>
      <p className="description">
        The #ccteam is made up of doers that favor a team based workout enjoy a mid-week get
        together, or shamelessly refuse to give up on their dreams of going pro.
        <br />
        <br />
        Crosscourt&apos;s the preferred destination for up and coming creatives, overworked
        professionals, former varsity standouts, and everyone else in between, to shed sweat and
        stress as equals.
      </p>
    </section>
    <img alt="Who We Are?" className="mobile-image" src={whoWeAreMobileImg}></img>
  </Section>
);

export default WhoWeAre;
