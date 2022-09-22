import React from 'react';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
  position: fixed;
  height: 100vh;
  z-index: 9999999999;
  width: 100vw;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const Loading = () => (
  <LoadingContainer>
    <div className="loader-wrapper">
      <div className="floor" />
      <div className="ball">
        <div className="ball-line" />
        <div className="ball-line" />
        <div className="ball-line" />
        <div className="ball-line" />
      </div>
    </div>
  </LoadingContainer>
);

export default Loading;
