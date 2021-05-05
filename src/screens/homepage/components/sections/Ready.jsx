import React from 'react';
import ArButton from 'shared/components/ArButton';
import ROUTES from 'shared/constants/routes';
import styled from 'styled-components';

const Section = styled.section`
  text-align: center;
  font-size: 120px;
  line-height: 100px;
  margin-top: 50px;
  .title {
    color: black;
    -webkit-text-fill-color: white;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: black;
    @media (min-width: 992px) {
      margin-top: 150px;
      font-size: 250px;
      line-height: 200px;
    }
  }

  .buttons-block {
    margin-top: 100px;
    padding: 0 32px;
    text-align: center;
    z-index: 1;
    .ar-button:nth-child(1) {
      margin-bottom: 20px;
      @media (min-width: 992px) {
        margin: 0 50px 0 0;
      }
    }
  }

  .buttons-block .ar-button {
    display: block;
    margin: 0 auto;
    max-width: 200px;
    margin-bottom: 100px;
    @media (min-width: 992px) {
      display: inline-block;
      max-width: none;
    }
  }
`;

const Ready = () => (
  <Section className="ready section-block text-white">
    <p className="title dharma_gothic_cexbold">READY TO SWEAT?</p>
    <section className="buttons-block">
      <ArButton link={ROUTES.HOWITWORKS} double inverted>
        LEARN MORE
      </ArButton>
      <ArButton link={ROUTES.LOCATIONS} double>
        SEE SCHEDULE
      </ArButton>
    </section>
  </Section>
);

export default Ready;
