import React from 'react';
import styled from 'styled-components';
import { PulseLoader } from 'react-spinners';
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
      <PulseLoader
        // css={override}
        size={32} // or 150px
        color={colors.polarPlum}
      />
    </LoadingContainer>
  );
};

export default Loading;
