import styled from 'styled-components';

import device from 'shared/styles/mediaQueries';

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 50%;

  @media (min-width: 992px) {
    flex: 1;
  }
`;

export default Icon;
