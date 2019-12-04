import styled from 'styled-components';

export default styled.div`
  grid-row: 1 / 3;
  grid-column: 1 / 4;
  background-image: url(${props => props.img});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
`;
