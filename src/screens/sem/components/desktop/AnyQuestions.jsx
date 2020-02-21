import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import colors from 'shared/styles/constants';
import ROUTES from 'shared/constants/routes';
import AlternativeButton from 'shared/components/AlternativeButton';

import AnyQuestionsImage from '../../images/any-questions.webp';
import ImageContainer from './ImageContainer';

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
  <ImageContainer img={AnyQuestionsImage}>
    <Container>
      <p>Any Questions?</p>
      <div>
        <Link to={ROUTES.HOWITWORKS}>
          <AlternativeButton>Learn More</AlternativeButton>
        </Link>
      </div>
    </Container>
  </ImageContainer>
);

export default AnyQuestions;
