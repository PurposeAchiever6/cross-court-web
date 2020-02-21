import React from 'react';
import styled from 'styled-components';
import TheExperienceImage from '../../images/the-experience-desktop.webp';
import ImageContainer from '../ImageContainer';

const Container = styled.div`
  grid-row: 1 / 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 3rem;

  .title {
    font-size: 2rem;
    font-weight: 500;

    span {
      font-style: italic;
      font-weight: 600;
    }
  }
`;

const Image = styled.div`
  grid-column: 2;
  grid-row: 1 / 3;
`;

const TheExperience = () => (
  <>
    <Container>
      <h1 className="title">
        THE <span>EXPERIENCE</span>
      </h1>
      <p>
        CrossCourt is a high-intensity, team based fitness experience. An electric-yet-cathartic
        workout that’s accesible, shareable, and covetable.
      </p>
      <p>
        We exist to remove the barriers that make sports more work than workout. We bring the venue,
        staff, and equipment. You just sign up, show up and <strong>sweat.</strong>
      </p>
    </Container>
    <Image>
      <ImageContainer img={TheExperienceImage} />
    </Image>
  </>
);

export default TheExperience;
