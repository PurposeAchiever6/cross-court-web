import React from 'react';
import styled from 'styled-components';
import colors from 'shared/styles/constants';
import Vibe from '../../images/Vibe.png';
import ImageContainer from '../ImageContainer';

const TextContainer = styled.div`
  background: ${colors.black};
  color: ${colors.white};
  padding: 0 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .title {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.25rem;
    letter-spacing: 0.1rem;
    margin: 0;
  }

  .text {
    font-weight: 500;
    display: block;

    em {
      font-weight: bold;
    }
  }
`;

const NothingButVibe = () => (
  <>
    <div>
      <ImageContainer img={Vibe} />
    </div>
    <TextContainer>
      <h2 className="title">
        Nothing
        <span className="text">
          but <em>Vibe</em>
        </span>
      </h2>
      <p>
        A Cross Court session is not just a workout. It should feel like a fully crafted experience
        from start to finish.
      </p>
    </TextContainer>
  </>
);

export default NothingButVibe;
