import styled from 'styled-components';

import device from 'shared/styles/mediaQueries';

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 50%;

  @media ${device.desktop} {
    flex: initial;

    &:first-child {
      margin-right: 4rem;
    }
  }
`;

export default Icon;
