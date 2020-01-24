import styled from 'styled-components';
import device from 'shared/styles/mediaQueries';

const Par = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 2rem;
  font-size: 0.875rem;

  @media ${device.desktop} {
    margin: 0;
    width: 80%;
    align-items: flex-start;
    font-size: 1.125rem;
  }
`;

export default Par;
