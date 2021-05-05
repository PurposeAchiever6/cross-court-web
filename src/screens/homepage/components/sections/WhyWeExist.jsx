import React from 'react';
import whyWeExistMobileImg from 'screens/homepage/images/the-fundamentals.png';
import styled from 'styled-components';

const Section = styled.section`
  background-color: #231f20;
  background-image: none;
  background-position: -100px 100px;
  display: block;
  height: auto !important;

  @media (min-width: 992px) {
    height: 100vh !important;
    background-image: url(${whyWeExistMobileImg});
    background-attachment: fixed;
    min-height: 850px;
  }

  .description {
    color: white;
    @media (min-width: 992px) {
      max-width: 620px;
    }
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
    width: 400px;
    position: relative;
    @media (min-width: 992px) {
      display: none;
    }
  }
`;

const WhyWeExist = () => (
  <Section className="section-block">
    <section className="title-and-description-block shift-right">
      <p className="title dharma_gothic_cheavy">
        THE
        <br />
        FUNDAMENTALS
      </p>
      <p className="description">
        We exist to unite and ignite the world through the power of team-sport. To serve as an
        outlet for modern athlete to shed sweat and stress.
      </p>
      <br />
      <p className="description">
        To redefine group fitness by developing a community that knows success is only possible when
        achieved together. We win when we elevate those around us and know that a shot at greatness
        is always on the line.
      </p>
    </section>
    <img alt="Why We Exist?" className="mobile-image" src={whyWeExistMobileImg}></img>
  </Section>
);

export default WhyWeExist;
