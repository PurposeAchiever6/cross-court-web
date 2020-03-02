import React from 'react';
import styled from 'styled-components';

import TheExperienceImage from '../../images/the-experience-mobile.jpg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem 4rem;

  .title {
    font-size: 2rem;
    letter-spacing: 3.2px;
    line-height: 2.5rem;
    margin-left: 1rem;
    margin-bottom: 1.5rem;
    align-self: flex-start;
  }

  .text {
    font-weight: bolder;
    display: block;
    font-style: italic;
  }

  .note {
    width: 90%;
  }

  .image {
    width: 100%;
    margin-bottom: 2rem;
  }
`;

const TheExperience = () => (
  <Container>
    <h2 className="title">
      THE <span className="text">EXPERIENCE</span>
    </h2>
    <img src={TheExperienceImage} className="image" alt="The Experience" />
    <p className="note">
      CrossCourt is a high-intensity, team based fitness experience. An electric-yet-cathartic
      workout that’s accesible, shareable, and covetable.
    </p>
    <p className="note">
      We exist to remove the barriers that make sports more work than workout. We bring the venue,
      staff, and equipment. You just sign up, show up and <strong>sweat.</strong>
    </p>
  </Container>
);

export default TheExperience;
