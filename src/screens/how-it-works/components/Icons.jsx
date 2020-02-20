import styled from 'styled-components';

import device from 'shared/styles/mediaQueries';

const Icons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 2rem;
  margin-top: 5rem;
  text-align: baseline;

  @media ${device.desktop} {
    margin: 0;
    justify-content: flex-start;
  }
`;

export default Icons;
