import React from 'react';
import styled from 'styled-components';
import colors from 'shared/styles/constants';

const LoadingContainer = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const Loading = () => {
  return (
    <LoadingContainer>
      <div class="loader-wrapper">
        <div class="floor"></div>
        <div class="ball">
          <div class="ball-line"></div>
          <div class="ball-line"></div>
          <div class="ball-line"></div>
          <div class="ball-line"></div>
        </div>
      </div>
    </LoadingContainer>
  );
};

export default Loading;
