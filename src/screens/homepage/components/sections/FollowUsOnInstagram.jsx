import React from 'react';
import styled from 'styled-components';

import colors from 'shared/styles/constants';

const Section = styled.section`
  text-align: center;
  height: auto !important;

  .title {
    text-align: left;
    font-size: 120px;
    line-height: 45px;
    margin-bottom: 20px;
    font-family: 'dharma_gothic_cexbold';
    color: #1a1a1a;
    width: fit-content;
    margin-left: 20px;
    margin-top: 3rem;

    @media (min-width: 992px) {
      font-size: 200px;
      line-height: 75px;
      margin-top: 4rem;
      margin-bottom: 50px;
      text-align: right;
    }

    span {
      :first-child {
        -webkit-text-fill-color: white;
        -webkit-text-stroke-width: 2px;
        -webkit-text-stroke-color: #9999ff;
      }
    }
  }

  .instafeed .eapps-instagram-feed-posts-grid-load-more {
    background-color: ${colors.brandBlack} !important;
    border: 3px solid #fff;
    border-radius: 0;
    color: #fff;
    font-size: 14px;
    font-family: 'shapiro95_super_wide';
    height: auto;
    line-height: 19px;
    min-width: 130px;
    padding: 8px 15px;
    position: relative;
    text-decoration: none;
    text-transform: uppercase;
    transition: 500ms background-color ease, 500ms border-color ease, 500ms color ease;
    width: auto;
    display: inline-block;
    margin: 24px 32px;

    :hover {
      background-color: #fff !important;
      border: 3px solid #9999ff;
      color: #9999ff;
    }
  }
`;

const FollowUsOnInstagram = () => (
  <Section>
    <section className="title">
      <span className="block">FOLLOW US ON</span>
      <br />
      <span className="block">INSTAGRAM</span>
    </section>
    <div className="instafeed">
      <div className="elfsight-app-65f4b4ad-3836-464b-a390-4922497c4d6d" />
    </div>
  </Section>
);

export default FollowUsOnInstagram;
