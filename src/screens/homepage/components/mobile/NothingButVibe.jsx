import React from 'react';
import styled from 'styled-components';
import colors from 'shared/styles/constants';

import Vibe from '../../images/Vibe.png';
import ImageContainer from '../ImageContainer';
import BoxContainer from './BoxContainer';

const Container = styled(BoxContainer)`
  .title {
    text-align: center;
  }

  .text {
    font-weight: 500;
    background-color: ${colors.black};
    display: block;
    padding: 0.25rem 0.5rem;

    em {
      font-weight: bold;
    }
  }
`;

const Text = styled.div`
  margin: 0.25rem 2rem 3rem;
`;

const NothingButVibe = () => (
  <>
    <Container>
      <h2 className="title">
        Nothing
        <span className="text">
          but <em>Vibe</em>
        </span>
      </h2>
      <ImageContainer img={Vibe} />
    </Container>
    <Text>
      <p>
        A Cross Court session is not just a workout. It should feel like a fully crafted experience
        from start to finish.
      </p>
    </Text>
  </>
);

export default NothingButVibe;
