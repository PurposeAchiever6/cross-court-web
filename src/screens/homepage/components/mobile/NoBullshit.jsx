import React from 'react';
import styled from 'styled-components';

import colors from 'shared/styles/constants';
import NoBullshitPic from '../../images/no-bullshit.webp';
import ImageContainer from '../ImageContainer';
import BoxContainer from './BoxContainer';

const Container = styled(BoxContainer)`
  .title em {
    font-weight: bold;
    color: ${colors.white};
    background-color: ${colors.polarPlum};
    display: block;
    padding: 0.25rem 0.5rem;
  }

  .text {
    margin-left: 0.75rem;
  }
`;

const Text = styled.div`
  margin: 0.25rem 2rem 4rem;
`;

const NoBullshit = () => (
  <>
    <Container>
      <ImageContainer img={NoBullshitPic} />
      <h2 className="title">
        <span className="text">No</span> <em>BULLSH*T</em>
      </h2>
    </Container>
    <Text>
      <p>
        Sports shouldn’t be more work than workout. No more underwhelming pickup sessions. No more
        long term commitments to leagues. No more lame cardio. Just sign up, show up and sweat
      </p>
    </Text>
  </>
);

export default NoBullshit;
