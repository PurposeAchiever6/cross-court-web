import React from 'react';
import styled from 'styled-components';
import colors from 'shared/styles/constants';
import AlternativeButton from 'shared/components/AlternativeButton';
import AnyQuestionsImage from '../../images/any-questions.png';
import ImageContainer from '../ImageContainer';

const Container = styled.div`
  color: ${colors.white};
  font-size: 2rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  * {
    width: 15rem;
  }
`;

const AnyQuestions = () => (
  <ImageContainer img={AnyQuestionsImage} overlayColor={colors.blackOverlay}>
    <Container>
      <p>Any Questions?</p>
      <div>
        <AlternativeButton>Learn More</AlternativeButton>
      </div>
    </Container>
  </ImageContainer>
);

export default AnyQuestions;
