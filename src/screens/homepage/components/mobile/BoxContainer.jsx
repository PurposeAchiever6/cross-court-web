import styled from 'styled-components';
import colors from 'shared/styles/constants';

const BoxContainer = styled.div`
  position: relative;
  height: 300px;
  width: 100%;
  margin-bottom: 2rem;

  .title {
    position: absolute;
    left: 1.5rem;
    bottom: -1.25rem;
    text-transform: uppercase;
    color: ${colors.white};
    font-weight: bold;
    font-size: 2rem;
    letter-spacing: 0.1rem;
    margin: 0;
    z-index: 1;
  }
`;

export default BoxContainer;
