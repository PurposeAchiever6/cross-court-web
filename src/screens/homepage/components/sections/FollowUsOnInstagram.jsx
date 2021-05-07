import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  text-align: center;
  height: auto !important;

  .title {
    text-align: left;
    font-size: 120px;
    line-height: 45px;
    margin-bottom: 20px;
    font-family: 'dharma_gothic_cexbold';
    color: black;
    width: fit-content;
    margin-left: 20px;

    @media (min-width: 992px) {
      font-size: 200px;
      line-height: 75px;
      margin-top: 100px;
      margin-bottom: 50px;
      text-align: right;
    }

    p {
      :first-child {
        -webkit-text-fill-color: white;
        -webkit-text-stroke-width: 2px;
        -webkit-text-stroke-color: #9999ff;
      }
    }
  }

  .instafeed .eapps-instagram-feed-posts-grid-load-more {
    background-color: #231f20 !important;
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
  <Section className="section-block">
    <section className="title">
      <p>FOLLOW US ON</p>
      <br />
      <p>INSTAGRAM</p>
    </section>
    <div className="instafeed">
      <div className="elfsight-app-65f4b4ad-3836-464b-a390-4922497c4d6d"></div>
    </div>
  </Section>
);

export default FollowUsOnInstagram;